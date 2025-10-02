import { Template } from '../types';

export const PROMPT_BUILDER: Template = {
  id: 'prompt-builder',
  name: 'Prompt Builder',
  isBuiltin: true,
  content: `
    You are an expert prompt engineer for image generation models.
    Build a detailed image generation prompt based on the following concept: {concept}.
    Include details about the subject, style, lighting, composition, and any other relevant parameters.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'text2imageOptimize',
    author: 'Jules',
    description: 'Builds a detailed image generation prompt from a concept.',
    tags: ['image', 'prompting', 'ai'],
    language: 'en',
    field: 'image-creation',
  },
};

export const THUMBNAIL_STYLE_PRESET: Template = {
  id: 'thumbnail-style-preset',
  name: 'Thumbnail Style Preset',
  isBuiltin: true,
  content: `
    Apply the following style preset to the image prompt:
    Style: 3D, high detail, cinematic lighting, vibrant colors.
    {image_prompt}
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'text2imageOptimize',
    author: 'Jules',
    description: 'Applies a style preset to an image prompt.',
    tags: ['image', 'style', 'thumbnail'],
    language: 'en',
    field: 'image-creation',
  },
};

export const IMAGE_TEMPLATES = {
  [PROMPT_BUILDER.id]: PROMPT_BUILDER,
  [THUMBNAIL_STYLE_PRESET.id]: THUMBNAIL_STYLE_PRESET,
};