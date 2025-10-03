# Knowledge File: LifestyleImagePromptBuilder

**Purpose:**
Generate detailed and evocative prompts for an AI image generator to create high-quality lifestyle photos for a product.

---

## Template Definition
- **Name:** LifestyleImagePromptBuilder
- **Inputs:**
  - `product_name` (string, required)
  - `product_category` (string, required)
  - `target_audience` (string, required)
  - `setting` (string, required, e.g., "coffee shop", "beach", "office")
  - `mood` (string, optional, default: "natural")
- **Output Schema:** schemas/image_prompt.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "product_category": "tech gadget",
  "target_audience": "young professionals",
  "setting": "modern co-working space",
  "mood": "focused and productive"
}
```

## Example Output
```json
{
  "prompts": [
    {
      "prompt_id": "prompt_1",
      "prompt_text": "A young professional woman is working on her laptop in a bright, modern co-working space. The Quantum-Charge Power Bank is on the table next to her, charging her phone. The mood is focused and productive, with soft, natural morning light. Photorealistic, 35mm lens, shallow depth of field.",
      "negative_prompt": "blurry, cartoon, watermark, unrealistic"
    },
    {
      "prompt_id": "prompt_2",
      "prompt_text": "Close-up shot of the Quantum-Charge Power Bank on a minimalist wooden desk in a co-working space. In the background, a person is typing on a laptop, slightly out of focus. The scene is clean, organized, and conveys a sense of productivity. Cinematic lighting, high detail, macro shot.",
      "negative_prompt": "clutter, messy, dark, grainy"
    },
    {
      "prompt_id": "prompt_3",
      "prompt_text": "A group of diverse young professionals collaborating around a table in a co-working space. One of them is using the Quantum-Charge Power Bank to charge their tablet. The atmosphere is energetic and creative. Shot from a slightly high angle, vibrant colors, sharp focus.",
      "negative_prompt": "old-fashioned, stock photo, generic, posed"
    }
  ]
}
```

## Notes
- Prompts should be descriptive and include details about the subject, setting, lighting, and mood.
- Include technical photography terms like `photorealistic`, `35mm lens`, `cinematic lighting` to guide the AI.
- The `negative_prompt` should list terms to exclude from the generated image.