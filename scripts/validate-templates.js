const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const templatesDirectory = path.join(__dirname, '..', 'packages', 'core', 'src', 'services', 'template', 'default-templates');

let allTemplates = [];
let allTemplateIds = new Set();
let errors = [];
let fileSymbolCache = {};

/**
 * Converts a TypeScript AST node into a JavaScript object/value.
 * This is a simplified evaluator that handles object literals, arrays, and primitives.
 * It also resolves same-file variable references.
 * @param {ts.Node} node - The AST node to convert.
 * @param {ts.SourceFile} sourceFile - The source file for context.
 * @returns {any} The converted JavaScript value.
 */
function nodeToObject(node, sourceFile) {
    if (!node) return undefined;

    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return node.text;
    }
    if (ts.isNumericLiteral(node)) {
        return parseFloat(node.text);
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) {
        return true;
    }
    if (node.kind === ts.SyntaxKind.FalseKeyword) {
        return false;
    }
    if (node.kind === ts.SyntaxKind.NullKeyword) {
        return null;
    }
    if (ts.isObjectLiteralExpression(node)) {
        const obj = {};
        for (const prop of node.properties) {
            if (ts.isPropertyAssignment(prop) && prop.name) {
                const key = ts.isIdentifier(prop.name) ? prop.name.text : (ts.isStringLiteral(prop.name) ? prop.name.text : null);
                if (key) {
                    obj[key] = nodeToObject(prop.initializer, sourceFile);
                }
            }
        }
        return obj;
    }
    if (ts.isArrayLiteralExpression(node)) {
        return node.elements.map(elem => nodeToObject(elem, sourceFile));
    }
    if (ts.isIdentifier(node)) {
        // Try to resolve variable from the same file
        if (fileSymbolCache[sourceFile.fileName] && fileSymbolCache[sourceFile.fileName][node.text]) {
            return fileSymbolCache[sourceFile.fileName][node.text];
        }
    }
    return undefined; // Or some other placeholder for unhandled types
}

function extractTemplatesFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    const foundTemplates = [];
    fileSymbolCache[filePath] = {};

    ts.forEachChild(sourceFile, node => {
        if (ts.isVariableStatement(node)) {
            for (const decl of node.declarationList.declarations) {
                if (ts.isIdentifier(decl.name) && decl.initializer) {
                    const varName = decl.name.text;
                    const templateObj = nodeToObject(decl.initializer, sourceFile);
                    if (templateObj) {
                         // Cache the resolved object for later reference
                        fileSymbolCache[filePath][varName] = templateObj;

                        // Check if it's a template or a collection of templates
                        if (templateObj.id && (templateObj.templateType || (templateObj.metadata && templateObj.metadata.templateType))) {
                             foundTemplates.push(templateObj);
                        } else if (typeof templateObj === 'object' && Object.values(templateObj).length > 0) {
                             const templatesFromRecord = Object.values(templateObj).filter(t => t && t.id);
                             foundTemplates.push(...templatesFromRecord);
                        }
                    }
                }
            }
        }
    });
    return foundTemplates;
}

// --- Main Execution ---
console.log('Starting template validation using TypeScript AST...');

const files = fs.readdirSync(templatesDirectory).filter(file => file.endsWith('.ts') && file !== 'index.ts');

for (const file of files) {
  const filePath = path.join(templatesDirectory, file);
  const templates = extractTemplatesFromFile(filePath);
  allTemplates.push(...templates);
}

// Populate all template IDs for dependency checks
allTemplates.forEach(t => {
    if (t && t.id) {
        if (allTemplateIds.has(t.id)) {
            errors.push(`[${t.id}]: Duplicate template ID found.`);
        }
        allTemplateIds.add(t.id);
    }
});

// Now validate each template
allTemplates.forEach(template => {
  if (!template || !template.id) return;
  const { id, inputs, exampleInput, requiredOutputKeys, exampleOutput, dependencyTemplates } = template;

  if (inputs && exampleInput) {
    inputs.forEach(input => {
      const key = input.replace(/[{}]/g, '');
      if (typeof exampleInput[key] === 'undefined') {
        errors.push(`[${id}]: exampleInput is missing key '${key}' from inputs.`);
      }
    });
  }

  if (requiredOutputKeys && exampleOutput) {
    requiredOutputKeys.forEach(key => {
      if (typeof exampleOutput[key] === 'undefined') {
        errors.push(`[${id}]: exampleOutput is missing required key '${key}'.`);
      }
    });
  }

  if (dependencyTemplates && dependencyTemplates.length > 0) {
      dependencyTemplates.forEach(depId => {
          if (depId && !allTemplateIds.has(depId)) {
              errors.push(`[${id}]: Declares a dependency on a non-existent template: '${depId}'.`);
          }
      });
  }
});

// --- Report Results ---
if (errors.length > 0) {
  console.error('\nTemplate validation failed with the following errors:');
  [...new Set(errors)].forEach(error => console.error(`- ${error}`));
  process.exit(1);
} else {
  console.log(`\nSuccessfully validated ${allTemplates.length} templates!`);
  process.exit(0);
}