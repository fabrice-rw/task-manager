


# Task Manager Application

A simple task manager application built with React, featuring dark/light mode toggle, multilingual support, and task management functionalities.

## Live Demo
You can view the live version of the application here: [Task Manager Application](https://task-manager-nu-five.vercel.app/)


## Table of Contents
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Languages Supported](#languages-supported)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fabrice-rw/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

3. **Toggle dark/light mode:**
   Click the sun/moon icon in the header to switch themes.

4. **Change language:**
   Use the language buttons in the header to switch between English and French.

## Running Tests

To run the tests for this application, you can use the following command:
```bash
npm test
```

Make sure your test suite is properly set up, and tests are defined in your components.

## Environment Variables

This application does not require specific environment variables, but make sure to have the following setup for optimal functionality:

- **API Endpoints:** The application currently fetches tasks from the [dummyjson API](https://dummyjson.com/todos). You can modify the API endpoint in the `Dashboard` component as needed.


## Acknowledgements

- [React](https://reactjs.org/)
- [Lucide Icons](https://lucide.dev/)
- [i18next](https://www.i18next.com/)

## Languages Supported

- English (EN)
- French (FR)