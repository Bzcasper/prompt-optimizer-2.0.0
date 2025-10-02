import json
import logging
import random
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

class VideoScriptAgent(BMADAgentInterface):
    """
    An agent that generates video scripts with enhanced details.
    """
    agent_name = "video_script_agent"

    metadata = {
        "description": "Generates detailed video scripts, scene breakdowns, and storyboard notes.",
        "input_schema": "input_schema.json",
        "output_schema": "output_schema.json",
        "dependencies": ["image_prompt_agent"],
        "version": "1.1.0"
    }

    def __init__(self):
        self.config = None
        self.output_data = None
        self.shot_types = ["wide shot", "medium shot", "close-up", "panning shot", "dolly zoom"]

    def initialize(self, config: Dict[str, Any] = None) -> None:
        """
        Initializes the agent with a given configuration.
        """
        self.config = config if config else {}
        logger.info(f"Video Script Agent initialized with config: {self.config}")

    def process(self, input_data: Dict[str, Any]) -> None:
        """
        Processes the input data to generate a video script with enhanced details.
        This is a mock implementation.
        """
        logger.info(f"Processing input data: {input_data}")
        try:
            topic = input_data['topic']
            video_length_minutes = input_data.get('video_length_minutes', 5)
            style = input_data.get('style', 'tutorial')
            characters = input_data.get('characters', 1)

            title = f"{style.title()} Video: {topic.title()}"

            # Mock script generation
            scenes = []
            num_scenes = video_length_minutes * 2
            total_duration = 0

            for i in range(1, num_scenes + 1):
                scene_duration = 30
                total_duration += scene_duration

                dialogue = []
                if characters == 1:
                    dialogue.append({"character": "Narrator", "line": f"This is the narration for scene {i} about {topic}."})
                else:
                    for char_num in range(1, characters + 1):
                         dialogue.append({"character": f"Character {char_num}", "line": f"This is a line for Character {char_num} in scene {i}."})

                visuals_desc = f"A {style} style visualization for '{topic}', scene {i}."

                scene = {
                    "scene_number": i,
                    "shot_type": random.choice(self.shot_types),
                    "visuals": visuals_desc,
                    "dialogue": dialogue,
                    "duration_seconds": scene_duration,
                    "image_reference": f"{style} illustration of '{topic}', {random.choice(self.shot_types)}"
                }
                scenes.append(scene)

            storyboard_notes = [
                "Opening shot should be engaging and establish the theme.",
                "Use dynamic shots to maintain viewer interest.",
                "Ensure audio quality is high for all dialogue and narration."
            ]

            self.output_data = {
                "title": title,
                "script": scenes,
                "storyboard_notes": storyboard_notes,
                "total_estimated_duration_seconds": total_duration
            }
            logger.info("Successfully generated enhanced video script.")

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
        logger.info("Video Script Agent is shutting down.")
        self.output_data = None

# Example of how the BMAD orchestrator might use this agent
if __name__ == '__main__':
    video_agent = VideoScriptAgent()
    video_agent.initialize()

    example_input = {
        "topic": "The Basics of Quantum Computing",
        "video_length_minutes": 2,
        "style": "whiteboard",
        "characters": 2
    }

    try:
        video_agent.process(example_input)
        script_output = video_agent.output()
        print("Generated Video Script:")
        print(json.dumps(script_output, indent=2))
    except ValueError as e:
        print(f"Error processing input: {e}")
    finally:
        video_agent.shutdown()