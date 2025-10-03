# Knowledge File: KeywordExpander

**Purpose:**
Expand a list of seed keywords into a broader set of related long-tail, semantic, and question-based keywords for SEO and content strategy.

---

## Template Definition
- **Name:** KeywordExpander
- **Inputs:**
  - `seed_keywords` (list[string], required)
  - `intent` (string, optional, enum: informational, commercial, transactional, navigational; default: informational)
  - `num_variants` (int, optional, default: 10)
- **Output Schema:** schemas/keyword_expansion.schema.json

---

## Example Input
```json
{
  "seed_keywords": ["power bank", "portable charger"],
  "intent": "commercial",
  "num_variants": 5
}
```

## Example Output
```json
{
  "keyword_analysis": {
    "seed_keywords": ["power bank", "portable charger"],
    "intent": "commercial",
    "expansion": {
      "long_tail": [
        "best fast charging power bank for iphone",
        "slim portable charger for android",
        "10000mah power bank with usb-c",
        "lightweight power bank for travel",
        "most reliable portable phone charger"
      ],
      "semantic": [
        "external battery pack",
        "mobile charging brick",
        "on-the-go power solution",
        "handheld battery booster",
        "pocket power cell"
      ],
      "questions": [
        "what is the best power bank to buy?",
        "how long does a 10000mah power bank last?",
        "can you take a portable charger on a plane?",
        "which power bank charges the fastest?",
        "power bank vs portable charger"
      ]
    }
  }
}
```

## Notes
- The expansion should be categorized into `long_tail`, `semantic`, and `questions`.
- The generated keywords should align with the specified `intent`.
- This primitive is designed to be chained with content creation templates like `ProductDescriptionGenerator` or `SEOBlogWriter`.