import { Template } from '../types';

export const TITLE_HEADLINE_OPTIMIZER_O: Template = {
  id: 'title-headline-optimizer-o',
  name: 'Title + Headline Optimizer',
  isBuiltin: true,
  content: `
    You are an expert SEO copywriter.
    Optimize the raw title '{raw_title}' for the primary keyword '{primary_keyword}' and target audience '{audience}'.
    The maximum character length is {max_chars}.
    Generate 3 headline options as a list of JSON objects, each with 'title', 'length', and 'keyword_present'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Optimizes titles and headlines for SEO.',
    tags: ['seo', 'copywriting', 'marketing'],
    language: 'en',
    field: 'optimization',
  },
};

export const META_DESCRIPTION_GENERATOR_O: Template = {
  id: 'meta-description-generator-o',
  name: 'Meta Description Generator',
  isBuiltin: true,
  content: `
    You are an expert SEO copywriter.
    Generate 2 meta descriptions based on the following page content summary: '{page_content_summary}'.
    The primary keyword is '{primary_keyword}', the tone should be '{tone}', and the maximum length is {max_chars} characters.
    Each meta description should be a single line.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates meta descriptions for web pages.',
    tags: ['seo', 'copywriting', 'marketing'],
    language: 'en',
    field: 'optimization',
  },
};

export const KEYWORD_CLUSTER_BUILDER_O: Template = {
  id: 'keyword-cluster-builder-o',
  name: 'Keyword Cluster Builder',
  isBuiltin: true,
  content: `
    You are an SEO strategist.
    Build a keyword cluster for the seed keyword '{seed_keyword}' with the intent '{intent}'.
    The output should be a JSON object with keys 'primary', 'secondary', and 'longtail'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Builds a keyword cluster from a seed keyword.',
    tags: ['seo', 'keywords', 'strategy'],
    language: 'en',
    field: 'optimization',
  },
};

export const ENGAGEMENT_BOOSTER_O: Template = {
  id: 'engagement-booster-o',
  name: 'Engagement Booster (hashtags + tags)',
  isBuiltin: true,
  content: `
    You are a social media expert.
    Generate a list of 5-10 relevant tags/hashtags for the following content summary: '{content_summary}'.
    The target platform is {platform}.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates hashtags and tags to boost engagement.',
    tags: ['social-media', 'marketing', 'engagement'],
    language: 'en',
    field: 'optimization',
  },
};

export const OPTIMIZE_TEMPLATES = {
  [TITLE_HEADLINE_OPTIMIZER_O.id]: TITLE_HEADLINE_OPTIMIZER_O,
  [META_DESCRIPTION_GENERATOR_O.id]: META_DESCRIPTION_GENERATOR_O,
  [KEYWORD_CLUSTER_BUILDER_O.id]: KEYWORD_CLUSTER_BUILDER_O,
  [ENGAGEMENT_BOOSTER_O.id]: ENGAGEMENT_BOOSTER_O,
};