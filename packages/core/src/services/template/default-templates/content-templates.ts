import { Template } from '../types';

export const TOPIC_IDEA_GENERATOR: Template = {
  id: 'topic-idea-generator',
  name: 'Topic Idea Generator',
  isBuiltin: true,
  content: `
    You are an expert content strategist.
    Generate a list of 5-10 engaging topic ideas based on the following keyword: {keyword}.
    For each topic, provide a brief angle or hook.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates a list of topic ideas with hooks based on a keyword.',
    tags: ['content', 'ideas', 'blogging'],
    language: 'en',
    field: 'content-creation',
  },
};

export const SEO_BLOG_WRITER: Template = {
  id: 'seo-blog-writer',
  name: 'SEO Blog Writer',
  isBuiltin: true,
  content: `
    You are an expert SEO copywriter.
    Write a 500-word blog post on the following topic: {topic}.
    Include the following keywords naturally throughout the text: {keywords}.
    The blog post should have a clear introduction, body, and conclusion.
    Format the output in Markdown.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Writes an SEO-optimized blog post on a given topic.',
    tags: ['content', 'seo', 'blogging'],
    language: 'en',
    field: 'content-creation',
  },
};

export const CTA_GENERATOR: Template = {
  id: 'cta-generator',
  name: 'CTA Generator',
  isBuiltin: true,
  content: `
    You are an expert conversion copywriter.
    Generate 3-5 compelling call-to-action (CTA) phrases for the following offer: {offer}.
    The CTAs should be short, action-oriented, and create a sense of urgency.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates compelling call-to-action phrases.',
    tags: ['content', 'marketing', 'copywriting'],
    language: 'en',
    field: 'content-creation',
  },
};

export const CONTENT_TEMPLATES = {
  [TOPIC_IDEA_GENERATOR.id]: TOPIC_IDEA_GENERATOR,
  [SEO_BLOG_WRITER.id]: SEO_BLOG_WRITER,
  [CTA_GENERATOR.id]: CTA_GENERATOR,
};