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
