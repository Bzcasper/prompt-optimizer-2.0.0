# Content Formatter Agent

## Purpose
The Content Formatter Agent is a utility primitive that converts raw text content into various formats, such as Markdown or HTML. This is useful for preparing content for different publishing platforms.

## Metadata
- **agent_name**: `content_formatter_agent`
- **version**: `1.0.0`
- **description**: Convert outputs into Markdown, HTML, or other formats.
- **dependencies**: `[]`

## Input Schema (`input_schema.json`)
The agent expects a JSON object with the following properties:
- `content` (string, required): The raw content to be formatted.
- `format` (string, required): The target format for the content. Can be "markdown" or "html".

### Example Input
```json
{
  "content": "This is the raw text that needs to be formatted.",
  "format": "html"
}
```

## Output Schema (`output_schema.json`)
The agent produces a JSON object with the following structure:
- `formatted_content` (string): The content in the specified format.

### Example Output
```json
{
  "formatted_content": "<h1>Content</h1><p>This is the raw text that needs to be formatted.</p>"
}
```

## Usage
To use this agent, the BMAD orchestrator would:
1. Initialize the `ContentFormatterAgent`.
2. Provide a valid JSON input object with the raw content and desired format.
3. Call the `process()` method.
4. Call the `output()` method to retrieve the formatted content.
```