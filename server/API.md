**Sign Up**
----

* **URL**

  /user/signup

* **Method:**

  `POST`

* **URL Params**

  `None`

* **Data Params**

```json
{
    "firstName": "[user first name]",
    "lastName": "[user last name]",
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ message: "You signed up successfully. Welcome!" }`

* **Error Response:**

  * **Code:** 409 CONFLICT <br />
    **Content:** `{ message: "Mail exists" }`
    
  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```json
    { 
      "errors": 
        {
          "[field_name]": "This field is required | Email is invalid"
        }
    }
    ```

**Sign In**
----

* **URL**

  /user/signin

* **Method:**

  `POST`
  
* **URL Params**

  `None`

* **Data Params**

```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```
* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    { 
       "message": "Auth successfull",
       "token": "[user token]" 
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```json
    { 
      "errors": 
        {
          "form": "Invalid password or email address. Please try again."
        }
    }
    ```

**Get Contacts**
----

* **URL**

  /contacts

* **Method:**

  `GET`

* **URL Params**

  **Optional:** `search=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[contacts_array]`

**Get Contact by id**
----

* **URL**

  /contacts/:contactId

* **Method:**

  `GET`

* **URL Params**

  **Required:** `contactId=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{contact}`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    { 
      "message": "No valid entry for provovided ID"
    }
    ```

**Create Contact**
----

* **URL**

  /contacts

* **Method:**

  `POST`

* **URL Params**

  `None`

* **Data Params**

```json
{
    "name": "[string]",
    "phone": "[string]",
    "company": "[string]",
    "email": "[string]"
}
```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "message": "contact added successfully",
      "createdContact": {"created_contact"}
    }
    ```
    
**Update Contact**
----

* **URL**

  /contacts/:contactId

* **Method:**

  `PATCH`

* **URL Params**

  **Required:** `contactId=[string]`

* **Data Params**

```json
{
    "name": "[string]",
    "phone": "[string]",
    "company": "[string]",
    "email": "[string]"
}
```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "n": 1,
      "nModified": 1,
      "ok": 1
    }
    ```
**Delete Contact**
----

* **URL**

  /contacts/:contactId

* **Method:**

  `DELETE`

* **URL Params**

  **Required:** `contactId=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
    {
      "n": 1,
      "ok": 1,
      "deletedCount": 1
    }
    ```
