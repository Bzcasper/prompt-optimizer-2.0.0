# Video Script Agent

## Purpose
The Video Script Agent generates detailed video scripts, including scene breakdowns, narration, dialogue, shot types, and storyboard notes. It's designed to take a topic and produce a structured script ready for video production, with hooks for generating visual assets.

## Metadata
- **agent_name**: `video_script_agent`
- **version**: `1.1.0`
- **description**: Generates detailed video scripts, scene breakdowns, and storyboard notes.
- **dependencies**: `image_prompt_agent`

## Input Schema (`input_schema.json`)
The agent expects a JSON object with the following properties:
- `topic` (string, required): The main topic for the video.
- `video_length_minutes` (integer, optional): The desired length of the video in minutes. Defaults to 5.
- `style` (string, optional): The style of the video. Can be one of "documentary", "vlog", "tutorial", or "whiteboard". Defaults to "tutorial".
- `characters` (integer, optional): The number of characters for dialogue generation. Defaults to 1 (a single narrator).

### Example Input
```json
{
  "topic": "The Basics of Quantum Computing",
  "video_length_minutes": 2,
  "style": "whiteboard",
  "characters": 2
}
```

## Output Schema (`output_schema.json`)
The agent produces a JSON object with the following structure:
- `title` (string): The title of the video.
- `script` (array of objects): The video script, broken down into scenes. Each scene object contains:
    - `scene_number` (integer)
    - `shot_type` (string): Suggested camera shot type (e.g., 'wide shot').
    - `visuals` (string): Description of the visuals for the scene.
    - `dialogue` (array of objects): Dialogue for the scene, with each object containing `character` and `line`.
    - `duration_seconds` (integer): Estimated duration of the scene.
    - `image_reference` (string): A prompt for the `ImagePromptAgent` to generate a relevant image for the scene.
- `storyboard_notes` (array of strings): High-level notes for the storyboard artist.
- `total_estimated_duration_seconds` (integer): Total estimated duration of the video.

### Example Output
```json
{
  "title": "Whiteboard Video: The Basics Of Quantum Computing",
  "script": [
    {
      "scene_number": 1,
      "shot_type": "wide shot",
      "visuals": "A whiteboard style visualization for 'The Basics of Quantum Computing', scene 1.",
      "dialogue": [
        {
          "character": "Character 1",
          "line": "This is a line for Character 1 in scene 1."
        },
        {
          "character": "Character 2",
          "line": "This is a line for Character 2 in scene 1."
        }
      ],
      "duration_seconds": 30,
      "image_reference": "whiteboard illustration of 'The Basics of Quantum Computing', wide shot"
    }
  ],
  "storyboard_notes": [
    "Opening shot should be engaging and establish the theme.",
    "Use dynamic shots to maintain viewer interest.",
    "Ensure audio quality is high for all dialogue and narration."
  ],
  "total_estimated_duration_seconds": 120
}
```

## Usage
To use this agent, the BMAD orchestrator would:
1. Initialize the `VideoScriptAgent`.
2. Provide a valid JSON input object.
3. Call the `process()` method.
4. Call the `output()` method to retrieve the generated script.
5. The `image_reference` from each scene can be passed to the `image_prompt_agent` to generate visual assets.
```