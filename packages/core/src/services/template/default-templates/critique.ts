import { Template } from '../types';

export const CRITIQUE_PROMPT: Template = {
  id: 'critique-prompt',
  name: 'Prompt Critic',
  isBuiltin: true,
  content: `
You are a Prompt Critic Agent. Your task is to evaluate a given prompt based on the following criteria:
1.  **Clarity and Specificity**: Is the prompt clear, specific, and unambiguous?
2.  **Completeness**: Does the prompt contain all the necessary information, variables, and context for an LLM to generate a high-quality response?
3.  **Potential for Prompt Injection**: Does the prompt have any vulnerabilities that could be exploited by prompt injection attacks?

You must respond in a valid JSON format with the following structure:
{
  "is_passed": boolean,
  "critique": "Your detailed critique and suggestions for improvement here. If the prompt is good, briefly explain why."
}

Here is the prompt to critique:
---
{{promptToCritique}}
---
`,
  metadata: {
    version: '1.0.0',
    templateType: 'system',
    author: 'Jules',
    description: 'Critiques a prompt for clarity, completeness, and security.',
    tags: ['system', 'critique', 'quality-assurance'],
    language: 'en',
    field: 'system',
  },
};

export const REFINE_PROMPT: Template = {
  id: 'refine-based-on-critique',
  name: 'Refine Prompt Based on Critique',
  isBuiltin: true,
  content: `
You are a Prompt Refinement Agent. Your task is to refine a prompt based on the provided critique.

**Original Prompt:**
---
{{originalPrompt}}
---

**Critique:**
---
{{critique}}
---

Please provide a refined version of the prompt that addresses the issues raised in the critique.
`,
  metadata: {
    version: '1.0.0',
    templateType: 'system',
    author: 'Jules',
    description: 'Refines a prompt based on a critique.',
    tags: ['system', 'refinement', 'quality-assurance'],
    language: 'en',
    field: 'system',
  },
};

export const CRITIQUE_TEMPLATES = {
  [CRITIQUE_PROMPT.id]: CRITIQUE_PROMPT,
  [REFINE_PROMPT.id]: REFINE_PROMPT,
};