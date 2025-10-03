import { Template } from '../types';

export const IMAGE_TEMPLATES: Record<string, Template> = {
  'prompt-builder': {
    id: 'prompt-builder',
    name: 'Prompt Builder',
    content: 'Generate a single-line detailed prompt for an image with the following characteristics:\n- Subject: {subject}\n- Style: {style}\n- Camera Specs: {camera_specs}\n- Mood: {mood}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'image',
      language: 'en',
    },
    isBuiltin: true,
  },
  'thumbnail-style-preset': {
    id: 'thumbnail-style-preset',
    name: 'Thumbnail Style Preset',
    content: 'Generate a JSON preset for a thumbnail with the following attributes:\n- Style: {style}\n- Target Audience: {target_audience}\n- Aspect Ratio: {aspect_ratio}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'image',
      language: 'en',
    },
    isBuiltin: true,
  },
  'alt-text-generator': {
    id: 'alt-text-generator',
    name: 'ALT Text Generator',
    content: 'Generate alt text and a short social media caption for an image with the following description: {image_description}. The target audience is {audience} and the SEO keyword is "{seo_keyword}".',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'image',
      language: 'en',
    },
    isBuiltin: true,
  },
  'variation-generator': {
    id: 'variation-generator',
    name: 'Variation Generator',
    content: 'Generate {num_variations} variations of the following base prompt: "{base_prompt}". The variation style should be "{variation_style}".',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'image',
      language: 'en',
    },
    isBuiltin: true,
  },
};