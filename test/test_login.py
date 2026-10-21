
import time
import unittest
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC


class StudentAppTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 15)
        self.driver.get("http://localhost:5210")

    def test_student_crud(self):
        driver = self.driver

        # Generate a unique email for each test run
        email = (
            "selenium"
            + datetime.now().strftime("%Y%m%d%H%M%S%f")
            + "@example.com"
        )

        # Register a student
        driver.find_element(By.ID, "name").send_keys("Test Student")
        driver.find_element(By.ID, "email").send_keys(email)

        Select(
            driver.find_element(By.ID, "department")
        ).select_by_value("IT")

        driver.find_element(By.ID, "registerBtn").click()

        self.wait.until(
            EC.text_to_be_present_in_element(
                (By.ID, "message"),
                "Student registered successfully"
            )
        )

        # Confirm that the student appears in the list
        self.wait.until(
            EC.text_to_be_present_in_element(
                (By.TAG_NAME, "body"),
                email
            )
        )

        print("PASS: Student registered and displayed")

        # Delete the registered student
        student_item = self.wait.until(
            EC.presence_of_element_located((
                By.XPATH,
                f"//li[contains(., '{email}')]"
            ))
        )

        student_item.find_element(
            By.CSS_SELECTOR, "button.delete"
        ).click()

        self.wait.until(
            EC.text_to_be_present_in_element(
                (By.ID, "message"),
                "Student deleted successfully"
            )
        )

        self.wait.until(
            EC.invisibility_of_element_located((
                By.XPATH,
                f"//li[contains(., '{email}')]"
            ))
        )

        print("PASS: Student deleted")

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main(verbosity=2)
