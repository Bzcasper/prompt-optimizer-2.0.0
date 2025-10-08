# Knowledge File: ToneOfVoiceAdapter

**Purpose:**
Adapt a given piece of text to a specified tone of voice, reading level, and persona.

---

## Template Definition
- **Name:** ToneOfVoiceAdapter
- **Inputs:**
  - `source_text` (string, required)
  - `target_tone` (string, required, e.g., "witty", "authoritative", "empathetic")
  - `target_persona` (string, optional, default: "a helpful expert")
  - `reading_level` (string, optional, enum: "8th Grade", "12th Grade", "University"; default: "12th Grade")
- **Output Schema:** schemas/adapted_text.schema.json

---

## Example Input
```json
{
  "source_text": "Our power bank utilizes a high-capacity lithium-ion battery to deliver power efficiently. It has two ports for charging multiple items.",
  "target_tone": "enthusiastic",
  "target_persona": "a friendly tech reviewer",
  "reading_level": "8th Grade"
}
```

## Example Output
```json
{
  "adapted_text": "Get ready to power up like never before! This amazing power bank is packed with a super-strong battery to charge your stuff incredibly fast. Plus, it has not one, but two ports so you can charge multiple gadgets at the same time. It's a total game-changer!",
  "analysis": {
    "original_reading_level": "University",
    "adapted_reading_level": "8th Grade",
    "tone_shift_notes": "Converted technical jargon ('high-capacity lithium-ion') into simple, energetic language ('super-strong battery'). Added enthusiastic phrases like 'amazing' and 'total game-changer' to match the target tone."
  }
}
```

## Notes
- This primitive is useful for ensuring brand consistency across different types of content.
- The `analysis` object in the output provides transparency on the changes made.
- Can be chained after a content generation step to tailor the output for a specific audience.