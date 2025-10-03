import { Template } from '../types';

export const TONE_PERSONA_ADAPTER_UO: Template = {
  id: 'tone-persona-adapter-uo',
  name: 'Tone & Persona Adapter',
  isBuiltin: true,
  content: `
    You are an expert copywriter and editor.
    Adapt the following source copy to fit the persona of a '{persona}' with a reading level of '{reading_level}'.
    Source Copy:
    ---
    {source_copy}
    ---
    Your output should be a JSON object with 'adapted_copy' and 'notes'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'user-optimize',
    author: 'Jules',
    description: 'Adapts copy to a specific tone and persona.',
    tags: ['copywriting', 'editing', 'personalization'],
    language: 'en',
    field: 'user-optimization',
  },
};

export const LOCALIZATION_SHORTENER_UO: Template = {
  id: 'localization-shortener-uo',
  name: 'Localization Shortener',
  isBuiltin: true,
  content: `
    You are an expert in localization.
    Translate and shorten the following copy for the '{target_locale}' locale, keeping it under {word_limit} words.
    Source Copy:
    ---
    {source_copy}
    ---
    Your output should be the localized short copy as plain text.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'user-optimize',
    author: 'Jules',
    description: 'Shortens and localizes copy for a specific locale.',
    tags: ['localization', 'copywriting', 'translation'],
    language: 'en',
    field: 'user-optimization',
  },
};

export const READABILITY_SIMPLIFIER_UO: Template = {
  id: 'readability-simplifier-uo',
  name: 'Readability Simplifier',
  isBuiltin: true,
  content: `
    You are an expert in clear communication.
    Simplify the following text to a '{target_grade}' grade reading level.
    Text:
    ---
    {text}
    ---
    Your output should be a single paragraph of simplified text.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'user-optimize',
    author: 'Jules',
    description: 'Simplifies text to a specific grade reading level.',
    tags: ['copywriting', 'editing', 'readability'],
    language: 'en',
    field: 'user-optimization',
  },
};

export const ACCESSIBILITY_CHECKLIST_GENERATOR_UO: Template = {
  id: 'accessibility-checklist-generator-uo',
  name: 'Accessibility Checklist Generator',
  isBuiltin: true,
  content: `
    You are an accessibility expert.
    Generate a checklist for a '{page_type}' page that includes the following components: {components_present}.
    The checklist should be a bulleted list indicating if each component meets accessibility standards (present, missing, or needs improvement).
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'user-optimize',
    author: 'Jules',
    description: 'Generates an accessibility checklist for a web page.',
    tags: ['accessibility', 'web-development', 'qa'],
    language: 'en',
    field: 'user-optimization',
  },
};

export const USER_OPTIMIZE_TEMPLATES = {
  [TONE_PERSONA_ADAPTER_UO.id]: TONE_PERSONA_ADAPTER_UO,
  [LOCALIZATION_SHORTENER_UO.id]: LOCALIZATION_SHORTENER_UO,
  [READABILITY_SIMPLIFIER_UO.id]: READABILITY_SIMPLIFIER_UO,
  [ACCESSIBILITY_CHECKLIST_GENERATOR_UO.id]: ACCESSIBILITY_CHECKLIST_GENERATOR_UO,
};