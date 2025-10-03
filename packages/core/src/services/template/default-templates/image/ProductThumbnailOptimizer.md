# Knowledge File: ProductThumbnailOptimizer

**Purpose:**
Generate optimized prompts for creating eye-catching product thumbnails for e-commerce platforms.

---

## Template Definition
- **Name:** ProductThumbnailOptimizer
- **Inputs:**
  - `product_name` (string, required)
  - `product_photo_description` (string, required, describe the main product photo)
  - `platform` (string, optional, enum: Amazon, Shopify, Etsy, general; default: general)
  - `style` (string, optional, enum: clean, dynamic, minimalist, bold; default: clean)
- **Output Schema:** schemas/image_prompt.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "product_photo_description": "A sleek, silver aluminum power bank, shown from a 3/4 angle.",
  "platform": "Amazon",
  "style": "dynamic"
}
```

## Example Output
```json
{
  "prompts": [
    {
      "prompt_id": "prompt_1_main",
      "prompt_text": "Sleek, silver aluminum Quantum-Charge Power Bank on a pure white background, 3/4 angle. Studio lighting, sharp focus, with a subtle reflection underneath. E-commerce thumbnail for Amazon, professional, high-resolution.",
      "negative_prompt": "shadows, busy background, text, people"
    },
    {
      "prompt_id": "prompt_2_dynamic",
      "prompt_text": "Dynamic shot of the silver Quantum-Charge Power Bank with blue energy streaks flowing out of its ports, symbolizing fast charging. Dark, tech-inspired background. Glowing effects, high contrast, commercial product photography.",
      "negative_prompt": "blurry, dull, unrealistic colors"
    },
    {
      "prompt_id": "prompt_3_infographic",
      "prompt_text": "Product thumbnail infographic for the Quantum-Charge Power Bank. The power bank is in the center, with clean icons and text pointing to key features: '10,000mAh', 'Quantum-Charge Speed', 'Dual Ports'. White background, Amazon-compliant.",
      "negative_prompt": "clutter, complex graphics, hard-to-read text"
    }
  ]
}
```

## Notes
- The primary prompt should always be a clean, professional shot on a white background, suitable for the main e-commerce image.
- Other prompts should offer creative variations based on the selected `style`.
- Prompts should be optimized for the conventions of the specified `platform` if provided.
- Include keywords like "e-commerce thumbnail" and "product photography" to guide the AI.