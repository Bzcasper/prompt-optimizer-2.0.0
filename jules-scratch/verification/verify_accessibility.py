from playwright.sync_api import sync_playwright, Page, expect

def verify_accessibility_fixes(page: Page):
    """
    This script verifies the accessibility fixes applied to the ModelManager component.
    It checks for aria-labels on buttons and label-input associations in forms.
    """
    # 1. Navigate to the application
    page.goto("http://localhost:18181")

    # Wait for the main application to be ready by checking for the title
    expect(page.get_by_text("Prompt Optimizer")).to_be_visible(timeout=15000)

    # 2. Open the Model Manager
    page.get_by_role("button", name="Model Manager").click()

    # Wait for the modal's heading to be visible and define a specific locator for the modal
    expect(page.get_by_role("heading", name="Model Manager", exact=True)).to_be_visible(timeout=10000)
    model_manager_modal = page.get_by_role("dialog").filter(has=page.get_by_role("heading", name="Model Manager", exact=True))

    # 3. Verify the button is accessible by its name
    expect(model_manager_modal.get_by_role("button", name="Test Connection").first).to_be_visible()

    # 4. Open the "Edit Model" dialog for the first model
    model_manager_modal.get_by_role("button", name="Edit").first.click()

    # Wait for the edit dialog's heading to be visible and define a specific locator for it
    expect(page.get_by_role("heading", name="Edit", exact=True)).to_be_visible(timeout=10000)
    edit_dialog = page.get_by_role("dialog").filter(has=page.get_by_role("heading", name="Edit", exact=True))

    # 5. Verify label-input association in Edit Modal
    display_name_label = edit_dialog.get_by_text("Display Name")
    display_name_input = edit_dialog.get_by_placeholder("Enter display name")

    label_for = display_name_label.get_attribute("for")
    input_id = display_name_input.get_attribute("id")
    assert label_for == input_id, f"Label 'for' ({label_for}) does not match input 'id' ({input_id}) in Edit Modal"

    # 6. Close the "Edit Model" dialog
    edit_dialog.get_by_role("button", name="Cancel").click()
    expect(edit_dialog).not_to_be_visible()

    # 7. Open the "Add Model" dialog
    model_manager_modal.get_by_role("button", name="Add").click()

    # Wait for the add dialog's heading to be visible and define a specific locator for it
    expect(page.get_by_role("heading", name="Add", exact=True)).to_be_visible(timeout=10000)
    add_dialog = page.get_by_role("dialog").filter(has=page.get_by_role("heading", name="Add", exact=True))

    # 8. Verify label-input association in Add Modal and take a screenshot
    model_key_label = add_dialog.get_by_text("Model Key", exact=True)
    model_key_input = add_dialog.get_by_placeholder("Enter model key")

    label_for_add = model_key_label.get_attribute("for")
    input_id_add = model_key_input.get_attribute("id")
    assert label_for_add == input_id_add, f"Label 'for' ({label_for_add}) does not match input 'id' ({input_id_add}) in Add Modal"

    # 9. Take a screenshot for visual confirmation
    page.screenshot(path="jules-scratch/verification/accessibility_verification.png")

    # 10. Close the add dialog and the main modal
    add_dialog.get_by_role("button", name="Cancel").click()
    model_manager_modal.get_by_role("button", name="Close").click()

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_accessibility_fixes(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            # Take a screenshot on error for debugging
            page.screenshot(path="jules-scratch/verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()