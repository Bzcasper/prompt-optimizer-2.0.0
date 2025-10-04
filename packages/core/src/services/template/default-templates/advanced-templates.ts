import type { Template } from '../types';

export const ADVANCED_TEMPLATES: Record<string, Template> = {
  "seo-outline-builder-v1": {
    "id": "seo-outline-builder-v1",
    "title": "SEO Outline Builder",
    "description": "Produces H1, H2 structure, section bullets, and target keywords per section for an SEO-optimized article.",
    "templateType": "content",
    "inputs": ["{topic}", "{primary_keyword}", "{search_intent}", "{target_wordcount}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "title_suggestions": { "type": "array", "items": { "type": "string" } },
        "h1": { "type": "string" },
        "h2s": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "h2": { "type": "string" },
              "bullets": { "type": "array", "items": { "type": "string" } }
            },
            "required": ["h2", "bullets"]
          }
        },
        "target_keywords_per_section": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      },
      "required": ["title_suggestions", "h1", "h2s", "target_keywords_per_section"]
    },
    "requiredOutputKeys": ["title_suggestions", "h1", "h2s", "target_keywords_per_section"],
    "exampleInput": {
      "topic": "How to Clean Silver Jewelry",
      "primary_keyword": "clean silver",
      "search_intent": "how-to",
      "target_wordcount": 900
    },
    "exampleOutput": {
      "title_suggestions": ["How to Clean Silver Jewelry Safely", "The Ultimate Guide to Cleaning Silver Jewelry"],
      "h1": "How to Clean Silver Jewelry: A Complete Guide",
      "h2s": [
        { "h2": "Why Does Silver Tarnish?", "bullets": ["Understanding oxidation and sulfur reactions", "Common household items that accelerate tarnishing"] },
        { "h2": "Method 1: Baking Soda & Aluminum Foil", "bullets": ["Step-by-step instructions for the chemical reaction method", "Safety precautions and what not to clean with this method"] },
        { "h2": "Method 2: Commercial Silver Polish", "bullets": ["Choosing the right type of polish", "Application techniques for best results"] }
      ],
      "target_keywords_per_section": {
        "Why Does Silver Tarnish?": ["tarnished silver", "what causes silver to blacken"],
        "Method 1: Baking Soda & Aluminum Foil": ["clean silver with baking soda", "diy silver cleaner"],
        "Method 2: Commercial Silver Polish": ["best silver polish", "how to use silver polish"]
      }
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 1200 }, "lastModified": 1672531200000, "templateType": "content" },
    "validationRules": ["exampleOutput must contain h1 and at least 2 h2s", "each h2 bullets array must have at least 2 items"],
    "testCases": [{ "name": "seo-outline-basic", "input": { "topic": "How to Clean Silver Jewelry", "primary_keyword": "clean silver", "search_intent": "how-to", "target_wordcount": 900 }, "expectedOutputPattern": { "h1": "How to Clean Silver Jewelry" } }],
    "safeDefaults": { "title_suggestions": ["Untitled"], "h1": "Untitled", "h2s": [] },
    "dependencyTemplates": [],
    "tags": ["seo", "outline", "content", "writing"],
    "placeholderMapper": [{ "targetInput": "{topic}", "recommendedSource": "topic-idea-generator-v1", "sourcePath": "$.ideas[0].title" }],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "blog-post-writer-v1": {
    "id": "blog-post-writer-v1",
    "title": "Blog Post Writer",
    "description": "Takes a structured outline (like one from seo-outline-builder-v1) and writes a full, engaging blog post.",
    "templateType": "content",
    "inputs": ["{outline_json}", "{tone}", "{target_audience}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "title": { "type": "string" },
        "body_markdown": { "type": "string" },
        "meta_description": { "type": "string" }
      },
      "required": ["title", "body_markdown"]
    },
    "requiredOutputKeys": ["title", "body_markdown"],
    "exampleInput": {
      "outline_json": {
        "h1": "How to Clean Silver Jewelry: A Complete Guide",
        "h2s": [
          { "h2": "Why Does Silver Tarnish?", "bullets": ["Understanding oxidation", "Common tarnish causes"] },
          { "h2": "Method 1: Baking Soda", "bullets": ["Step-by-step instructions", "Safety precautions"] }
        ]
      },
      "tone": "helpful and informative",
      "target_audience": "people with silver jewelry"
    },
    "exampleOutput": {
      "title": "How to Clean Silver Jewelry: A Complete Guide",
      "body_markdown": "## Why Does Silver Tarnish?\n\nSilver tarnishes due to a chemical reaction with sulfur-containing substances in the air... \n\n## Method 1: Baking Soda\n\nHere is a simple and effective method using household items...",
      "meta_description": "Learn how to safely and effectively clean your silver jewelry at home using simple methods. Restore shine and prevent future tarnish with our complete guide."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 3000 }, "lastModified": 1672531200000, "templateType": "content" },
    "validationRules": ["body_markdown must contain at least two H2 (##) headings", "title length must be between 20 and 70 characters"],
    "testCases": [{ "name": "blog-post-basic", "input": { "outline_json": { "h1": "Test H1", "h2s": [{ "h2": "Test H2", "bullets": ["one", "two"] }] }, "tone": "professional", "target_audience": "engineers" }, "expectedOutputPattern": { "title": "Test H1" } }],
    "safeDefaults": { "title": "Untitled Post", "body_markdown": "Could not generate content." },
    "dependencyTemplates": ["seo-outline-builder-v1"],
    "tags": ["content", "writing", "blogging", "seo"],
    "placeholderMapper": [{ "targetInput": "{outline_json}", "recommendedSource": "seo-outline-builder-v1", "sourcePath": "$" }],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "evidence-inserter-v1": {
    "id": "evidence-inserter-v1",
    "title": "Evidence Inserter",
    "description": "Finds and inserts evidence to support claims in a text.",
    "templateType": "content",
    "inputs": ["{text}", "{claim}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "text_with_evidence": { "type": "string" }
      },
      "required": ["text_with_evidence"]
    },
    "requiredOutputKeys": ["text_with_evidence"],
    "exampleInput": {
      "text": "The sky is blue.",
      "claim": "The sky is blue"
    },
    "exampleOutput": {
      "text_with_evidence": "The sky is blue due to a phenomenon called Rayleigh scattering."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "content" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "text_with_evidence": "" },
    "dependencyTemplates": [],
    "tags": ["content", "writing", "evidence"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "faq-extractor-v1": {
    "id": "faq-extractor-v1",
    "title": "FAQ Extractor",
    "description": "Extracts frequently asked questions from a text.",
    "templateType": "content",
    "inputs": ["{text}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "faqs": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "question": { "type": "string" },
              "answer": { "type": "string" }
            },
            "required": ["question", "answer"]
          }
        }
      },
      "required": ["faqs"]
    },
    "requiredOutputKeys": ["faqs"],
    "exampleInput": {
      "text": "The sky is blue due to a phenomenon called Rayleigh scattering. This scattering refers to the scattering of light by particles that are smaller than the wavelength of light."
    },
    "exampleOutput": {
      "faqs": [
        {
          "question": "Why is the sky blue?",
          "answer": "The sky is blue due to a phenomenon called Rayleigh scattering."
        }
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "content" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "faqs": [] },
    "dependencyTemplates": [],
    "tags": ["content", "writing", "faq"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "video-hook-generator-v1": {
    "id": "video-hook-generator-v1",
    "title": "Video Hook Generator",
    "description": "Generates a compelling video hook to capture audience attention.",
    "templateType": "video",
    "inputs": ["{topic}", "{target_audience}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "hook": { "type": "string" }
      },
      "required": ["hook"]
    },
    "requiredOutputKeys": ["hook"],
    "exampleInput": {
      "topic": "The history of the Roman Empire",
      "target_audience": "history buffs"
    },
    "exampleOutput": {
      "hook": "What if I told you that the Roman Empire never truly fell?"
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.7, "max_tokens": 100 }, "lastModified": 1672531200000, "templateType": "video" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "hook": "" },
    "dependencyTemplates": [],
    "tags": ["video", "writing", "hook"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "video-script-builder-v1": {
    "id": "video-script-builder-v1",
    "title": "Video Script Builder",
    "description": "Builds a complete video script from an outline.",
    "templateType": "video",
    "inputs": ["{outline_json}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "script": { "type": "string" }
      },
      "required": ["script"]
    },
    "requiredOutputKeys": ["script"],
    "exampleInput": {
      "outline_json": {
        "title": "The history of the Roman Empire",
        "scenes": [
          { "scene": 1, "description": "Introduction to the Roman Empire" },
          { "scene": 2, "description": "The rise of Julius Caesar" },
          { "scene": 3, "description": "The fall of the Roman Empire" }
        ]
      }
    },
    "exampleOutput": {
      "script": "Scene 1: Introduction to the Roman Empire\n\n[Visual: A map of the Roman Empire at its peak]\n\nNarrator: The Roman Empire was one of the most powerful empires in history..."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 3000 }, "lastModified": 1672531200000, "templateType": "video" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "script": "" },
    "dependencyTemplates": [],
    "tags": ["video", "writing", "script"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "scene-optimizer-v1": {
    "id": "scene-optimizer-v1",
    "title": "Scene Optimizer",
    "description": "Optimizes a video scene for engagement.",
    "templateType": "video",
    "inputs": ["{scene_description}", "{target_audience}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "optimized_scene": { "type": "string" }
      },
      "required": ["optimized_scene"]
    },
    "requiredOutputKeys": ["optimized_scene"],
    "exampleInput": {
      "scene_description": "A historian talks about the Roman Empire.",
      "target_audience": "history buffs"
    },
    "exampleOutput": {
      "optimized_scene": "A historian stands in front of the Colosseum and talks about the Roman Empire."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "video" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "optimized_scene": "" },
    "dependencyTemplates": [],
    "tags": ["video", "writing", "scene"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "image-prompt-builder-v1": {
    "id": "image-prompt-builder-v1",
    "title": "Image Prompt Builder",
    "description": "Builds a detailed image prompt for a text-to-image model.",
    "templateType": "image",
    "inputs": ["{subject}", "{style}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "prompt": { "type": "string" }
      },
      "required": ["prompt"]
    },
    "requiredOutputKeys": ["prompt"],
    "exampleInput": {
      "subject": "A cat",
      "style": "impressionistic"
    },
    "exampleOutput": {
      "prompt": "A fluffy cat sitting on a windowsill, painted in an impressionistic style with visible brushstrokes."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 200 }, "lastModified": 1672531200000, "templateType": "image" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "prompt": "" },
    "dependencyTemplates": [],
    "tags": ["image", "prompt"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "thumbnail-preset-v1": {
    "id": "thumbnail-preset-v1",
    "title": "Thumbnail Preset",
    "description": "Creates a thumbnail preset for an image.",
    "templateType": "image-optimize",
    "inputs": ["{image_url}", "{preset}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "thumbnail_url": { "type": "string" }
      },
      "required": ["thumbnail_url"]
    },
    "requiredOutputKeys": ["thumbnail_url"],
    "exampleInput": {
      "image_url": "https://example.com/image.jpg",
      "preset": "youtube"
    },
    "exampleOutput": {
      "thumbnail_url": "https://example.com/image-thumbnail-youtube.jpg"
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 100 }, "lastModified": 1672531200000, "templateType": "image-optimize" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "thumbnail_url": "" },
    "dependencyTemplates": [],
    "tags": ["image", "thumbnail"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "image-variants-v1": {
    "id": "image-variants-v1",
    "title": "Image Variants",
    "description": "Creates variants of an image.",
    "templateType": "image-optimize",
    "inputs": ["{image_url}", "{variants}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "variant_urls": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["variant_urls"]
    },
    "requiredOutputKeys": ["variant_urls"],
    "exampleInput": {
      "image_url": "https://example.com/image.jpg",
      "variants": ["grayscale", "sepia"]
    },
    "exampleOutput": {
      "variant_urls": [
        "https://example.com/image-grayscale.jpg",
        "https://example.com/image-sepia.jpg"
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 200 }, "lastModified": 1672531200000, "templateType": "image-optimize" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "variant_urls": [] },
    "dependencyTemplates": [],
    "tags": ["image", "variants"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "api-client-generator-v1": {
    "id": "api-client-generator-v1",
    "title": "API Client Generator",
    "description": "Generates an API client from an OpenAPI or GraphQL schema.",
    "templateType": "code",
    "inputs": ["{schema}", "{language}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "files": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "path": { "type": "string" },
              "content": { "type": "string" }
            },
            "required": ["path", "content"]
          }
        }
      },
      "required": ["files"]
    },
    "requiredOutputKeys": ["files"],
    "exampleInput": {
      "schema": "...",
      "language": "typescript"
    },
    "exampleOutput": {
      "files": [
        {
          "path": "src/client.ts",
          "content": "..."
        }
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 4000 }, "lastModified": 1672531200000, "templateType": "code" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "files": [] },
    "dependencyTemplates": [],
    "tags": ["code", "api", "client"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "testing-suite-builder-v1": {
    "id": "testing-suite-builder-v1",
    "title": "Testing Suite Builder",
    "description": "Builds a testing suite for a given code file.",
    "templateType": "code",
    "inputs": ["{code}", "{language}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "files": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "path": { "type": "string" },
              "content": { "type": "string" }
            },
            "required": ["path", "content"]
          }
        }
      },
      "required": ["files"]
    },
    "requiredOutputKeys": ["files"],
    "exampleInput": {
      "code": "...",
      "language": "javascript"
    },
    "exampleOutput": {
      "files": [
        {
          "path": "src/index.test.js",
          "content": "..."
        }
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 4000 }, "lastModified": 1672531200000, "templateType": "code" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "files": [] },
    "dependencyTemplates": [],
    "tags": ["code", "testing"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "migration-helper-v1": {
    "id": "migration-helper-v1",
    "title": "Migration Helper",
    "description": "Helps migrate code from one language to another.",
    "templateType": "code",
    "inputs": ["{code}", "{from_language}", "{to_language}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "migrated_code": { "type": "string" }
      },
      "required": ["migrated_code"]
    },
    "requiredOutputKeys": ["migrated_code"],
    "exampleInput": {
      "code": "...",
      "from_language": "python",
      "to_language": "javascript"
    },
    "exampleOutput": {
      "migrated_code": "..."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 4000 }, "lastModified": 1672531200000, "templateType": "code" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "migrated_code": "" },
    "dependencyTemplates": [],
    "tags": ["code", "migration"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "refactor-for-performance-v1": {
    "id": "refactor-for-performance-v1",
    "title": "Refactor for Performance",
    "description": "Refactors code for performance.",
    "templateType": "code",
    "inputs": ["{code}", "{language}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "refactored_code": { "type": "string" }
      },
      "required": ["refactored_code"]
    },
    "requiredOutputKeys": ["refactored_code"],
    "exampleInput": {
      "code": "...",
      "language": "python"
    },
    "exampleOutput": {
      "refactored_code": "..."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 4000 }, "lastModified": 1672531200000, "templateType": "code" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "refactored_code": "" },
    "dependencyTemplates": [],
    "tags": ["code", "refactor", "performance"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "ci-config-generator-v1": {
    "id": "ci-config-generator-v1",
    "title": "CI Config Generator",
    "description": "Generates a CI configuration file for a project.",
    "templateType": "code",
    "inputs": ["{project_type}", "{ci_provider}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "config": { "type": "string" }
      },
      "required": ["config"]
    },
    "requiredOutputKeys": ["config"],
    "exampleInput": {
      "project_type": "node",
      "ci_provider": "github"
    },
    "exampleOutput": {
      "config": "..."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.2, "max_tokens": 2000 }, "lastModified": 1672531200000, "templateType": "code" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "config": "" },
    "dependencyTemplates": [],
    "tags": ["code", "ci"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "template-debugger-v1": {
    "id": "template-debugger-v1",
    "title": "Template Debugger",
    "description": "Debugs a template.",
    "templateType": "meta",
    "inputs": ["{template}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "debug_log": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["debug_log"]
    },
    "requiredOutputKeys": ["debug_log"],
    "exampleInput": {
      "template": "..."
    },
    "exampleOutput": {
      "debug_log": [
        "SUCCESS: Template ID is valid kebab-case.",
        "ERROR: `exampleOutput` does not match `outputSchema`."
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.1, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "meta" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "debug_log": [] },
    "dependencyTemplates": [],
    "tags": ["meta", "debug"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "workflow-orchestrator-v1": {
    "id": "workflow-orchestrator-v1",
    "title": "Workflow Orchestrator",
    "description": "Orchestrates a workflow of templates.",
    "templateType": "meta",
    "inputs": ["{workflow}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "orchestration_plan": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "template_id": { "type": "string" },
              "inputs": { "type": "object" }
            },
            "required": ["template_id", "inputs"]
          }
        }
      },
      "required": ["orchestration_plan"]
    },
    "requiredOutputKeys": ["orchestration_plan"],
    "exampleInput": {
      "workflow": "Generate a blog post about the history of the Roman Empire."
    },
    "exampleOutput": {
      "orchestration_plan": [
        {
          "template_id": "seo-outline-builder-v1",
          "inputs": {
            "topic": "The history of the Roman Empire"
          }
        },
        {
          "template_id": "blog-post-writer-v1",
          "inputs": {
            "outline_json": "..."
          }
        }
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.1, "max_tokens": 2000 }, "lastModified": 1672531200000, "templateType": "meta" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "orchestration_plan": [] },
    "dependencyTemplates": [],
    "tags": ["meta", "workflow"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "placeholder-mapper-v1": {
    "id": "placeholder-mapper-v1",
    "title": "Placeholder Mapper",
    "description": "Maps placeholders between templates.",
    "templateType": "meta",
    "inputs": ["{source_template}", "{target_template}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "placeholder_map": {
          "type": "object",
          "additionalProperties": { "type": "string" }
        }
      },
      "required": ["placeholder_map"]
    },
    "requiredOutputKeys": ["placeholder_map"],
    "exampleInput": {
      "source_template": "...",
      "target_template": "..."
    },
    "exampleOutput": {
      "placeholder_map": {
        "{outline_json}": "$.output"
      }
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.1, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "meta" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "placeholder_map": {} },
    "dependencyTemplates": [],
    "tags": ["meta", "workflow"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "multi-pass-refiner-v1": {
    "id": "multi-pass-refiner-v1",
    "title": "Multi-Pass Refiner",
    "description": "Refines a text through multiple passes.",
    "templateType": "iterate",
    "inputs": ["{text}", "{passes}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "refined_text": { "type": "string" }
      },
      "required": ["refined_text"]
    },
    "requiredOutputKeys": ["refined_text"],
    "exampleInput": {
      "text": "The sky is blue.",
      "passes": 2
    },
    "exampleOutput": {
      "refined_text": "The azure sky is a brilliant blue."
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 2000 }, "lastModified": 1672531200000, "templateType": "iterate" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "refined_text": "" },
    "dependencyTemplates": [],
    "tags": ["iterate", "writing"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  },
  "variant-scorer-v1": {
    "id": "variant-scorer-v1",
    "title": "Variant Scorer",
    "description": "Scores variants of a text.",
    "templateType": "iterate",
    "inputs": ["{variants}", "{metric}"],
    "outputSchema": {
      "type": "object",
      "properties": {
        "scored_variants": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "variant": { "type": "string" },
              "score": { "type": "number" }
            },
            "required": ["variant", "score"]
          }
        }
      },
      "required": ["scored_variants"]
    },
    "requiredOutputKeys": ["scored_variants"],
    "exampleInput": {
      "variants": ["The sky is blue.", "The azure sky is a brilliant blue."],
      "metric": "engagement"
    },
    "exampleOutput": {
      "scored_variants": [
        {
          "variant": "The azure sky is a brilliant blue.",
          "score": 0.9
        },
        {
          "variant": "The sky is blue.",
          "score": 0.7
        }
      ]
    },
    "version": "1.0.0",
    "metadata": { "author": "jules-system", "license": "MIT", "created_at": "2025-10-03", "language": "en", "recommended_runtime": { "model": "gpt-4-turbo", "temperature": 0.5, "max_tokens": 1000 }, "lastModified": 1672531200000, "templateType": "iterate" },
    "validationRules": [],
    "testCases": [],
    "safeDefaults": { "scored_variants": [] },
    "dependencyTemplates": [],
    "tags": ["iterate", "writing"],
    "placeholderMapper": [],
    "preCommitCommands": ["pnpm lint", "pnpm test", "node scripts/validate-templates.js"]
  }
};