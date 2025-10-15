import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "@playwright/test";

test.describe.parallel("Landing Page Parallel Tests", () => {
  test("landing-page-1VerifyPageTitle", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const title = await page.title();

      expect(title).toBe("Resume - Bipi");

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-2VerifyHeaderSectionContent", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      // Verify the main heading (name)
      const nameHeader = await page.locator("header h1");
      await expect(nameHeader).toHaveText("Bipi");

      const contactInfo = await page.locator("header p");
      const contactText = await contactInfo.textContent();

      const expectedContact =
        "Email: bipi@example.com | Phone: +91 1234567890 | Location: Kerala, India";

      const normalizedText = contactText.replace(/\s+/g, " ").trim();
      expect(normalizedText).toBe(expectedContact);

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-3VerifyProfileSectionVisibilityAndContent", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const profileHeading = page.locator("section h2.collapsible", {
        hasText: "Profile",
      });
      await expect(profileHeading).toBeVisible();

      const profileContent = page.locator(
        "section:has(h2:has-text('Profile')) .collapsible-content"
      );

      const contentText = await profileContent.textContent();
      expect(contentText.replace(/\s+/g, " ").trim()).toContain(
        "A IBM Domino/Lotus Notes developer with ~20 years of experience in full stack development."
      );

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-4VerifySkillsSectionContainsListItems", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const skillsHeading = page.locator("section h2.collapsible", {
        hasText: "Skills",
      });
      await expect(skillsHeading).toBeVisible();

      const skillsList = page.locator(
        "section:has(h2:has-text('Skills')) ul li"
      );
      const skillsCount = await skillsList.count();
      expect(skillsCount).toBe(3);

      const expectedSkills = [
        "IBM Domino/Notes",
        "Lotus Formulae, Lotus Script, Xpages",
        "HTML, CSS, JavaScript",
      ];

      for (let i = 0; i < skillsCount; i++) {
        const skillText = (await skillsList.nth(i).textContent()).trim();
        expect(skillText).toBe(expectedSkills[i]);
      }

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-5VerifyHiddenSectionsExperienceAndEducation", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const experienceSection = page.locator(
        "section:has(h2:has-text('Experience'))"
      );
      await expect(experienceSection).toHaveCSS("display", "none");

      const educationSection = page.locator(
        "section:has(h2:has-text('Education'))"
      );
      await expect(educationSection).toHaveCSS("display", "none");

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-6VerifyProjectsSectionExists", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const projectsSection = page.locator(
        "section:has(h2:has-text('Projects'))"
      );
      await expect(projectsSection).toBeVisible();

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-7VerifyProjectListItems", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const projectItems = page.locator("#tasklist li");
      const count = await projectItems.count();
      expect(count).toBe(2);

      const expectedTexts = [
        "Domino App 1 – Business workflow app.",
        "Domino App 2 – Business workflow app.",
      ];

      for (let i = 0; i < count; i++) {
        const text = await projectItems.nth(i).innerText();
        expect(text).toContain(expectedTexts[i]);
      }

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-8VerifyExternalCSSLink", async ({ page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const cssLink = page.locator("link[rel='stylesheet']");
      const href = await cssLink.getAttribute("href");
      expect(href).toBe("styles.css");

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-9VerifyJavaScriptFileIncluded", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const scriptTag = page.locator("script[src='script.js']");
      await expect(scriptTag).toHaveCount(1);

      await expect(scriptTag).toHaveAttribute("src", "script.js");

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });

  test("landing-page-10ValidateBasicLayoutStructure", async ({
    page,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      await page.goto("http://localhost:3000/ProjectTSApp/index.html");
      await page.waitForLoadState("networkidle");

      const container = page.locator(".resume-container");
      await expect(container).toBeVisible();

      const sections = page.locator(".resume-container section");
      const sectionCount = await sections.count();
      expect(sectionCount).toBeGreaterThanOrEqual(4);

      await page.screenshot({
        path: `screenshots/TS1-${testInfo.title}-${timestamp}.png`,
        fullPage: true,
      }); //explicit screenshot
    } catch (err) {
      if (!page.isClosed()) {
        await testInfo.attach(`TS1-${testInfo.title}-${timestamp}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
      throw err; // rethrow so the test fails
    }
  });
});

/*




    
    await loginButton.click();

    const dropdown = page.locator("#tnb-login-dropdown-loginForm").first();
    await expect(dropdown).toBeVisible({ timeout: 500 });


    const email = process.env.W3S_LOGINEMAIL;
    const password = process.env.W3S_PASSWORD;
    await page.locator("input[type='email']").fill(email);
    await page.locator("input[type='password']").fill(password);
    await page.locator("button:has-text('Sign In')").click();

    await expect(page).toHaveURL("https://pathfinder.w3schools.com/", {
      timeout: 40000,
    });

    await page.waitForSelector(
      'section[role="dialog"] button[aria-label="Close"]'
    );

    const modalCloseBtn = page.locator(
      'section[role="dialog"] button[aria-label="Close"]'
    );

    if (await modalCloseBtn.isVisible({ timeout: 3000 })) {
      // wait max 3s
      await modalCloseBtn.click();
    }
    await page.screenshot({
      path: `screenshots/page-${timestamp}.png`,
      fullPage: true,
    }); //explicit screenshot
    //const userTxt = await page.locator("p", { hasText: "Bipi Moh" }); //only expect creates screenshots on failure
    const userTxt = await page.locator("p", { hasText: "Bipi Mo" }); //only expect creates screenshots on failure

    await expect(userTxt).toBeVisible({ timeout: 10000 });

*/
