export const imageOptimizeTemplates = [
  {
    title: "Thumbnail Style Preset",
    inputs: ["{style}", "{target_audience}", "{aspect_ratio}"],
    outputFormat: "JSON {overlayText,fontSuggestion,compositionNotes,cropSpecs}",
    exampleInput: { style: "retro", target_audience: "teens", aspect_ratio: "16:9" },
    exampleOutput: {
      overlayText: "Retro Room Makeover",
      fontSuggestion: "Bold condensed sans",
      compositionNotes: "Left third portrait, bright vignette, grain",
      cropSpecs: "16:9 center crop"
    }
  },
  {
    title: "Image Prompt Optimizer",
    inputs: ["{base_prompt}", "{desired_style}", "{negative_terms}"],
    outputFormat: "Single-line refined prompt",
    exampleInput: { base_prompt: "gold vintage ring close-up", desired_style: "macro, high-contrast", negative_terms: "blurry, watermark" },
    exampleOutput: "Macro close-up of a gold vintage ring, textured patina, high-contrast lighting, shallow depth of field — avoid blurry, watermark."
  },
  // ...other image templates
] as const;