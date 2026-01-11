# Monolite HR Native

React Native mobile application for Monolite HR, built for iOS and Android.

## Overview

This is the React Native version of the Monolite HR web application. It provides the same functionality as the web version, optimized for mobile devices.

## Features

- Authentication (Email/Password, Apple Sign In)
- Hour logging and tracking
- Material requests
- Leave requests
- Activity tracking
- Communications
- Profile management
- Multi-language support (English, Italian)

## Tech Stack

- **React Native** 0.74.0
- **TypeScript**
- **React Navigation** - Navigation
- **Supabase** - Backend and authentication
- **React Query** - Data fetching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **i18next** - Internationalization
- **React Native Reanimated** - Animations

## Design System

The app uses a custom theme system with:
- **Dark theme** with gold accents (#FFD700)
- **Poppins** font family
- **Gold glow effects** on interactive elements
- **Smooth animations** and transitions

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and Android SDK

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install CocoaPods:
```bash
cd ios
pod install
cd ..
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Development

Start the Metro bundler:
```bash
npm start
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # Base UI components (Button, Input, Card, etc.)
├── pages/           # Screen components
├── navigation/      # Navigation configuration
├── hooks/           # Custom React hooks
├── theme/           # Design system (colors, typography, effects)
├── integrations/    # Third-party integrations
│   └── supabase/    # Supabase client and types
├── i18n/            # Internationalization
│   └── locales/    # Translation files
└── lib/             # Utility functions
```

## Environment Variables

The Supabase configuration is currently hardcoded in `src/integrations/supabase/client.ts`. For production, consider using environment variables.

## Building for Production

### iOS
```bash
cd ios
xcodebuild -workspace MonoliteHRNative.xcworkspace -scheme MonoliteHRNative -configuration Release
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## Contributing

This project is part of the Monolite HR ecosystem. Please refer to the main project documentation for contribution guidelines.

## License

See the main Monolite HR repository for license information.
