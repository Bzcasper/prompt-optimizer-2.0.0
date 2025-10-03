# Knowledge File: UnboxingVideoShortsIdea

**Purpose:**
Generate creative concepts for short-form (e.g., TikTok, Reels) unboxing videos that are engaging and highlight key product features.

---

## Template Definition
- **Name:** UnboxingVideoShortsIdea
- **Inputs:**
  - `product_name` (string, required)
  - `product_category` (string, required, e.g., "tech gadget", "skincare", "fashion accessory")
  - `key_selling_points` (list[string], required)
- **Output Schema:** schemas/shorts_ideas.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "product_category": "tech gadget",
  "key_selling_points": [
    "Incredibly fast charging",
    "Super slim and lightweight",
    "Charges multiple devices at once"
  ]
}
```

## Example Output
```json
{
  "video_ideas": [
    {
      "concept_title": "The 10-Second Charge Challenge",
      "hook": "They said it was fast, but I didn't expect THIS...",
      "visual_sequence": [
        "User unboxes the power bank with a skeptical look.",
        "Plugs in a phone at 1% battery.",
        "Quick time-lapse showing the battery percentage flying up in seconds.",
        "Ends with a shocked/impressed reaction shot."
      ],
      "audio_suggestion": "Trending upbeat, fast-paced electronic track. Use a 'ding' sound effect as the battery percentage increases."
    },
    {
      "concept_title": "Does it Pass the Pocket Test?",
      "hook": "Is this the slimmest power bank ever?",
      "visual_sequence": [
        "User holds up their old, bulky power bank.",
        "Unboxes the new Quantum-Charge power bank.",
        "Side-by-side visual comparison of the thickness.",
        "User easily slides the new power bank into the pocket of their jeans."
      ],
      "audio_suggestion": "A minimalist, clean-sounding track. A satisfying 'swoosh' sound effect when it slides into the pocket."
    },
    {
      "concept_title": "The Ultimate Multitasker",
      "hook": "My phone, my headphones, my tablet... Can it charge them ALL?",
      "visual_sequence": [
        "Lay out multiple devices with low battery warnings.",
        "Unbox the power bank and plug in all the devices at once.",
        "Show all devices charging simultaneously.",
        "End with a shot of the user looking relaxed and stress-free."
      ],
      "audio_suggestion": "A calm, lo-fi beat. Use a 'power up' sound effect when all devices are connected."
    }
  ]
}
```

## Notes
- Each `video_idea` should be a self-contained concept.
- The `hook` should be a short, attention-grabbing sentence or question.
- `visual_sequence` should be a bulleted list of key shots.
- `audio_suggestion` should include both music style and potential sound effects.