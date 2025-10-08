import { Template } from '../types';

export const VIDEO_HOOK_GENERATOR: Template = {
  id: 'video-hook-generator',
  name: 'Video Hook Generator',
  isBuiltin: true,
  content: `
    You are an expert video scriptwriter.
    Generate 5 short, engaging hooks for a video about '{topic}'.
    The target audience is {audience}.
    Each hook should be no longer than {max_seconds} seconds.
    The desired emotion is '{emotion}'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates engaging video hooks.',
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
    You are a professional video producer.
    Write a full video script for a video titled '{video_title}'.
    The total length should be approximately {total_seconds} seconds.
    The target audience is {audience}.
    The script should follow this structure: {structure}.
    Provide a scene-by-scene list of objects, each with 'start', 'end', 'action', 'dialogue', and 'visual_notes'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Builds a full video script from a title and structure.',
    tags: ['video', 'scriptwriting', 'production'],
    language: 'en',
    field: 'video-creation',
  },
};

export const TRANSCRIPT_CLEANER: Template = {
  id: 'transcript-cleaner',
  name: 'Transcript Cleaner & Caption Generator',
  isBuiltin: true,
  content: `
    You are an expert in video transcription and captioning.
    Clean the following raw transcript, removing filler words and correcting errors.
    If {speaker_tags} is true, identify and tag speakers.
    Format the output as SRT-like captions with a maximum line length of {line_length}.
    Also provide a short metadata object with 'reading_time' and 'word_count'.
    Raw Transcript:
    ---
    {raw_transcript}
    ---
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Cleans a raw transcript and generates captions.',
    tags: ['video', 'transcription', 'captions'],
    language: 'en',
    field: 'video-creation',
  },
};

export const ARTICLE_TO_SHORT_CLIPS_REPURPOSER: Template = {
  id: 'article-to-short-clips-repurposer',
  name: 'Article -> Short Clips Repurposer',
  isBuiltin: true,
  content: `
    You are a social media video strategist.
    Repurpose the following article sections into short video clips of about {clip_length_seconds} seconds for {platform}.
    For each clip, provide a JSON object with 'clip_topic', 'start_text', 'call_to_action', 'overlay_text', and 'thumbnail_preset'.
    Article Sections:
    ---
    {article_sections}
    ---
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Repurposes article sections into short video clips.',
    tags: ['video', 'social-media', 'repurposing'],
    language: 'en',
    field: 'video-creation',
  },
};


export const VIDEO_TEMPLATES = {
  [VIDEO_HOOK_GENERATOR.id]: VIDEO_HOOK_GENERATOR,
  [FULL_SCRIPT_BUILDER.id]: FULL_SCRIPT_BUILDER,
  [TRANSCRIPT_CLEANER.id]: TRANSCRIPT_CLEANER,
  [ARTICLE_TO_SHORT_CLIPS_REPURPOSER.id]: ARTICLE_TO_SHORT_CLIPS_REPURPOSER,
};