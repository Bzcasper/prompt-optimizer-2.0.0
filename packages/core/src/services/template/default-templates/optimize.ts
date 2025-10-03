import { Template } from '../types';

export const OPTIMIZE_TEMPLATES: Record<string, Template> = {
  'title-headline-optimizer': {
    id: 'title-headline-optimizer',
    name: 'Title + Headline Optimizer',
    content: 'Generate 3 headline options for the following raw title: "{raw_title}". The primary keyword is "{primary_keyword}", the target audience is {audience}, and the maximum number of characters is {max_chars}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'optimize',
      language: 'en',
    },
    isBuiltin: true,
  },
};