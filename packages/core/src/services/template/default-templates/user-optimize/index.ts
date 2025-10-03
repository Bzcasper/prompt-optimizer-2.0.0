export const userOptimizeTemplates = [
  {
    title: "Tone & Persona Adapter",
    inputs: ["{source_copy}", "{persona}", "{reading_level}"],
    outputFormat: "{adapted_copy, notes}",
    exampleInput: { source_copy: "Our necklace is handcrafted...", persona: "luxury buyer", reading_level: "grade10" }
  },
  // ...other user-optimize templates
] as const;