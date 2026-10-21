const { Builder, By, until } =
    require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

async function testLogin() {
    let driver;

    try {
        // Chrome options
        let options = new chrome.Options();
        options.addArguments("--disable-notifications");
        options.addArguments("--log-level=3");

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        await driver.manage().window().maximize();

        // Open website
        await driver.get("http://127.0.0.1:3000");

        // Enter username
        await driver.findElement(By.id("username"))
            .sendKeys("admin");

        // Enter password
        await driver.findElement(By.id("password"))
            .sendKeys("1234");

        // Click login
        await driver.findElement(By.id("loginBtn"))
            .click();

        // Verify result
        await driver.wait(
            until.elementTextIs(
                await driver.findElement(By.id("result")),
                "Login Successful"
            ),
            10000
        );

        console.log("TEST PASSED: Login Successful");

        await driver.sleep(5000);

    } catch (error) {
        console.log("TEST FAILED:", error.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

testLogin();

