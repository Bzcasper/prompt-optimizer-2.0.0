import json
import logging
import uuid
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class BMADAgentInterface:
    """
    BMADAgentInterface defines the standard methods for all BMAD agents.
    """
    def initialize(self, config: Dict[str, Any]) -> None:
        raise NotImplementedError

    def process(self, input_data: Dict[str, Any]) -> None:
        raise NotImplementedError

    def output(self) -> Dict[str, Any]:
        raise NotImplementedError

    def shutdown(self) -> None:
        raise NotImplementedError

class SEOBlogAgent(BMADAgentInterface):
    """
    An agent that generates SEO-optimized blog posts with enhanced features.
    """
    agent_name = "seo_blog_agent"

    metadata = {
        "description": "Generates complete SEO-optimized blog posts from a topic and keywords.",
        "input_schema": "input_schema.json",
        "output_schema": "output_schema.json",
        "dependencies": ["image_prompt_agent", "keyword_expander_agent"],
        "version": "1.1.0"
    }

    def __init__(self):
        self.config = None
        self.output_data = None
        self.context_store = {} # For multi-turn context memory

    def initialize(self, config: Dict[str, Any] = None) -> None:
        """
        Initializes the agent with a given configuration.
        """
        self.config = config if config else {}
        logger.info(f"SEO Blog Agent initialized with config: {self.config}")

    def process(self, input_data: Dict[str, Any]) -> None:
        """
        Processes the input data to generate or continue a blog post.
        This is a mock implementation with enhanced features.
        """
        logger.info(f"Processing input data: {input_data}")
        try:
            topic = input_data['topic']
            keywords = input_data.get('keywords', [])
            audience = input_data.get('audience', 'a general audience')
            tone = input_data.get('tone', 'informative')
            style = input_data.get('style', 'how-to-guide')
            use_keyword_expander = input_data.get('use_keyword_expander', False)
            context_id = input_data.get('context_id')

            # Mock interaction with KeywordExpanderAgent
            if use_keyword_expander and keywords:
                logger.info("Using Keyword Expander Agent.")
                # In a real scenario, this would involve calling another agent.
                # Here, we just mock the expansion.
                expanded_keywords = keywords + [f"{kw} for beginners" for kw in keywords]
                keywords = list(set(expanded_keywords)) # Remove duplicates

            # Multi-turn context handling
            if context_id and context_id in self.context_store:
                logger.info(f"Continuing blog post from context_id: {context_id}")
                # Retrieve previous state
                previous_output = self.context_store[context_id]
                title = previous_output['title']
                slug = previous_output['slug']
                content = previous_output['content']
                content += f"\n\n## Expanding on {topic}\n\nThis is a new section added in a follow-up request, focusing on {', '.join(keywords)}."
                tags = list(set(previous_output['tags'] + keywords))
                new_context_id = context_id # Keep the same context id for now, or generate a new one
            else:
                logger.info("Generating new blog post.")
                # Generate new content
                title = f"A {tone.title()} {style.replace('-', ' ').title()} for {audience.title()} on {topic.title()}"
                slug = topic.lower().replace(" ", "-")
                content = f"# {title}\n\nThis is a comprehensive guide on {topic}. In this post, we will explore the following keywords: {', '.join(keywords)}.\n\n"
                content += "## Section 1: Introduction\n\nThis is the first section of the blog post."
                new_context_id = str(uuid.uuid4())
                tags = keywords + [topic.lower().replace(" ", "-")]

            meta_description = f"Learn everything about {topic}. A {style} for {audience}, covering {', '.join(keywords)}."

            # Mock interaction with a dependency (Image Prompt Agent)
            image_prompts = [f"A {style} style image of '{topic}' with a focus on '{kw}'" for kw in keywords]

            self.output_data = {
                "title": title,
                "slug": slug,
                "meta_description": meta_description,
                "content": content,
                "tags": tags,
                "image_prompts": image_prompts,
                "context_id": new_context_id
            }

            # Store the current state for potential follow-up
            self.context_store[new_context_id] = self.output_data

            logger.info("Successfully generated blog post content.")
        except KeyError as e:
            logger.error(f"Missing required input key: {e}")
            raise ValueError(f"Missing required input key: {e}")
        except Exception as e:
            logger.error(f"An error occurred during processing: {e}")
            raise

    def output(self) -> Dict[str, Any]:
        """
        Returns the generated output data.
        """
        if self.output_data is None:
            logger.warning("Output called before processing.")
            return {}
        return self.output_data

    def shutdown(self) -> None:
        """
        Performs any cleanup necessary for the agent.
        """
        logger.info("SEO Blog Agent is shutting down.")
        self.output_data = None
        self.context_store = {}

# Example of how the BMAD orchestrator might use this agent
if __name__ == '__main__':
    seo_agent = SEOBlogAgent()
    seo_agent.initialize()

    # --- First Turn ---
    print("--- First Turn ---")
    initial_input = {
        "topic": "Container Gardening",
        "keywords": ["small space gardening", "urban farming"],
        "audience": "apartment dwellers",
        "tone": "casual",
        "style": "how-to-guide",
        "use_keyword_expander": True
    }

    try:
        seo_agent.process(initial_input)
        blog_post_part1 = seo_agent.output()
        print("Generated Blog Post (Part 1):")
        print(json.dumps(blog_post_part1, indent=2))

        # --- Second Turn (Multi-turn Context) ---
        print("\n--- Second Turn ---")
        context_id = blog_post_part1.get("context_id")
        follow_up_input = {
            "topic": "choosing the right containers",
            "keywords": ["pottery", "plastic pots", "drainage"],
            "context_id": context_id
        }

        seo_agent.process(follow_up_input)
        blog_post_part2 = seo_agent.output()
        print("Generated Blog Post (Part 2 - Expanded):")
        print(json.dumps(blog_post_part2, indent=2))

    except ValueError as e:
        print(f"Error processing input: {e}")
    finally:
        seo_agent.shutdown()