require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("assert");

jest.setTimeout(120000); // Increased global timeout to 120 seconds

describe("UI Tests for Workout Tracker", function () {
  let driver;
  const uniqueUsername = `user${Date.now()}`; // Generate a unique username for each test run
  const password = "1234";

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new (require("selenium-webdriver/chrome").Options)).build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit(); // Ensure driver quits after all tests
    }
  });

  it("Test User Signup", async function () {
    await driver.get("http://localhost:3000/signup");
    await driver.findElement(By.name("username")).sendKeys(uniqueUsername);
    await driver.findElement(By.name("email")).sendKeys(`${uniqueUsername}@example.com`);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);
    await driver.wait(until.titleIs("Login"), 5000); // Increased timeout to 5 seconds
    const pageTitle = await driver.getTitle();
    assert.strictEqual(pageTitle, "Login");
  });

  it("Test User Login", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("username")).sendKeys(uniqueUsername);
    await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);
    await driver.wait(until.titleIs("Workout Tracker"), 5000); // Increased timeout to 5 seconds
    const pageTitle = await driver.getTitle();
    assert.strictEqual(pageTitle, "Workout Tracker");
  });

  it("Test Add Goal", async function () {
    await driver.get("http://localhost:3000/add-task");
    await driver.wait(until.elementLocated(By.name("name")), 5000); // Wait for the name input field
    await driver.findElement(By.name("name")).sendKeys("Test Goal");
    await driver.findElement(By.name("goal")).sendKeys("Run 5km");
    await driver.findElement(By.name("date")).sendKeys("2025-6-23");
    await driver.findElement(By.name("notes")).sendKeys("Prepare for marathon");
    await driver.findElement(By.css("button[type='submit']")).click(); // Click the Add Goal button
    await driver.wait(until.urlContains("/list"), 10000); // Increased timeout to 10 seconds
  });

  it("Test View Profile", async function () {
    for (let attempt = 1; attempt <= 3; attempt++) { // Increased retries to 3
      try {
        await driver.get("http://localhost:3000/profile");
        await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(), 'Profile')]")), 5000); // Increased timeout to 5 seconds
        const profileExists = await driver.findElement(By.xpath("//h1[contains(text(), 'Profile')]")).isDisplayed();
        assert.strictEqual(profileExists, true);
        break; // Exit loop if successful
      } catch (error) {
        if (attempt === 3) {
          console.error(`Error on attempt ${attempt}: ${error.message}`);
          throw error; // Rethrow error after 3 attempts
        }
        console.warn(`Retrying Test View Profile (Attempt ${attempt}/3)...`);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      }
    }
  });

  it("Test Edit Profile", async function () {
    await driver.get("http://localhost:3000/profile");

    await driver.findElement(By.id("editprofilebtn")).click();

    await driver.wait(until.elementLocated(By.name("phone")), 5000); // Wait for the username input field

    // Interact with the phone input directly
    const phoneInput = await driver.findElement(By.name("phone"));

    await phoneInput.sendKeys("1234567890");

    const birthdayInput = await driver.findElement(By.name("birthday"));
    await birthdayInput.sendKeys("1990-01-01");

    const genderInput = await driver.findElement(By.name("gender"));
    await genderInput.sendKeys("Other");

    const submitBtn = await driver.findElement(By.css("button[type='submit']"), 5000); // Wait for the submit button

    await submitBtn.click(); // Attempt to click the button

    //reload the page to check if the phone number is saved
    await new Promise(resolve => setTimeout(resolve, 1000));

    const editBtn = await driver.findElement(By.id("editprofilebtn"), 5000); // Wait for the edit button
    await editBtn.click(); // Click the edit button again

    const phoneValue = await driver.findElement(By.name("phone")).getAttribute("value");

    assert.strictEqual(phoneValue, "1234567890");
  });
});
