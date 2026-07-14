import React from 'react';
import { FoodProvider } from './src/context/FoodContext';
import FoodScreen from './src/screens/FoodScreen';

export default function App() {
  return (
    <FoodProvider>
      <FoodScreen />
    </FoodProvider>
  );
}
