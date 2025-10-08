import json
import logging
import uuid
from typing import Dict, Any
from datetime import datetime

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

class ImagePromptAgent(BMADAgentInterface):
    """
    An agent that generates detailed AI image prompts.
    """
    agent_name = "image_prompt_agent"

    metadata = {
        "description": "Generates AI image prompts for illustrations, thumbnails, or product photos.",
        "input_schema": "input_schema.json",
        "output_schema": "output_schema.json",
        "dependencies": [],
        "version": "1.1.0" # Updated version
    }

    def __init__(self):
        self.config = None
        self.output_data = None

    def initialize(self, config: Dict[str, Any] = None) -> None:
        """
        Initializes the agent with a given configuration.
        """
        self.config = config if config else {}
        logger.info(f"Image Prompt Agent initialized with config: {self.config}")

    def process(self, input_data: Dict[str, Any]) -> None:
        """
        Processes the input data to generate an image prompt.
        This is a mock implementation with enhanced features.
        """
        logger.info(f"Processing input data: {input_data}")
        try:
            base_subject = input_data['base_subject']
            style = input_data.get('style', 'photorealistic')
            aspect_ratio = input_data.get('aspect_ratio', '16:9')
            model = input_data.get('model', 'midjourney')
            lighting = input_data.get('lighting')
            perspective = input_data.get('perspective')
            composition = input_data.get('composition')
            modifiers = input_data.get('modifiers', [])

            # Construct the prompt
            prompt_parts = [f"{style} image of {base_subject}"]
            if composition:
                prompt_parts.append(composition)
            if perspective:
                prompt_parts.append(perspective)
            if lighting:
                prompt_parts.append(lighting)
            if modifiers:
                prompt_parts.append(", ".join(modifiers))

            # Model-specific adjustments
            if model == 'midjourney':
                prompt_parts.append(f"--ar {aspect_ratio}")
            elif model == 'stable-diffusion':
                # Stable Diffusion often uses weighted prompts, but we'll keep it simple for this mock
                prompt_parts.append(f"aspect ratio {aspect_ratio}")
            else: # DALL-E
                prompt_parts.append(f"in a {aspect_ratio} aspect ratio")

            prompt = ", ".join(prompt_parts)

            # Construct a generic negative prompt
            negative_prompt = "low quality, blurry, watermark, text, signature, ugly, deformed, extra limbs"

            # Suggest models based on style
            model_suggestions = []
            if style in ["photorealistic", "cinematic"]:
                model_suggestions.extend(["Midjourney v6", "DALL-E 3"])
            elif style == "illustration":
                model_suggestions.append("Midjourney Niji")
            else:
                model_suggestions.extend(["Stable Diffusion XL", "DALL-E 3"])

            # Generate a filename
            slug = base_subject.lower().replace(" ", "-")[:30]
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"{slug}-{timestamp}.png"

            self.output_data = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "filename": filename,
                "parameters": {
                    "style": style,
                    "aspect_ratio": aspect_ratio,
                    "model": model,
                    "lighting": lighting,
                    "perspective": perspective,
                    "composition": composition,
                    "modifiers": modifiers
                },
                "model_suggestions": model_suggestions
            }
            logger.info("Successfully generated enhanced image prompt.")

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
        logger.info("Image Prompt Agent is shutting down.")
        self.output_data = None

# Example of how the BMAD orchestrator might use this agent
if __name__ == '__main__':
    image_agent = ImagePromptAgent()
    image_agent.initialize()

    example_input = {
        "base_subject": "a futuristic city skyline at dusk",
        "style": "cinematic",
        "aspect_ratio": "16:9",
        "model": "midjourney",
        "lighting": "neon and volumetric lighting",
        "perspective": "low-angle shot",
        "composition": "leading lines",
        "modifiers": ["hyperrealistic", "8k", "vibrant colors"]
    }

    try:
        image_agent.process(example_input)
        prompt_output = image_agent.output()
        print("Generated Image Prompt:")
        print(json.dumps(prompt_output, indent=2))
    except ValueError as e:
        print(f"Error processing input: {e}")
    finally:
        image_agent.shutdown()