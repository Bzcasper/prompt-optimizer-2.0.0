# Knowledge File: ProductDescriptionGenerator

**Purpose:**
Generate a compelling and SEO-friendly product description based on product features and target audience.

---

## Template Definition
- **Name:** ProductDescriptionGenerator
- **Inputs:**
  - `product_name` (string, required)
  - `features` (list[string], required)
  - `target_audience` (string, optional, default: "general consumers")
  - `tone` (string, optional, enum: professional, casual, witty, enthusiastic; default: professional)
  - `seo_keywords` (list[string], optional, default: [])
- **Output Schema:** schemas/product_description.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "features": [
    "10,000mAh capacity",
    "Quantum-tunneling fast charge technology",
    "Dual USB-C and USB-A ports",
    "Ultra-slim aluminum body"
  ],
  "target_audience": "tech-savvy professionals",
  "tone": "enthusiastic",
  "seo_keywords": ["fast charging power bank", "portable charger", "slim power bank"]
}
```

## Example Output
```json
{
  "product_title": "Quantum-Charge Power Bank: Unleash Lightning-Fast Charging",
  "description_short": "Never run out of power again with the Quantum-Charge Power Bank! Designed for tech-savvy professionals, this ultra-slim aluminum power bank uses groundbreaking quantum-tunneling technology to charge your devices in record time. With a massive 10,000mAh capacity and dual ports, it's the ultimate portable charger for those on the go.",
  "description_long": "### The Future of Charging is Here\n\nExperience the revolution in portable power with the Quantum-Charge Power Bank. We've harnessed quantum-tunneling technology to deliver charging speeds you have to see to believe. Its robust 10,000mAh battery can recharge your smartphone multiple times, while the dual USB-C and USB-A ports offer versatile connectivity for all your devices.\n\n### Sleek Design, Powerful Performance\n\nCrafted from premium aluminum, the ultra-slim body is not only durable but slips easily into your pocket or bag. It's the perfect companion for business trips, daily commutes, or any adventure. Stop waiting and start charging with the most enthusiastic and powerful portable charger on the market.",
  "tags": ["power bank", "fast charging", "portable charger", "tech gadget", "usb-c"]
}
```

## Notes
- The `description_long` should be in Markdown format.
- Ensure `seo_keywords` are naturally integrated into the descriptions.
- The tone should be consistently applied across all generated text.