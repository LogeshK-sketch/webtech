# Java Selenium CRUD Test

## Requirements
- JDK 17 or later
- Maven
- Google Chrome
- A running web application at http://localhost:3000

## Run
Open a terminal in this project folder:

```powershell
java --version
mvn --version
mvn test
```

Selenium 4.29 uses Selenium Manager to manage the browser driver in typical setups.

## Required application elements
The application under test must expose:
- `id="email"`
- `id="password"`
- `id="addUser"`
- `id="getUsers"`

Each user should appear inside an `<li>` containing their email, and the corresponding delete button must have an attribute like:

```html
<button data-email="user@example.com">DELETE</button>
```

## Important
This test expects the login/CRUD application at port 3000. It does not automatically start your Node.js application. Start the app in another terminal before running `mvn test`.

If your AngularJS student app uses port 5210 and different input/button IDs, update the URL and selectors in `LoginCrudTest.java` to match that app.
