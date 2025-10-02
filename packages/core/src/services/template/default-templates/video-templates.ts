import { Template } from '../types';

export const HOOK_GENERATOR: Template = {
  id: 'hook-generator',
  name: 'Hook Generator',
  isBuiltin: true,
  content: `
    You are an expert video scriptwriter.
    Generate 3-5 engaging hooks for a video about: {topic}.
    Each hook should be 1-2 sentences long and grab the viewer's attention immediately.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates engaging hooks for video scripts.',
    tags: ['video', 'scriptwriting', 'hooks'],
    language: 'en',
    field: 'video-creation',
  },
};

export const FULL_SCRIPT_BUILDER: Template = {
  id: 'full-script-builder',
  name: 'Full Script Builder',
  isBuiltin: true,
  content: `
    You are an expert video scriptwriter.
    Write a full video script based on the following topic and key points:
    Topic: {topic}
    Key Points: {key_points}
    The script should be approximately {duration} minutes long and include an introduction, body, and conclusion.
    Format the output with clear scene descriptions and dialogue.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Builds a full video script from a topic and key points.',
    tags: ['video', 'scriptwriting', 'content'],
    language: 'en',
    field: 'video-creation',
  },
};

export const SCENE_LIST_OPTIMIZER: Template = {
  id: 'scene-list-optimizer',
  name: 'Scene List Optimizer',
  isBuiltin: true,
  content: `
    You are an expert video editor and storyteller.
    Review the following scene list and suggest optimizations for better flow and visual interest:
    {scene_list}
    Provide a revised scene list with your suggestions and rationale.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Optimizes a scene list for better video flow.',
    tags: ['video', 'editing', 'storytelling'],
    language: 'en',
    field: 'video-creation',
  },
};

export const VIDEO_TEMPLATES = {
  [HOOK_GENERATOR.id]: HOOK_GENERATOR,
  [FULL_SCRIPT_BUILDER.id]: FULL_SCRIPT_BUILDER,
  [SCENE_LIST_OPTIMIZER.id]: SCENE_LIST_OPTIMIZER,
};