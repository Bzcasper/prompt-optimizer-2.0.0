# Jules Knowledge Base

This directory contains a modular, reusable Knowledge Base of templates for content automation pipelines. These files allow Jules to understand, validate, and execute tasks across content, video, and image generation.

---

## Structure

The Knowledge Base is organized into the following categories:

-   `content/`: Templates for generating text-based content like product descriptions and summarizing reviews.
-   `video/`: Templates for creating video scripts and concepts for short-form content.
-   `image/`: Templates for building detailed AI image prompts for lifestyle and product photography.
-   `primitives/`: Core, reusable templates that perform foundational tasks like keyword expansion and tone adaptation. These are designed to be chained together or used as building blocks in larger workflows.
-   `workflows/`: Example pipelines that demonstrate how to chain multiple templates together to accomplish a complex task, such as generating a complete product listing.
-   `schemas/`: Contains all the JSON Schema definitions used to validate the outputs of the templates. Each template that produces JSON has a corresponding schema here.

---

## Usage

1.  **Select a Template**: Choose a template from the appropriate directory based on your task.
2.  **Provide Inputs**: Supply the required inputs as defined in the template's "Template Definition" section. The inputs are typically provided in a JSON format.
3.  **Execute**: Run the template through the automation engine.
4.  **Validate Output**: The output will be structured according to the template's "Output Schema." If a schema is defined, the output can be validated against it to ensure consistency and correctness.

### Chaining Templates

The primitives and templates are designed to be composable. The `workflows/` directory contains examples of how to chain them. For instance, the `ProductListingWorkflow.md` shows how to:

1.  Use `KeywordExpander` to generate SEO terms.
2.  Feed those keywords into `ProductDescriptionGenerator` to create a product description.
3.  Use `LifestyleImagePromptBuilder` to create marketing image prompts based on the product details.

---

## Adding New Templates

To add a new template, create a `.md` file in the relevant directory, following the established format:

-   **Purpose**: A clear, one-sentence description.
-   **Template Definition**: Define the `Name`, `Inputs`, and `Output Schema`.
-   **Example Input/Output**: Provide clear JSON examples.
-   **Notes**: Add any important implementation details.

If the template outputs JSON, create a corresponding `.schema.json` file in the `schemas/` directory to enable validation.