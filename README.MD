# Portfolio Manager

This project is a portfolio management application for developers, built using **React**, **TypeScript**, and **Vite**. It includes features such as user authentication, profile settings, and password validation. The application is styled using **SCSS** and follows modern React practices.

---

## Features

### 1. **Authentication Forms**
- **Login Form**: Allows users to log in with their credentials or via GitHub.
- **Forgot Password Form**: Enables users to reset their password by entering their email.
- **Create Account Form**: Provides password validation with real-time feedback for:
  - Lowercase letters
  - Uppercase letters
  - Numbers
  - Special characters
  - Minimum length of 8 characters

### 2. **Profile Settings**
- Users can upload a profile image via drag-and-drop or file upload.
- Real-time preview of the uploaded image.
- Form fields for updating user details such as:
  - Email
  - Job Title
  - Name
  - Bio
- Option to remove the uploaded profile image.

### 3. **Password Validation**
- Password validation logic ensures strong passwords with the following criteria:
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one number
  - At least one special character
  - Minimum of 8 characters

### 4. **Responsive Design**
- The application is styled using **SCSS** with reusable mixins and variables for consistent design.
- Fully responsive layout for different screen sizes.

---

## Project Structure

### **Frontend**
The frontend is built with **React** and **TypeScript** using **Vite** as the build tool.

#### Key Files:
- **`src/components`**: Contains reusable components such as forms for login, account creation, and password reset.
- **`src/pages`**: Includes pages like `Home` and `ProfileSettings`.
- **`src/style`**: SCSS files for global styles, variables, and resets.

#### SCSS Structure:
- **`variables.scss`**: Contains reusable color variables and mixins.
- **`reset.scss`**: Resets default browser styles.
- **`normalize.scss`**: Normalizes styles and includes font imports.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd porfolio-manager/front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## Backend API Endpoints

### **Ping**
- **GET** `/ping`
  - Returns `pong` to verify the server is running.

### **Projects**
- **GET** `/api/projects`
  - Fetch all projects.

- **GET** `/api/projects/all/:id`
  - Fetch all projects for a specific user by their ID.

- **POST** `/api/projects/createProject`
  - Create a new project.
  - **Request Body**:
    ```json
    {
      "userId": "number",
      "image": "string",
      "projectName": "string",
      "demoUrl": "string",
      "repositoryUrl": "string",
      "description": "string"
    }
    ```

- **PUT** `/api/projects/updateProject/:id`
  - Update a project by its ID.
  - **Request Body**:
    ```json
    {
      "image": "string",
      "projectName": "string",
      "demoUrl": "string",
      "repositoryUrl": "string",
      "description": "string"
    }
    ```

- **DELETE** `/api/projects/deleteProject/:id`
  - Delete a project by its ID.

---