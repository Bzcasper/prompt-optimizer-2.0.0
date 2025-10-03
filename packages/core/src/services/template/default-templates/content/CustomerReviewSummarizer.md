# Knowledge File: CustomerReviewSummarizer

**Purpose:**
Summarize a collection of customer reviews into a concise overview of pros, cons, and key themes.

---

## Template Definition
- **Name:** CustomerReviewSummarizer
- **Inputs:**
  - `reviews` (list[string], required)
  - `product_name` (string, required)
  - `num_themes` (int, optional, default: 3)
- **Output Schema:** schemas/review_summary.schema.json

---

## Example Input
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "reviews": [
    "This thing is amazing! It charges my phone so fast, and it's super slim. My only complaint is that the cable it came with is a bit short.",
    "I love the aluminum body, feels very premium. The fast charging is no joke. I wish it had a digital display for the remaining percentage.",
    "A solid power bank. It's a bit heavier than I expected, but the battery life is incredible. Lasts me all week.",
    "Finally, a power bank that can keep up with my new phone. The speed is just fantastic. The design is sleek and modern."
  ],
  "num_themes": 3
}
```

## Example Output
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "summary": {
    "overall_sentiment": "Positive",
    "pros": [
      "Extremely fast charging speed",
      "Premium, slim aluminum design",
      "Excellent battery capacity and life"
    ],
    "cons": [
      "Included cable is short",
      "Lacks a digital battery display",
      "Slightly heavier than some users expected"
    ],
    "key_themes": [
      {
        "theme": "Charging Performance",
        "mentions": 3,
        "summary": "Customers consistently praise the 'quantum-tunneling' fast charge technology, describing it as a major advantage."
      },
      {
        "theme": "Design & Portability",
        "mentions": 3,
        "summary": "The slim, premium aluminum body is a highlight, though some find it slightly heavier than anticipated."
      },
      {
        "theme": "Feature Suggestions",
        "mentions": 2,
        "summary": "Users have suggested improvements such as a longer included cable and a digital display for remaining battery."
      }
    ]
  }
}
```

## Notes
- The summarizer should identify recurring topics to generate `key_themes`.
- Sentiment analysis should be performed to determine the `overall_sentiment`.
- Pros and cons should be extracted directly from recurring points in the reviews.