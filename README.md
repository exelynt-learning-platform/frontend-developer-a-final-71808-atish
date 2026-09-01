# PeopleHub Employee Management

A responsive employee management application built with React and TypeScript. It demonstrates API integration, centralized state management, reusable component architecture, form validation, error handling, responsive design, and unit testing.

## Features

- View employees in a responsive table
- Mobile and tablet employee-card layout
- Search for an employee by ID
- Add new employees
- Edit employees with pre-populated form values
- Delete employees after confirmation
- Country selection using the provided country API
- Required-field, email, mobile, and length validation
- Loading, error, empty, and success states
- Responsive Material UI interface
- Route-level lazy loading
- Unit tests with mocked API calls

## Technology Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- Axios
- Material UI
- React Hook Form
- Zod
- Vitest
- React Testing Library

## API Endpoints

Base URL:

```text
https://669b3f09276e45187d34eb4e.mockapi.io/api/v1
```

### Employees

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/employee` | Get all employees |
| GET | `/employee/:id` | Get employee by ID |
| POST | `/employee` | Create employee |
| PUT | `/employee/:id` | Update employee |
| DELETE | `/employee/:id` | Delete employee |

### Countries

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/country` | Get all countries |

## Project Structure

```text
src/
├── app/
│   ├── hooks.ts
│   ├── store.ts
│   └── theme.ts
├── components/
│   ├── AppHeader.tsx
│   ├── DeleteConfirmDialog.tsx
│   ├── EmployeeCardList.tsx
│   ├── EmployeeForm.tsx
│   ├── EmployeeSearch.tsx
│   └── EmployeeTable.tsx
├── features/
│   ├── countries/
│   │   └── countrySlice.ts
│   └── employees/
│       ├── employeeSlice.ts
│       └── employeeValidation.ts
├── pages/
│   ├── EmployeeFormPage.tsx
│   └── EmployeeListPage.tsx
├── services/
│   ├── api.ts
│   ├── countryService.ts
│   └── employeeService.ts
├── test/
│   └── setup.ts
└── types/
    ├── country.ts
    └── employee.ts
```

## Component Architecture

The application follows smart and dumb component separation.

### Smart Components

Page components connect to Redux and manage business logic:

- `EmployeeListPage`
- `EmployeeFormPage`

### Dumb Components

Presentation components receive data and callbacks through props:

- `EmployeeTable`
- `EmployeeCardList`
- `EmployeeSearch`
- `EmployeeForm`
- `DeleteConfirmDialog`

## State Management

Redux Toolkit maintains:

- Employee collection
- Country collection
- Search result
- Employee selected for editing
- Loading states
- API error states
- Mutation states
- Success messages

Asynchronous thunks communicate with the API through dedicated service files.

```text
Component
   ↓ dispatch
Redux async thunk
   ↓
API service
   ↓
Mock API
   ↓
Redux state update
   ↓
Responsive UI
```

## Form Validation

The employee form validates:

| Field | Rules |
|---|---|
| Name | Required, 2–50 characters |
| Email | Required, valid email, maximum 100 characters |
| Mobile | Required, 10–15 digits |
| Country | Required |
| State | Required, 2–50 characters |
| District | Required, 2–50 characters |

Validation is implemented with React Hook Form and Zod.

## Responsive Design

- Desktop: employee table
- Mobile and tablet: employee cards
- Responsive search toolbar
- Responsive add/edit form
- Full-width mobile actions
- Long email addresses wrap safely

## Installation

Requirements:

- Node.js 20 or newer
- npm

Clone the repository and switch to the assignment branch:

```bash
git clone https://github.com/exelynt-learning-platform/frontend-developer-a-final-71808-atish.git
cd frontend-developer-a-final-71808-atish
git switch frontend-developer-assignment-deadline-30th-sep-2026-64052-2703
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Testing

Run all tests once:

```bash
npm run test:run
```

Run tests in watch mode:

```bash
npm test
```

Test coverage includes:

- Zod validation rules
- Employee API service methods
- Redux state transitions
- Add and edit form behavior
- Edit-form pre-population
- Delete confirmation interaction
- Loading and disabled states

All API calls are mocked during testing. Tests do not create, update, or delete real API records.

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run all tests once |
| `npm run preview` | Preview production build |

## Error Handling

The application handles:

- Employee-list API failures
- Country API failures
- Employee-not-found responses
- Create, update, and delete failures
- Invalid form submissions
- Empty employee results
- Loading and mutation states

## Performance

- Route-level lazy loading
- Separate list and form bundles
- Centralized API calls
- Efficient Redux state updates
- Responsive desktop and mobile rendering