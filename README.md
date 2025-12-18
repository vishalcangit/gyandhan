# GyanDhan - Education Loan Finder

## How to Run

### Prerequisites
Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).

### Installation
```sh
npm install
```

### iOS
```sh
cd ios && pod install && cd ..
npm run ios
```

### Android
```sh
npm run android
```

## Trade-offs and Assumptions

1. **Mock API**: Used simulated API with hardcoded data instead of a real backend. Includes 1.5s delay to demonstrate loading states.

2. **Background**: Used solid background with border styling.

3. **Modal for Details**: Used a modal instead of React Navigation to keep the app simple.

4. **Local State Only**: Used `useState` and `useEffect` hooks without external state management.

5. **Indian Rupees (₹)**: Assumed INR as currency based on GyanDhan's India focus.
