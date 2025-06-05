# Weather App - TVO Technical Challenge

## Project Overview
A modern weather application built with Next.js 13+, demonstrating best practices in React development, API integration, and automated deployment.

## 🎯 Requirements Met

### Core Requirements

1. **React/Next.js Implementation**
   - Built with Next.js 13+ (App Router)
   - Uses modern React patterns and hooks
   - Implements both client and server components effectively

2. **OpenWeather API Integration**
   - Secure API key handling through environment variables
   - Weather data fetching through server-side API routes
   - Support for both city search and geolocation

3. **Temperature Display**
   - Shows temperatures in Celsius
   - Includes additional weather metrics (humidity, wind speed, etc.)
   - Clean and responsive UI design

### Technical Excellence

1. **Code Quality and Organization**
   - TypeScript for type safety
   - Clean component architecture
   - Proper separation of concerns (services, components, types)
   - Comprehensive error handling

2. **React Best Practices**
   - Client/Server component separation
   - Custom hooks and services
   - Proper state management
   - Efficient data fetching

3. **Git Practices**
   - Clear, atomic commits
   - Feature-based branching
   - Detailed commit messages
   - Clean git history

4. **Documentation**
   - Comprehensive JSDoc documentation
   - Clear code comments
   - Type definitions
   - API documentation

### Stretch Goals Achieved

1. **API Rate Limiting & Error Handling**
   - Implemented rate limiting protection
   - Comprehensive error handling
   - User-friendly error messages
   - Connection issue management

2. **Backend Implementation**
   - Next.js API routes for secure API key handling
   - Server-side data fetching
   - Protected endpoints

3. **Automated Deployment**
   - GitHub Actions workflow for CI/CD
   - Automated deployment to Vercel
   - Environment variable management
   - Preview deployments for pull requests

## 🚀 Live Demo
[Live Demo Link](https://weather-app-iota-ten-49.vercel.app/)

## 🛠 Tech Stack
- Next.js 13+ (App Router)
- TypeScript
- CSS Modules
- OpenWeather API
- Vercel (Hosting)
- GitHub Actions (CI/CD)

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/georgeabdulaziz/weather-app.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file:
```
OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated deployment to Vercel:
1. Automatic deployments on push to main
2. Preview deployments for pull requests
3. Environment variable synchronization
4. Build and test verification

## �� Project Structure
```
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── services/      # API services
│   └── styles/        # CSS styles
├── public/           # Static assets
└── types/           # TypeScript definitions
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License
MIT

---

This project was completed as part of the TVO Software Developer 2 Technical Challenge, demonstrating proficiency in modern web development practices, React/Next.js expertise, and automated deployment workflows.
