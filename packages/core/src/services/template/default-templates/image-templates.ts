import { Template } from '../types';

export const IMAGE_PROMPT_BUILDER: Template = {
  id: 'image-prompt-builder',
  name: 'Image Prompt Builder',
  isBuiltin: true,
  content: `
    You are an expert prompt engineer for image generation models.
    Create a single-line, detailed prompt for an image with the following characteristics:
    - Subject: {subject}
    - Style: {style}
    - Shot Type: {shot_type}
    - Lighting: {lighting}
    - Keywords to Include: {keywords_to_include}
    Your output should be a single-line prompt, alt text, and a short caption.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Builds a detailed, single-line prompt for image generation.',
    tags: ['image', 'prompt-engineering', 'generation'],
    language: 'en',
    field: 'image-creation',
  },
};

export const THUMBNAIL_STYLE_PRESET: Template = {
  id: 'thumbnail-style-preset',
  name: 'Thumbnail Style Preset',
  isBuiltin: true,
  content: `
    You are a graphic designer specializing in thumbnails.
    Create a JSON preset for a thumbnail for {platform} targeting a '{audience}' audience with a '{style}' style and '{aspect_ratio}' aspect ratio.
    The JSON object should include keys for 'overlayText', 'font', 'focalComposition', 'colorPalette', and 'cropSpecs'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates a JSON preset for thumbnail styles.',
    tags: ['image', 'thumbnails', 'design'],
    language: 'en',
    field: 'image-creation',
  },
};

export const IMAGE_VARIATION_GENERATOR: Template = {
  id: 'image-variation-generator',
  name: 'Image Variation Generator',
  isBuiltin: true,
  content: `
    You are an AI image prompt expert.
    Generate a numbered list of {num_variations} prompt variations based on the following base prompt: '{base_prompt}'.
    The variations should explore different aspects based on the style: '{variance_style}'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates variations of an image prompt.',
    tags: ['image', 'prompt-engineering', 'variations'],
    language: 'en',
    field: 'image-creation',
  },
};

export const IMAGE_TEMPLATES = {
  [IMAGE_PROMPT_BUILDER.id]: IMAGE_PROMPT_BUILDER,
  [THUMBNAIL_STYLE_PRESET.id]: THUMBNAIL_STYLE_PRESET,
  [IMAGE_VARIATION_GENERATOR.id]: IMAGE_VARIATION_GENERATOR,
};