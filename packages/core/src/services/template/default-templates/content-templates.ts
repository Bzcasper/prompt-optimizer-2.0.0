export const TOPIC_IDEA_GENERATOR: Template = {
  id: 'topic-idea-generator',
  name: 'Topic Idea Generator',
  isBuiltin: true,
  content: `
    You are an expert content strategist.
    Generate a list of {num_ideas} idea objects for the niche '{niche}', targeting a '{audience}' with intent '{intent}'.
    Each object should have the following format: {title, angle, short_hook}.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Generates a list of topic ideas with hooks based on a niche, audience, and intent.',
    tags: ['content', 'ideas', 'blogging'],
    language: 'en',
    field: 'content-creation',
  },
};

export const SEO_OUTLINE_BUILDER: Template = {
  id: 'seo-outline-builder',
  name: 'SEO Outline Builder',
  isBuiltin: true,
  content: `
    You are an expert SEO strategist.
    Create an SEO outline for the topic '{topic}' with the primary keyword '{primary_keyword}'.
    The search intent is '{search_intent}' and the target word count is {target_wordcount}.
    Your output should be a JSON object with 'title_suggestions', 'h1', 'h2s' (an array of objects with 'h2' and 'bullets'), and 'target_keywords_per_section'.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Builds an SEO outline for a blog post.',
    tags: ['content', 'seo', 'outline'],
    language: 'en',
    field: 'content-creation',
  },
};

export const LEAD_PARAGRAPH_WRITER: Template = {
  id: 'lead-paragraph-writer',
  name: 'Lead Paragraph Writer',
  isBuiltin: true,
  content: `
    You are an expert copywriter.
    Write a lead paragraph (35-60 words) for an article titled '{article_title}'.
    The target audience is '{audience}', the tone should be '{tone}', and the reading level should be grade {reading_level}.
    Also provide 2 alternate hooks.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Writes a lead paragraph for an article.',
    tags: ['content', 'copywriting', 'blogging'],
    language: 'en',
    field: 'content-creation',
  },
};

export const SECTION_PARAGRAPH_EXPANDER: Template = {
  id: 'section-paragraph-expander',
  name: 'Section Paragraph Expander',
  isBuiltin: true,
  content: `
    You are an expert copywriter.
    Expand the H2 title '{h2_title}' with the following bullets into a paragraph of about {word_goal} words.
    The tone should be '{tone}'.
    Bullets:
    ---
    {bullets}
    ---
    Your output should be the paragraph, 3 supporting bullets, and recommended internal links.
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Expands a section title and bullets into a full paragraph.',
    tags: ['content', 'copywriting', 'blogging'],
    language: 'en',
    field: 'content-creation',
  },
};

export const FAQ_EXTRACTOR: Template = {
  id: 'faq-extractor',
  name: 'FAQ Extractor',
  isBuiltin: true,
  content: `
    You are an expert at identifying key questions from a text.
    Read the following article text and extract {num_questions} frequently asked questions and their answers.
    Article text:
    ---
    {article_text}
    ---
  `,
  metadata: {
    version: '1.0.0',
    templateType: 'optimize',
    author: 'Jules',
    description: 'Extracts Q&A pairs from an article.',
    tags: ['content', 'faq', 'analysis'],
    language: 'en',
    field: 'content-creation',
  },
};


export const CONTENT_TEMPLATES = {
  [TOPIC_IDEA_GENERATOR.id]: TOPIC_IDEA_GENERATOR,
  [SEO_OUTLINE_BUILDER.id]: SEO_OUTLINE_BUILDER,
  [LEAD_PARAGRAPH_WRITER.id]: LEAD_PARAGRAPH_WRITER,
  [SECTION_PARAGRAPH_EXPANDER.id]: SECTION_PARAGRAPH_EXPANDER,
  [FAQ_EXTRACTOR.id]: FAQ_EXTRACTOR,
};