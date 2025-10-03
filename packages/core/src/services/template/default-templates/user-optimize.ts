import { Template } from '../types';

export const USER_OPTIMIZE_TEMPLATES: Record<string, Template> = {
  'tone-persona-adapter': {
    id: 'tone-persona-adapter',
    name: 'Tone & Persona Adapter',
    content: 'Adapt the following source copy to a {persona} persona with a reading level of grade {reading_level}:\n\n{source_copy}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'user-optimize',
      language: 'en',
    },
    isBuiltin: true,
  },
};