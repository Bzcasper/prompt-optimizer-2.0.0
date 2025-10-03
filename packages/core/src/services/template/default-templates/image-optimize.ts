import { Template } from '../types';

export const IMAGE_OPTIMIZE_TEMPLATES: Record<string, Template> = {
  'thumbnail-style-preset-optimize': {
    id: 'thumbnail-style-preset-optimize',
    name: 'Thumbnail Style Preset',
    content: 'Generate a JSON preset for a thumbnail with the following attributes:\n- Style: {style}\n- Target Audience: {target_audience}\n- Aspect Ratio: {aspect_ratio}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'image2imageOptimize',
      language: 'en',
    },
    isBuiltin: true,
  },
  'image-prompt-optimizer': {
    id: 'image-prompt-optimizer',
    name: 'Image Prompt Optimizer',
    content: 'Refine the following base prompt: "{base_prompt}" with the desired style "{desired_style}", avoiding these negative terms: "{negative_terms}".',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'text2imageOptimize',
      language: 'en',
    },
    isBuiltin: true,
  },
};