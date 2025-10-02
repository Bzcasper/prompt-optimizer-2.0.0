import json
import logging
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

class ContentFormatterAgent(BMADAgentInterface):
    """
    A primitive agent that formats content into different output formats like Markdown or HTML.
    """
    agent_name = "content_formatter_agent"

    metadata = {
        "description": "Convert outputs into Markdown, HTML, or other formats.",
        "input_schema": "input_schema.json",
        "output_schema": "output_schema.json",
        "dependencies": [],
        "version": "1.0.0"
    }

    def __init__(self):
        self.config = None
        self.output_data = None

    def initialize(self, config: Dict[str, Any] = None) -> None:
        """
        Initializes the agent with a given configuration.
        """
        self.config = config if config else {}
        logger.info(f"Content Formatter Agent initialized with config: {self.config}")

    def process(self, input_data: Dict[str, Any]) -> None:
        """
        Processes the input data to format the content.
        This is a mock implementation.
        """
        logger.info(f"Processing input data: {input_data}")
        try:
            content = input_data['content']
            target_format = input_data.get('format', 'markdown')

            formatted_content = ""
            if target_format == "html":
                # Simple mock conversion to HTML
                formatted_content = f"<h1>Content</h1><p>{content}</p>"
            elif target_format == "markdown":
                # Assume raw content is already close to markdown
                formatted_content = f"# Content\n\n{content}"
            else:
                formatted_content = content

            self.output_data = {
                "formatted_content": formatted_content
            }
            logger.info(f"Successfully formatted content to {target_format}.")

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
        logger.info("Content Formatter Agent is shutting down.")
        self.output_data = None

# Example of how the BMAD orchestrator might use this agent
if __name__ == '__main__':
    formatter_agent = ContentFormatterAgent()
    formatter_agent.initialize()

    example_input = {
        "content": "This is the raw text that needs to be formatted.",
        "format": "html"
    }

    try:
        formatter_agent.process(example_input)
        formatted_output = formatter_agent.output()
        print("Formatted Content:")
        print(json.dumps(formatted_output, indent=2))
    except ValueError as e:
        print(f"Error processing input: {e}")
    finally:
        formatter_agent.shutdown()