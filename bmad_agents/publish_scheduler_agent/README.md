# Publish Scheduler Agent

## Purpose
The Publish Scheduler Agent is a utility primitive that schedules content for future release on a specified platform. It takes a content identifier and a desired publication time and returns a confirmation of the scheduled event.

## Metadata
- **agent_name**: `publish_scheduler_agent`
- **version**: `1.0.0`
- **description**: Schedule generated content for future release.
- **dependencies**: `[]`

## Input Schema (`input_schema.json`)
The agent expects a JSON object with the following properties:
- `content_id` (string, required): A unique identifier for the content to be published.
- `publish_datetime` (string, required): The ISO 8601 datetime for when the content should be published.
- `platform` (string, required): The platform where the content will be published (e.g., "blog", "youtube", "twitter").

### Example Input
```json
{
  "content_id": "blog-post-12345",
  "publish_datetime": "2025-12-01T14:00:00Z",
  "platform": "blog"
}
```

## Output Schema (`output_schema.json`)
The agent produces a JSON object with the following structure:
- `schedule_id` (string): A unique identifier for the scheduled publishing event.
- `content_id` (string): The ID of the content that was scheduled.
- `publish_datetime` (string): The ISO 8601 datetime when the content is scheduled to be published.
- `platform` (string): The platform where the content will be published.
- `status` (string): The status of the scheduling request ("scheduled" or "failed").

### Example Output
```json
{
  "schedule_id": "a7b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5",
  "content_id": "blog-post-12345",
  "publish_datetime": "2025-12-01T14:00:00Z",
  "platform": "blog",
  "status": "scheduled"
}
```

## Usage
To use this agent, the BMAD orchestrator would:
1. Initialize the `PublishSchedulerAgent`.
2. Provide a valid JSON input object with the content ID, desired publication time, and platform.
3. Call the `process()` method.
4. Call the `output()` method to retrieve a confirmation of the scheduled event.
```