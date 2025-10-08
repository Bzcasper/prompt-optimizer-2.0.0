# Knowledge File: ProductListingWorkflow

**Purpose:**
Demonstrate a complete, chained workflow for generating a full e-commerce product listing, from keyword research to final marketing assets.

---

## Workflow Definition
- **Name:** ProductListingWorkflow
- **Description:** An end-to-end pipeline that takes a product idea and generates a product description, SEO keywords, and lifestyle image prompts.
- **Chained Templates:**
  1. `KeywordExpander`
  2. `ProductDescriptionGenerator`
  3. `LifestyleImagePromptBuilder`

---

## How It Works

This workflow illustrates how the output of one template can be used as the input for the next, creating an automated content generation pipeline.

### Step 1: Expand Keywords

The workflow starts with a basic product idea and expands it into a rich set of keywords for SEO.

**Template:** `KeywordExpander`

**Example Input:**
```json
{
  "seed_keywords": ["Quantum-Charge Power Bank"],
  "intent": "commercial"
}
```

**Example Output (Partial):**
```json
{
  "keyword_analysis": {
    "expansion": {
      "long_tail": [
        "best fast charging power bank for iphone",
        "slim portable charger for android"
      ]
    }
  }
}
```

### Step 2: Generate Product Description

The keywords generated in Step 1 are fed into the `ProductDescriptionGenerator` to create an SEO-optimized description.

**Template:** `ProductDescriptionGenerator`

**Example Input (Chained from Step 1):**
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "features": [
    "10,000mAh capacity",
    "Quantum-tunneling fast charge technology",
    "Dual USB-C and USB-A ports"
  ],
  "target_audience": "tech-savvy professionals",
  "seo_keywords": [
    "best fast charging power bank for iphone",
    "slim portable charger for android"
  ]
}
```
**Example Output (Partial):**
```json
{
  "product_title": "Quantum-Charge Power Bank: Unleash Lightning-Fast Charging",
  "description_short": "..."
}
```

### Step 3: Create Lifestyle Image Prompts

Finally, using the product name and target audience, the workflow generates prompts for creating lifestyle images for marketing.

**Template:** `LifestyleImagePromptBuilder`

**Example Input (Chained from previous steps):**
```json
{
  "product_name": "Quantum-Charge Power Bank",
  "product_category": "tech gadget",
  "target_audience": "tech-savvy professionals",
  "setting": "airport business lounge",
  "mood": "modern and efficient"
}
```

**Example Output (Partial):**
```json
{
  "prompts": [
    {
      "prompt_id": "prompt_1",
      "prompt_text": "A tech-savvy professional in an airport business lounge works on a laptop, with the Quantum-Charge Power Bank neatly on the table charging their phone..."
    }
  ]
}
```

## Notes
- This workflow demonstrates a simple, linear chain. More complex workflows could involve branching logic, multiple primitives, and human-in-the-loop review steps.
- The key is that the output schema of one template is compatible with the input schema of the next.