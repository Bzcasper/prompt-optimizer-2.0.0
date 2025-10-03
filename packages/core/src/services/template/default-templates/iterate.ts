import { Template, MessageTemplate } from '../types';

export const ITERATE_TEMPLATES: Record<string, Template> = {
  'ab-variation-creator': {
    id: 'ab-variation-creator',
    name: 'A/B Variation Creator',
    content: [
        {
            role: 'system',
            content: 'You are an expert copywriter. Your task is to create A/B variations of a given text.'
        },
        {
            role: 'user',
            content: 'Please create {num_variations} A/B variations of the following base copy: "{base_copy}". The elements to vary are: {elements_to_vary}.'
        }
    ] as MessageTemplate[],
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'iterate',
      language: 'en',
    },
    isBuiltin: true,
  },
};