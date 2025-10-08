export const iterateTemplates = [
  {
    title: "A/B Variation Creator",
    inputs: ["{base_copy}", "{elements_to_vary}", "{num_variations}"],
    outputFormat: "List of {variantId, copy, notes}",
    exampleInput: { base_copy: "Buy now — 20% off", elements_to_vary: "CTA, headline", num_variations: 3 }
  },
  // ...other iterate templates
] as const;