import React, { createContext, useState } from 'react';

const rawData = require('../data/fnb.json');

export const FoodContext = createContext();

const initialItems = rawData.listOfFnbItems.map(item => ({
  ...item,
  quantity: 0,
}));

export const FoodProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [foodTypeFilter, setFoodTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = itemId => {
    setItems(prev =>
      prev.map(item =>
        item.itemId === itemId ? { ...item, quantity: 1 } : item,
      ),
    );
  };

  const increaseItem = itemId => {
    setItems(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseItem = itemId => {
    setItems(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item,
      ),
    );
  };

  // Resets every item's quantity to 0 — used after a successful payment
  const clearCart = () => {
    setItems(prev => prev.map(item => ({ ...item, quantity: 0 })));
  };

  const filteredItems = items.filter(item => {
    const itemType = String(item.foodType || '').trim().toLowerCase();
    const selectedType = String(foodTypeFilter || '').trim().toLowerCase();

    const matchesFoodType =
      foodTypeFilter === 'All' || itemType === selectedType;

    const matchesCategory =
      categoryFilter === 'All' || item.itemCategory === categoryFilter;

    return matchesFoodType && matchesCategory;
  });

  const repeatItems = items.filter(item => item.isRepeat === true);

  const cartItems = items.filter(item => item.quantity > 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = Number(item.itemOfferRate || item.itemRate || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <FoodContext.Provider
      value={{
        items,
        filteredItems,
        repeatItems,
        cartItems,
        cartCount,
        cartTotal,
        foodTypeFilter,
        setFoodTypeFilter,
        categoryFilter,
        setCategoryFilter,
        cartOpen,
        setCartOpen,
        addItem,
        increaseItem,
        decreaseItem,
        clearCart,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};