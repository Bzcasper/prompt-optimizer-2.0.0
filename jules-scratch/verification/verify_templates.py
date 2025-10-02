import re
from playwright.sync_api import Page, expect, sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:18181/")

    # Wait for the main layout to be ready
    expect(page.locator(".nav-header-enhanced")).to_be_visible()

    # Click the button to open the template selection modal
    page.get_by_role("button", name="Templates").click()

    # Give the modal a moment to appear
    page.wait_for_timeout(2000)

    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)