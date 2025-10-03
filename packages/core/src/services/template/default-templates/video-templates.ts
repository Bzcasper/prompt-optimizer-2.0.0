import { Template } from '../types';

export const VIDEO_TEMPLATES: Record<string, Template> = {
  'hook-generator': {
    id: 'hook-generator',
    name: 'Hook Generator',
    content: 'Generate 3 short hook lines for a video about {topic}, targeting a {audience} audience. The video should be {length_seconds} seconds long and evoke a feeling of {emotion}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'video',
      language: 'en',
    },
    isBuiltin: true,
  },
  'full-script-builder': {
    id: 'full-script-builder',
    name: 'Full Script Builder',
    content: 'Create a scene-by-scene script with timestamps for a video titled "{title}". The target audience is {audience}, the total length is {total_length_seconds} seconds, and the structure is {structure}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'video',
      language: 'en',
    },
    isBuiltin: true,
  },
  'scene-breakdown-optimizer': {
    id: 'scene-breakdown-optimizer',
    name: 'Scene Breakdown Optimizer',
    content: 'Optimize the following script into a scene list with a maximum of {max_scenes} scenes. The visual constraints are: {visual_constraints}.\n\nScript:\n{script}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'video',
      language: 'en',
    },
    isBuiltin: true,
  },
  'short-form-caption-writer': {
    id: 'short-form-caption-writer',
    name: 'Short-Form Caption Writer',
    content: 'Write a short caption and 3 hashtag suggestions for a video with the following summary: {video_summary}. The platform is {platform}, the tone should be {tone}, and the hashtag seed is {hashtag_seed}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'video',
      language: 'en',
    },
    isBuiltin: true,
  },
  'thumbnail-text-generator': {
    id: 'thumbnail-text-generator',
    name: 'Thumbnail Text Generator',
    content: 'Generate 3 headline overlays (short lines) for a video thumbnail. The video title is "{video_title}" and the main hook is "{main_hook}". The character limit is {char_limit}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'video',
      language: 'en',
    },
    isBuiltin: true,
  },
};