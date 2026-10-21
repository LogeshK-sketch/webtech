import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginCrudTest {
    @Test
    public void testPostGetDelete() {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        String email = "selenium" + System.currentTimeMillis() + "@example.com";

        try {
            driver.get("http://localhost:3000");

            driver.findElement(By.id("email")).sendKeys(email);
            driver.findElement(By.id("password")).sendKeys("Test123");
            driver.findElement(By.id("addUser")).click();

            By userLocator = By.xpath("//li[contains(., '" + email + "')]");
            WebElement user = wait.until(
                ExpectedConditions.visibilityOfElementLocated(userLocator)
            );
            assertTrue(user.getText().contains(email));
            System.out.println("POST test passed");

            driver.findElement(By.id("getUsers")).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(userLocator));
            assertTrue(driver.findElement(userLocator).getText().contains(email));
            System.out.println("GET test passed");

            driver.findElement(By.cssSelector(
                "button[data-email='" + email + "']"
            )).click();

            wait.until(ExpectedConditions.invisibilityOfElementLocated(userLocator));
            System.out.println("DELETE test passed");
            System.out.println("All tests passed!");
        } finally {
            driver.quit();
        }
    }
}
