// README.md
# Multi Calculator App

A comprehensive web application built with TypeScript that includes three calculators:
- Age Calculator
- Insurance Premium Calculator  
- BMI Calculator

## Features

### Age Calculator
- Calculate exact age in years, months, and days
- Show total time lived in various units (weeks, days, hours, minutes, seconds)
- Display next birthday countdown
- Responsive date selector interface

### Premium Calculator
- Calculate insurance premiums based on age, sum insured, and policy type
- Support for individual and family floater policies
- Optional covers (Hospital Cash, Critical Illness)
- Multi-year policy discounts
- GST calculation included

### BMI Calculator
- Calculate Body Mass Index using height (feet/inches) and weight (kg)
- Categorize BMI results with color-coded feedback
- Health recommendations based on BMI category
- Visual BMI scale reference

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Create project directory:**
```bash
mkdir calculator-app
cd calculator-app
```

2. **Initialize project:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
# TypeScript and development dependencies
npm install -D typescript @types/node ts-loader

# Webpack and build tools
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader
```

4. **Create project structure:**
```
calculator-app/
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── app.ts
│   ├── types/
│   │   └── index.ts
│   ├── calculators/
│   │   ├── ageCalculator.ts
│   │   ├── premiumCalculator.ts
│   │   └── bmiCalculator.ts
│   └── utils/
│       └── dateUtils.ts
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

5. **Copy the provided files** into their respective directories.

6. **Update package.json scripts:**
```json
{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "start": "webpack serve --mode development --open",
    "build-ts": "tsc",
    "watch": "tsc -w"
  }
}
```

### Development

1. **Start development server:**
```bash
npm run dev
```

2. **Open browser:** The app will automatically open at `http://localhost:8080`

3. **Build for production:**
```bash
npm run build
```

## Project Structure

- `src/app.ts` - Main application entry point
- `src/types/index.ts` - TypeScript type definitions
- `src/calculators/` - Calculator class implementations
- `src/utils/` - Utility functions
- `src/styles.css` - Application styles
- `src/index.html` - HTML template

## Technology Stack

- **TypeScript** - Type-safe JavaScript
- **Webpack** - Module bundler and dev server
- **CSS3** - Modern styling with animations and responsive design
- **HTML5** - Semantic markup

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License

## Deployment Website Link

https://multi-calculator-app.vercel.app
