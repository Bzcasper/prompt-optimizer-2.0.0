import { Template } from '../types';

export const THUMBNAIL_STYLE_PRESET_IO: Template = {
  id: 'thumbnail-style-preset-io',
  name: 'Thumbnail Style Preset',
  isBuiltin: true,
  content: `
    You are a graphic designer specializing in thumbnails.
    Create a JSON preset for a thumbnail with the following style:
    - Style: {style}
    - Target Audience: {target_audience}
    - Aspect Ratio: {aspect_ratio}
    The JSON object should include keys for 'overlayText', 'fontSuggestion', 'compositionNotes', and 'cropSpecs'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'imageOptimize',
    author: 'Jules',
    description: 'Generates a JSON preset for thumbnail styles.',
    tags: ['image', 'thumbnails', 'design'],
    language: 'en',
    field: 'image-creation',
  },
};

export const IMAGE_PROMPT_OPTIMIZER_IO: Template = {
  id: 'image-prompt-optimizer-io',
  name: 'Image Prompt Optimizer',
  isBuiltin: true,
  content: `
    You are an expert prompt engineer for image generation models.
    Refine the following base prompt: '{base_prompt}'.
    Incorporate the desired style: '{desired_style}'.
    Exclude the following negative terms: '{negative_terms}'.
    Your output should be a single-line refined prompt.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'imageOptimize',
    author: 'Jules',
    description: 'Optimizes a base prompt for image generation.',
    tags: ['image', 'prompt-engineering', 'optimization'],
    language: 'en',
    field: 'image-creation',
  },
};

export const ALT_TEXT_GENERATOR_IO: Template = {
  id: 'alt-text-generator-io',
  name: 'ALT Text Generator',
  isBuiltin: true,
  content: `
    You are an accessibility and SEO expert.
    Generate a 1-sentence alt text and a short social media caption for an image described as: '{image_description}'.
    The target audience is {audience} and the primary SEO keyword is '{seo_keyword}'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'imageOptimize',
    author: 'Jules',
    description: 'Generates alt text and social media captions for images.',
    tags: ['image', 'accessibility', 'seo'],
    language: 'en',
    field: 'image-creation',
  },
};

export const RESIZE_COMPRESSION_PRESET_IO: Template = {
  id: 'resize-compression-preset-io',
  name: 'Resize & Compression Preset',
  isBuiltin: true,
  content: `
    You are an expert in image optimization.
    Generate a JSON object with resize and compression settings for the target platform '{target_platform}'.
    The maximum filesize is {max_filesize_kb}KB and the priority is '{priority}'.
    The JSON object should include 'width', 'height', 'format', and 'quality'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'imageOptimize',
    author: 'Jules',
    description: 'Generates resize and compression presets for images.',
    tags: ['image', 'optimization', 'performance'],
    language: 'en',
    field: 'image-creation',
  },
};

export const VARIATION_GENERATOR_IO: Template = {
  id: 'variation-generator-io',
  name: 'Variation Generator (image)',
  isBuiltin: true,
  content: `
    You are an AI image prompt expert.
    Generate a list of {num_variations} prompt variations based on the following base prompt: '{base_prompt}'.
    The variations should explore different aspects based on the style: '{variation_style}'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'imageOptimize',
    author: 'Jules',
    description: 'Generates variations of an image prompt.',
    tags: ['image', 'prompt-engineering', 'variations'],
    language: 'en',
    field: 'image-creation',
  },
};

export const IMAGE_OPTIMIZE_TEMPLATES = {
  [THUMBNAIL_STYLE_PRESET_IO.id]: THUMBNAIL_STYLE_PRESET_IO,
  [IMAGE_PROMPT_OPTIMIZER_IO.id]: IMAGE_PROMPT_OPTIMIZER_IO,
  [ALT_TEXT_GENERATOR_IO.id]: ALT_TEXT_GENERATOR_IO,
  [RESIZE_COMPRESSION_PRESET_IO.id]: RESIZE_COMPRESSION_PRESET_IO,
  [VARIATION_GENERATOR_IO.id]: VARIATION_GENERATOR_IO,
};