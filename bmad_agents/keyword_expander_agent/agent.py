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

class KeywordExpanderAgent(BMADAgentInterface):
    """
    A primitive agent that expands a list of seed keywords into a larger list of related keywords.
    """
    agent_name = "keyword_expander_agent"

    metadata = {
        "description": "Generate long-tail and semantically related keywords from a seed list.",
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
        logger.info(f"Keyword Expander Agent initialized with config: {self.config}")

    def process(self, input_data: Dict[str, Any]) -> None:
        """
        Processes the input data to expand keywords.
        This is a mock implementation.
        """
        logger.info(f"Processing input data: {input_data}")
        try:
            seed_keywords = input_data['seed_keywords']
            num_variations = input_data.get('num_variations', 10)

            expanded_keywords = []
            for seed in seed_keywords:
                for i in range(num_variations):
                    expanded_keywords.append(f"{seed} variation {i+1}")

            self.output_data = {
                "expanded_keywords": expanded_keywords
            }
            logger.info("Successfully expanded keywords.")

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
        logger.info("Keyword Expander Agent is shutting down.")
        self.output_data = None

# Example of how the BMAD orchestrator might use this agent
if __name__ == '__main__':
    keyword_agent = KeywordExpanderAgent()
    keyword_agent.initialize()

    example_input = {
        "seed_keywords": ["content marketing", "python programming"],
        "num_variations": 5
    }

    try:
        keyword_agent.process(example_input)
        keyword_output = keyword_agent.output()
        print("Expanded Keywords:")
        print(json.dumps(keyword_output, indent=2))
    except ValueError as e:
        print(f"Error processing input: {e}")
    finally:
        keyword_agent.shutdown()