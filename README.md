# Villantara Frontend

A modern React frontend application built with Vite, featuring fast development experience with Hot Module Replacement (HMR) and comprehensive ESLint configuration.

## 🚀 Tech Stack

- **React** - Frontend library for building user interfaces
- **Vite** - Next generation frontend build tool
- **TypeScript** - Type-safe JavaScript development
- **ESLint** - Code linting and formatting
- **Fast Refresh** - Instant feedback during development

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/masnurrm/villantara-fe.git
cd villantara-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## 🔧 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🏗️ Build

To build the project for production:

```bash
npm run build
# or
yarn build
```

The built files will be generated in the `dist` directory.

## 🧪 Preview

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 📝 Linting

To run ESLint and check for code issues:

```bash
npm run lint
# or
yarn lint
```

## 🔧 Vite Plugins

This project uses the official Vite React plugins:

- **@vitejs/plugin-react** - Uses Babel for Fast Refresh
- **@vitejs/plugin-react-swc** - Uses SWC for Fast Refresh (alternative)

## 📁 Project Structure

```
villantara-fe/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom hooks
│   ├── utils/       # Utility functions
│   ├── types/       # TypeScript type definitions
│   └── main.tsx     # Application entry point
├── dist/            # Production build output
├── node_modules/    # Dependencies
├── index.html       # HTML template
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── eslint.config.js # ESLint configuration
```

## ⚙️ Configuration

### ESLint Configuration

For production applications, it's recommended to enable type-aware lint rules. Update your `eslint.config.js`:

```javascript
export default tseslint.config([
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // For stricter rules:
      // ...tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### React-Specific Linting

For enhanced React linting, you can install additional plugins:

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

Then update your ESLint configuration:

```javascript
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])
```

## 📱 Features

- ⚡ Fast development with Vite and HMR
- 🔍 Type-safe development with TypeScript
- 📏 Code quality assurance with ESLint
- 🔄 Fast Refresh for instant feedback
- 📦 Optimized production builds
- 🎯 Modern React development practices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

**Melissa Lau** ([@melissalau17](https://github.com/melissalau17))
**Haidar Ihza** ([@](https://github.com/))

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing fast build tool
- All contributors and open source maintainers

---

For more information about React and Vite, check out their official documentation:
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
