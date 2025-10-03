# Knowledge File: ProductDemoScript

**Purpose:**
Generate a scene-by-scene script for a product demonstration video, complete with visual cues and narration.

---

## Template Definition
- **Name:** ProductDemoScript
- **Inputs:**
  - `product_name` (string, required)
  - `key_features` (list[string], required, max 3)
  - `target_audience` (string, optional, default: "general audience")
  - `video_length_minutes` (int, optional, default: 2)
- **Output Schema:** schemas/video_script.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "key_features": [
    "Quantum-tunneling fast charge technology",
    "Dual USB-C and USB-A ports for multi-device charging",
    "Ultra-slim and durable aluminum body"
  ],
  "target_audience": "busy professionals and travelers",
  "video_length_minutes": 2
}
```

## Example Output
```json
{
  "video_title": "Quantum-Charge Power Bank: The Ultimate Demo",
  "scenes": [
    {
      "scene_number": 1,
      "timestamp": "0:00-0:15",
      "visuals": "Dynamic, quick cuts of a person easily slipping the Quantum-Charge Power Bank into a pocket, a laptop bag, and a purse. Close-up on the sleek aluminum finish.",
      "narration": "Tired of bulky power banks that slow you down? Meet the Quantum-Charge Power Bank. Power, meet portability."
    },
    {
      "scene_number": 2,
      "timestamp": "0:16-0:45",
      "visuals": "Split screen. On one side, a phone charging with a standard charger, percentage slowly ticking up. On the other, the same phone charging with the Quantum-Charge, percentage racing up. A timer graphic highlights the speed difference.",
      "narration": "What makes it different? Our revolutionary quantum-tunneling technology. Stop waiting for hours. Get a full charge in a fraction of the time."
    },
    {
      "scene_number": 3,
      "timestamp": "0:46-1:15",
      "visuals": "A person at a coffee shop simultaneously charges a laptop via USB-C and a phone via USB-A from the same power bank. Show the indicator lights on the power bank.",
      "narration": "For the modern professional, it's all about efficiency. With dual USB-C and USB-A ports, you can power up your laptop and phone at the same time. No more choosing which device gets priority."
    },
    {
      "scene_number": 4,
      "timestamp": "1:16-1:45",
      "visuals": "Close-up shots highlighting the durable aluminum body. Show it resisting a minor scratch from keys in a bag. A graphic overlay shows the product dimensions.",
      "narration": "Built to last and designed to impress. The ultra-slim, premium aluminum body isn't just for looks—it's tough enough to handle your daily hustle. It's power you can feel, and quality you can trust."
    },
    {
      "scene_number": 5,
      "timestamp": "1:46-2:00",
      "visuals": "Final hero shot of the product on a clean background, with the company logo and a call-to-action on screen: 'Available Now at [YourWebsite.com]'.",
      "narration": "The Quantum-Charge Power Bank. Power up your life. Get yours today."
    }
  ]
}
```

## Notes
- The script should be structured chronologically, with clear scene breaks.
- Each scene must include `visuals` and `narration` to guide production.
- The total length of the video should be distributed across the scenes.