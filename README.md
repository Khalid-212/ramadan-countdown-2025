# Ramadan Countdown 2025 🌙

A modern web application built with React and Vite to countdown to Ramadan 2025. This project uses Supabase for backend services and features a beautiful UI built with Radix UI components and Tailwind CSS.

## 🚀 Features

- Real-time countdown to Ramadan 2025
- Modern, responsive UI using Radix UI components
- Dark/Light theme support
- TypeScript for type safety
- Supabase integration for backend services

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Backend:** Supabase
- **Language:** TypeScript
- **State Management:** React Query
- **Form Handling:** React Hook Form
- **Code Quality:** ESLint, Prettier

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- Supabase account and project

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/khalid-212/ramadan-countdown-2025.git
   cd ramadan-countdown-2025
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run supabase:generate-types` - Generate Supabase types

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## 📁 Project Structure

rmadan-countdown-2025/ <br/>
src/<br/>
│ ├── components/ # Reusable UI components<br/>
│ ├── integrations/ # External service integrations<br/>
│ ├── lib/ # Utility functions and helpers<br/>
│ ├── App.tsx # Main application component<br/>
│ └── main.tsx # Application entry point<br/>
├── public/ # Static assets<br/>
└── supabase/ # Supabase configuration<br/>

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for the accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for the backend services

##  Support

If you have any questions or need help, please:

1. Check the existing issues
2. Create a new issue
3. Join our community discussions

---

Made with ❤️ by Khalid for the Muslim community
