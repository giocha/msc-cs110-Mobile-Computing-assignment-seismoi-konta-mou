# Σεισμοί κοντά μου

A React Native (Expo) app asks for your
location, pulls nearby earthquakes from the USGS Earthquake Catalog, and
shows a live accelerometer panel while you use it.

## What it does

- Asks for foreground location permission and shows your coordinates plus
  the GPS accuracy right on screen.
- Fetches earthquakes within 300km of you from the
  [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/) and
  lists them (magnitude, place, time, depth) in a `FlatList` you can
  pull to refresh.
- Handles every failure with a message you can actually act on and a way to
  retry - location denied once, location denied permanently (with a direct
  link into Settings), a failed fetch, or just no earthquakes found nearby.
- A Sensor Panel that reads the accelerometer live: the x/y/z numbers, a
  plain-language state (Face up/down, Tilted left/right, Level), and a
  flow-line drawing that bends around a dot as you tilt the phone.

## Running it

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS (macOS only), or `w` for web, or
just scan the QR code with Expo Go on your phone.

## Scripts

| Command              | Description                                    |
| --------------------- | ----------------------------------------------- |
| `npm start`           | Start the Expo dev server                        |
| `npm run android`     | Start and open on Android                        |
| `npm run ios`         | Start and open on iOS                            |
| `npm run web`         | Start and open in a browser                      |
| `npm run lint`        | Run ESLint                                       |
| `npm run typecheck`   | Run the TypeScript compiler in check-only mode   |

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branching, commit, and PR conventions.

## Libraries used

- [Expo](https://docs.expo.dev/) (managed workflow, SDK 57)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) - foreground location + accuracy
- [expo-sensors](https://docs.expo.dev/versions/latest/sdk/sensors/) - `Accelerometer`
- [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg) - draws the Sensor Panel's flow lines
- [NativeWind](https://www.nativewind.dev/) + [Tailwind CSS](https://tailwindcss.com/) - styling
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) / `react-native-worklets` - required peer dependency of NativeWind's styling engine, not used directly in app code
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)
- TypeScript, ESLint (`eslint-config-expo`), Prettier

## Project structure

```
.
├── App.tsx                        # App entry component
├── index.ts                       # Registers the app root
├── src/
│   ├── components/
│   │   ├── EarthquakeListItem.tsx # Single row in the earthquake list
│   │   └── SensorPanel.tsx        # Live accelerometer readout + visualization
│   ├── hooks/
│   │   ├── useLocation.ts         # Foreground location permission + fetch
│   │   ├── useEarthquakes.ts      # USGS API fetch
│   │   └── useAccelerometer.ts    # Live accelerometer subscription
│   └── theme/
│       └── colors.ts              # Shared color tokens
├── assets/                        # Screenshot + device photos for the report
├── tailwind.config.js
├── babel.config.js
└── metro.config.js
```

## More details

`TECHNICAL_REPORT.md` has the full write-up: how data flows from location to
the screen, why each permission is needed, what we saw on a real device,
what went wrong while building it, and the three proposed extensions asked
for in Part B of the assignment.

## Related project

This app was later forked and extended into
**[Aftershock](https://github.com/giocha/msc-cs110-arduino-IoT-assignment-Aftershock)**,
an IoT assignment for the Arduino/IoT part of the same course. Aftershock
keeps this app's location + USGS + accelerometer foundation and adds
impact (fall/crash) detection, a Node-RED layer that correlates reported
incidents against live USGS data to judge severity, and an Arduino UNO base
station that raises a physical alarm. It's a concrete example of one of
this project's Part B extension directions (a sensor/hardware feature)
taken all the way to real hardware.
