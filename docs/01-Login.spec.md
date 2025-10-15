# TS1-Login.spec.js

This test suite verifies the **login page functionality and validation logic**.  
It demonstrates **form interaction**, **environment variable usage**, **UI assertions**, **screenshot capture**, and **error handling with attachments**.

## Coverage

1. **Page Load & Title Check**: Confirms that the login page loads correctly.  
2. **Element Visibility Tests**: Verifies that username, password, and login button are visible and enabled.  
3. **Validation Handling**: Tests messages for missing credentials (none, username only, password only).  
4. **Authentication Logic**: Checks incorrect credentials, correct credentials, and username case sensitivity.  
5. **Redirect Behavior**: Confirms successful login redirects to `index.html` and displays user details.  

## Techniques Demonstrated

* Parallel test execution (`test.describe.parallel`)  
* Page navigation and wait states (`page.goto`, `waitForLoadState`)  
* DOM element assertions (`toBeVisible`, `toHaveText`)  
* Use of `.env` variables for credentials  
* Automatic and explicit screenshots with error attachment  
* Navigation verification after form submission
