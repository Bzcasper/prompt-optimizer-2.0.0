export const optimizeTemplates = [
  {
    title: "Title + Headline Optimizer",
    inputs: ["{raw_title}", "{primary_keyword}", "{audience}", "{max_chars}"],
    outputFormat: "3 headline options {title,length,keyword_present}",
    exampleInput: { raw_title: "Handmade silver bracelet for gifts", primary_keyword: "silver bracelet", audience: "gift shoppers", max_chars: 60 }
  },
  // ...other optimization templates
] as const;