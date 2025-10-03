import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = browser.new_page()

    try:
        page.goto("http://localhost:18181", timeout=90000)

        # A more robust selector for the template dropdown input
        # This looks for an input inside a div that is likely the dropdown component
        template_input_selector = "div.n-base-selection-input__wrapper > input"

        # Wait for the app to load and the input to be visible
        template_dropdown = page.locator(template_input_selector)
        expect(template_dropdown).to_be_visible(timeout=60000)

        # Give it a moment to render everything
        time.sleep(3)

        # Click the template dropdown to open it
        template_dropdown.click()

        # Wait for the dropdown options to appear and verify new groups/templates
        expect(page.get_by_text("内容创作")).to_be_visible()
        expect(page.get_by_text("SEO Outline Builder")).to_be_visible()

        expect(page.get_by_text("视频创作")).to_be_visible()
        expect(page.get_by_text("Video Hook Generator")).to_be_visible()

        expect(page.get_by_text("图像创作")).to_be_visible()
        expect(page.get_by_text("Image Prompt Builder")).to_be_visible()

        # Take a screenshot of the open dropdown with the new templates
        page.screenshot(path="jules-scratch/verification/template-verification.png")
        print("Screenshot 'template-verification.png' created successfully.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        # Save the HTML content for debugging
        with open("jules-scratch/verification/error.html", "w") as f:
            f.write(page.content())
        page.screenshot(path="jules-scratch/verification/error.png")
        print("Saved error.html and error.png for debugging.")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)