# Keyword Expander Agent

## Purpose
The Keyword Expander Agent is a utility primitive that takes a list of seed keywords and generates a larger list of long-tail and semantically related keywords. This is useful for SEO content generation and other marketing tasks.

## Metadata
- **agent_name**: `keyword_expander_agent`
- **version**: `1.0.0`
- **description**: Generate long-tail and semantically related keywords from a seed list.
- **dependencies**: `[]`

## Input Schema (`input_schema.json`)
The agent expects a JSON object with the following properties:
- `seed_keywords` (array of strings, required): A list of seed keywords to expand upon.
- `num_variations` (integer, optional): The number of keyword variations to generate per seed keyword. Defaults to 10.

### Example Input
```json
{
  "seed_keywords": ["content marketing", "python programming"],
  "num_variations": 5
}
```

## Output Schema (`output_schema.json`)
The agent produces a JSON object with the following structure:
- `expanded_keywords` (array of strings): A list of expanded and semantically related keywords.

### Example Output
```json
{
  "expanded_keywords": [
    "content marketing variation 1",
    "content marketing variation 2",
    "content marketing variation 3",
    "content marketing variation 4",
    "content marketing variation 5",
    "python programming variation 1",
    "python programming variation 2",
    "python programming variation 3",
    "python programming variation 4",
    "python programming variation 5"
  ]
}
```

## Usage
To use this agent, the BMAD orchestrator would:
1. Initialize the `KeywordExpanderAgent`.
2. Provide a valid JSON input object.
3. Call the `process()` method.
4. Call the `output()` method to retrieve the list of expanded keywords. This list can then be used as input for other agents, such as the `SEOBlogAgent`.
```