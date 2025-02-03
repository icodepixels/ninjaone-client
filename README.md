# NinjaOne Client - Device Management Application

A React-based web application for managing device inventory across Windows, Mac, and Linux systems. This project was completed as part of the NinjaOne developer assessment.

## Features

- **Device Management**: Full CRUD operations for devices (Windows, Mac, Linux)
- **Filtering**: Filter devices by system type with multi-select support (Windows, Mac, and Linux)
- **Sorting**: Sort devices by system name or HDD capacity
- **Responsive Design**: Follows provided Figma design specifications with focus on responsive design for mobile, tablet, and desktop devices

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Testing

The project uses Vitest and React Testing Library for comprehensive testing. Run the test suite:

```bash
npm test
```

## Project Structure

- `/src/components` - React components
- `/src/redux` - Redux state management
- `/src/services` - API services
- `/src/utils` - Helper functions
- `/src/*.test.jsx` - Test files

## Technologies Used

### Core Dependencies
- React 18.x - Frontend framework
- Redux Toolkit - State management
- Axios - HTTP client for API requests
- React Testing Library - Testing framework

### Development Tools
- Vite - Build tool and development server
- ESLint - Code linting
- Prettier - Code formatting
- Vitest - Testing framework

## System Requirements

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

## API Integration

This application connects to the NinjaOne backend server for device management operations. Ensure the backend server is running before starting the application.

## Additional Features

- Comprehensive test coverage
- Clean code architecture
- Responsive UI following Figma designs
- Error handling and loading states
- Input validation

## License

This project is private and was created as part of the NinjaOne developer assessment.