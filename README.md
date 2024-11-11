# Setting Up the .env File

To set up the `.env` file for your project, follow these steps:

1. **Create the .env file**:
  In the root directory of your project, create a file named `.env`.

2. **Add environment variables**:
  Open the `.env` file and add your environment-specific variables in the format `KEY=VALUE`. For example:
  ```plaintext
  VITE_THINGSPEAK_API=your-thingspeak-api
  VITE_SERVER_URL=http://localhost:3000
  ```

3. **Create a .env file inside the `be` folder**:
  Navigate to the `be` folder inside your project and create another `.env` file.

4. **Add backend-specific environment variables**:
  Open the `.env` file inside the `be` folder and add your backend-specific variables in the format `KEY=VALUE`. For example:
  ```plaintext
  PORT = 3000
  MONGO_URI = "your-mongodb-uri"

  ```

  # Running the Project

  To run the frontend and backend of your project, follow these steps:

  1. **Run the frontend**:
    In the root directory of your project, run the following command:
    ```sh
    npm run dev
    ```

  2. **Run the backend**:
    Navigate to the `be` folder inside your project and run the following command:
    ```sh
    nodemon --env-file=.env index.js
    ```
