import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test, expect } from "@playwright/test";

test.describe.parallel("AddToList Page Parallel Tests", () => {
  test("api-endpoint-1GETallUsers-VerifyCorrectJSONstructure", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const response = await request.get("http://localhost:3000/api/users");
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty("users");
      expect(Array.isArray(data.users)).toBe(true);

      for (const user of data.users) {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name");
        expect(typeof user.id).toBe("number");
        expect(typeof user.name).toBe("string");
      }

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-2GETuserByID-successScenario", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const userId = 1;
      const response = await request.get(
        `http://localhost:3000/api/users/${userId}`
      );
      expect(response.status()).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id", userId);
      expect(data).toHaveProperty("name");
      expect(typeof data.id).toBe("number");
      expect(typeof data.name).toBe("string");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-3GETuserByInvalidID-expect404", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const invalidUserId = 999; // ID that does not exist
      const response = await request.get(
        `http://localhost:3000/api/users/${invalidUserId}`
      );

      expect(response.status()).toBe(404);

      const data = await response.json();
      expect(data).toHaveProperty("error", "User not found");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-4POSTnewUser-successScenario", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const newUser = { name: "Test User" };
      const response = await request.post("http://localhost:3000/api/users", {
        data: newUser,
      });

      // Expect 201 Created
      expect(response.status()).toBe(201);

      const data = await response.json();
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name", newUser.name);
      expect(typeof data.id).toBe("number");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-5POSTwithoutName-expect404", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const response = await request.post("http://localhost:3000/api/users", {
        data: {},
      });

      expect(response.status()).toBe(400);

      const data = await response.json();
      expect(data).toHaveProperty("error", "Name is required");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-6PUTupdateExistingUser-verifyUpdatedData", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const userIdToUpdate = 1; // existing user
      const updatedData = { name: "Updated User 1" };

      const response = await request.put(
        `http://localhost:3000/api/users/${userIdToUpdate}`,
        {
          data: updatedData,
        }
      );

      expect(response.status()).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id", userIdToUpdate);
      expect(data).toHaveProperty("name", updatedData.name);

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-7PUTupdateNon-existingUser-expect404", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const nonExistentUserId = 999; // ID that does not exist
      const updatedData = { name: "Nonexistent User" };

      const response = await request.put(
        `http://localhost:3000/api/users/${nonExistentUserId}`,
        {
          data: updatedData,
        }
      );

      expect(response.status()).toBe(404);

      const data = await response.json();
      expect(data).toHaveProperty("error", "User not found");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-8DELETEuser-verifyDeletion", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const createResp = await request.post("http://localhost:3000/api/users", {
        data: { name: "Temp User" },
      });
      expect(createResp.status()).toBe(201);
      const user = await createResp.json();
      const userIdToDelete = user.id;

      // Now delete that user
      const response = await request.delete(
        `http://localhost:3000/api/users/${userIdToDelete}`
      );
      expect(response.status()).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("id", userIdToDelete);

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-9GETdelayedEndpoint-testNetworkLatency", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const startTime = Date.now();

      const response = await request.get("http://localhost:3000/api/delay");

      const endTime = Date.now();
      const duration = endTime - startTime; // in milliseconds

      // Expect 200 OK
      expect(response.status()).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty("status", "Delayed response");

      expect(duration).toBeGreaterThanOrEqual(1900); // tolerance
      expect(duration).toBeLessThanOrEqual(2500);

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
    }
  });

  test("api-endpoint-10GETerrorEndpoint-verify500responseHandling", async ({
    request,
  }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    try {
      const response = await request.get("http://localhost:3000/api/error");

      // Expect 500 Internal Server Error
      expect(response.status()).toBe(500);

      const data = await response.json();
      expect(data).toHaveProperty("error", "Internal server error");

      console.log(`TS1-${testInfo.title}-[${timestamp}] - success`);
    } catch (err) {
      console.error(
        `TS1-${testInfo.title}-[${timestamp}] - Error endpoint`,
        err
      );
      throw err; // fail the test
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
