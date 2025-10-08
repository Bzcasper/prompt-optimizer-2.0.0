import re
from playwright.sync_api import Page, expect

def test_prompt_character_counter(page: Page):
    # 1. Navigate to the app
    page.goto("http://localhost:8000/")

    # 2. Find the main prompt input textarea
    prompt_input = page.get_by_placeholder(re.compile("Enter your original prompt to optimize...", re.IGNORECASE))
    expect(prompt_input).to_be_visible()

    # 3. Enter some text
    test_text = "This is a test prompt to check the character counter."
    prompt_input.fill(test_text)

    # 4. Find the character counter
    # The counter is part of the NInput component, but we added a custom one.
    # Let's look for the format "xx / xx"
    # Since we couldn't set maxTokens, we'll check for the input's own counter first.
    # The default NInput counter has a format like "49 / 0" if no maxlength is set.
    # Our custom counter will have a different format.

    # For now, let's just take a screenshot to see the result of our changes.
    # We can refine the test after seeing the initial output.

    # 5. Add a console log to inspect the component's state
    # This is a debugging step to see what's happening in the browser
    page.evaluate("() => { console.log('Verifying token counter...'); }")

    # 6. Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")