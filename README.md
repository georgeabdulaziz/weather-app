# Weather App

A modern weather application built with Next.js that shows current weather conditions based on user location.

## Features

- Automatic location detection
- Real-time weather data from OpenWeatherMap API
- Responsive design
- Display of key weather metrics:
  - Current temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Atmospheric pressure
  - Weather description

## Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- CSS
- OpenWeatherMap API

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The following environment variables are required:

- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

## API Rate Limiting and Error Handling

The application includes error handling for:
- Geolocation permission denials
- API failures
- Network issues
- Browser compatibility issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
