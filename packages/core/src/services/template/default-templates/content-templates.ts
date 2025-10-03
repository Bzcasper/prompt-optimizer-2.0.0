import { Template } from '../types';

export const CONTENT_TEMPLATES: Record<string, Template> = {
  'topic-idea-generator': {
    id: 'topic-idea-generator',
    name: 'Topic Idea Generator',
    content: 'Generate {num_ideas} topic ideas for a {niche} niche, targeting a {audience} audience with a {tone} tone.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'content',
      language: 'en',
    },
    isBuiltin: true,
  },
  'seo-blog-writer': {
    id: 'seo-blog-writer',
    name: 'SEO Blog Writer',
    content: 'Write an SEO-optimized blog article about {topic}, including the keywords "{keywords}". The target audience is {audience}, the desired word count is {word_count}, and the tone should be {tone}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'content',
      language: 'en',
    },
    isBuiltin: true,
  },
  'cta-generator': {
    id: 'cta-generator',
    name: 'CTA Generator',
    content: 'Generate 5 {length} calls to action (CTAs) for a {product} with the goal of {goal}. The tone should be {tone}.',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'content',
      language: 'en',
    },
    isBuiltin: true,
  },
  'faq-extractor': {
    id: 'faq-extractor',
    name: 'FAQ Extractor',
    content: 'Extract {num_questions} frequently asked questions (FAQs) and their answers from the following article text:\n\n{article_text}',
    metadata: {
      version: '1.0.0',
      lastModified: Date.now(),
      templateType: 'content',
      language: 'en',
    },
    isBuiltin: true,
  },
};