# TS1-Landing.spec.js

This test suite validates the **content, structure, and resource linkage** of the application’s **landing (index) page**.  
It ensures that all major sections, external files, and UI elements render as expected using **parallel Playwright tests** with screenshots and error attachments.

## Coverage

1. **Page Load & Title**: Confirms correct title (`Resume – Bipi`) after full page load.  
2. **Header Section**: Validates name and contact information formatting.  
3. **Profile Section**: Checks visibility and correct descriptive text.  
4. **Skills Section**: Verifies list items and expected skill values.  
5. **Hidden Sections**: Ensures *Experience* and *Education* sections are initially hidden.  
6. **Projects Section**: Confirms section visibility and correct list of project items.  
7. **External Links**: Checks inclusion of `styles.css` and `script.js`.  
8. **Layout Validation**: Confirms `.resume-container` exists with multiple structured `<section>` blocks.  

## Techniques Demonstrated

* Parallelized Playwright tests (`test.describe.parallel`)  
* DOM querying and text validation (`locator`, `toHaveText`, `toContain`)  
* CSS property validation (`toHaveCSS`)  
* List and count verification for dynamic elements  
* Resource link and script tag validation  
* Structured screenshot naming with timestamping  
* Exception handling with screenshot attachment on failure