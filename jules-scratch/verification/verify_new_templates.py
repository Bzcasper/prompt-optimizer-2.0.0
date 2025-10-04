from playwright.sync_api import sync_playwright, Page, expect

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:18181")
            page.goto("http://localhost:18181", timeout=60000)
            page.wait_for_load_state('networkidle')
            print("Navigation successful and page is idle.")

            print("Clicking on 'Templates' button...")
            # Using the text from the i18n key 'nav.templates' which is just "Templates"
            page.get_by_role("button", name="Templates").click()
            print("Templates button clicked.")

            print("Looking for 'SEO Outline Builder' text in the template manager...")
            # The template manager is now open, so we can look for the template.
            expect(page.get_by_text("SEO Outline Builder")).to_be_visible()
            print("Template found!")

            screenshot_path = "jules-scratch/verification/new_template_verification.png"
            print(f"Taking screenshot at {screenshot_path}...")
            page.screenshot(path=screenshot_path)
            print("Screenshot taken.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run_test()