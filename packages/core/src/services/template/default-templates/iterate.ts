import { Template } from '../types';

export const AB_VARIATION_CREATOR_I: Template = {
  id: 'ab-variation-creator-i',
  name: 'A/B Variation Creator',
  isBuiltin: true,
  content: `
    You are a master copywriter specializing in A/B testing.
    Generate {num_variations} variations of the following base copy: '{base_copy}'.
    Focus on varying these elements: {elements_to_vary}.
    Your output should be a list of JSON objects, each with 'variantId', 'copy', and 'notes'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'iterate',
    author: 'Jules',
    description: 'Creates A/B variations of a given piece of copy.',
    tags: ['copywriting', 'marketing', 'testing'],
    language: 'en',
    field: 'iteration',
  },
};

export const FEEDBACK_LOOP_PROMPT_I: Template = {
  id: 'feedback-loop-prompt-i',
  name: 'Feedback Loop Prompt',
  isBuiltin: true,
  content: `
    You are an expert editor.
    Revise the following draft based on the reviewer notes and priority areas.
    Draft:
    ---
    {draft_output}
    ---
    Reviewer Notes: {reviewer_notes}
    Priority Areas: {priority_areas}
    Your output should be the revised draft and a bulleted change-log.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'iterate',
    author: 'Jules',
    description: 'Revises a draft based on feedback.',
    tags: ['editing', 'writing', 'feedback'],
    language: 'en',
    field: 'iteration',
  },
};

export const INCREMENTAL_IMPROVEMENT_STEPPER_I: Template = {
  id: 'incremental-improvement-stepper-i',
  name: 'Incremental Improvement Stepper',
  isBuiltin: true,
  content: `
    You are a product manager.
    Based on the current version '{current_version}' and the improvement target '{improvement_target}',
    generate a numbered list of up to {max_steps} concrete improvement steps.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'iterate',
    author: 'Jules',
    description: 'Generates steps for incremental improvement.',
    tags: ['product-management', 'strategy', 'planning'],
    language: 'en',
    field: 'iteration',
  },
};

export const VARIANT_SCORER_I: Template = {
  id: 'variant-scorer-i',
  name: 'Variant Scorer',
  isBuiltin: true,
  content: `
    You are a data analyst.
    Score the following text variants based on the criteria: {scoring_criteria}.
    Variants:
    ---
    {variant_texts}
    ---
    Your output should be a ranked list of JSON objects, each with 'variant', 'score', and 'explanation'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'iterate',
    author: 'Jules',
    description: 'Scores text variants based on given criteria.',
    tags: ['analysis', 'testing', 'data'],
    language: 'en',
    field: 'iteration',
  },
};

export const ITERATE_TEMPLATES = {
  [AB_VARIATION_CREATOR_I.id]: AB_VARIATION_CREATOR_I,
  [FEEDBACK_LOOP_PROMPT_I.id]: FEEDBACK_LOOP_PROMPT_I,
  [INCREMENTAL_IMPROVEMENT_STEPPER_I.id]: INCREMENTAL_IMPROVEMENT_STEPPER_I,
  [VARIANT_SCORER_I.id]: VARIANT_SCORER_I,
};