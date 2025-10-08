# Image Prompt Agent

## Purpose
The Image Prompt Agent generates detailed, effective prompts for AI image generation models. It takes a base subject and optional style modifiers to construct a prompt that can be used with services like Midjourney, DALL-E, or Stable Diffusion.

## Metadata
- **agent_name**: `image_prompt_agent`
- **version**: `1.1.0`
- **description**: Generates AI image prompts for illustrations, thumbnails, or product photos.
- **dependencies**: `[]`

## Input Schema (`input_schema.json`)
The agent expects a JSON object with the following properties:
- `base_subject` (string, required): The main subject or concept for the image.
- `style` (string, optional): The desired artistic style. Defaults to "photorealistic".
- `aspect_ratio` (string, optional): The desired aspect ratio. Defaults to "16:9".
- `model` (string, optional): The target AI image model. Can be "dall-e", "midjourney", or "stable-diffusion". Defaults to "midjourney".
- `lighting` (string, optional): The desired lighting style.
- `perspective` (string, optional): The desired camera perspective.
- `composition` (string, optional): The desired composition.
- `modifiers` (array of strings, optional): A list of additional style modifiers.

### Example Input
```json
{
  "base_subject": "a futuristic city skyline at dusk",
  "style": "cinematic",
  "aspect_ratio": "16:9",
  "model": "midjourney",
  "lighting": "neon and volumetric lighting",
  "perspective": "low-angle shot",
  "composition": "leading lines",
  "modifiers": ["hyperrealistic", "8k", "vibrant colors"]
}
```

## Output Schema (`output_schema.json`)
The agent produces a JSON object with the following structure:
- `prompt` (string): The fully constructed, detailed prompt for an AI image generator.
- `negative_prompt` (string): A corresponding negative prompt to help refine the image generation.
- `filename` (string): A suggested filename for the generated image.
- `parameters` (object): The structured parameters used to build the prompt.
- `model_suggestions` (array of strings): A list of suggested AI image models that might work well for this prompt.

### Example Output
```json
{
  "prompt": "cinematic image of a futuristic city skyline at dusk, leading lines, low-angle shot, neon and volumetric lighting, hyperrealistic, 8k, vibrant colors, --ar 16:9",
  "negative_prompt": "low quality, blurry, watermark, text, signature, ugly, deformed, extra limbs",
  "filename": "a-futuristic-city-skyline-at--20251002161127.png",
  "parameters": {
    "style": "cinematic",
    "aspect_ratio": "16:9",
    "model": "midjourney",
    "lighting": "neon and volumetric lighting",
    "perspective": "low-angle shot",
    "composition": "leading lines",
    "modifiers": [
      "hyperrealistic",
      "8k",
      "vibrant colors"
    ]
  },
  "model_suggestions": [
    "Midjourney v6",
    "DALL-E 3"
  ]
}
```

## Usage
To use this agent, the BMAD orchestrator would:
1. Initialize the `ImagePromptAgent`.
2. Provide a valid JSON input object that conforms to `input_schema.json`.
3. Call the `process()` method.
4. Call the `output()` method to retrieve the generated prompt and other details. This prompt can then be sent to an AI image generation service.
```