import React from 'react';
import { StyleSheet, View } from 'react-native';

const FoodBadge = ({ veg }) => {
  return (
    <View style={[styles.foodBadge, veg ? styles.foodBadgeVeg : styles.foodBadgeNonVeg]}>
      {veg ? <View style={styles.foodBadgeDotVeg} /> : <View style={styles.foodBadgeTriangleNonVeg} />}
    </View>
  );
};

const styles = StyleSheet.create({
  foodBadge: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodBadgeVeg: {
    borderColor: '#1EAE57',
  },
  foodBadgeNonVeg: {
    borderColor: '#B0413E',
  },
  foodBadgeDotVeg: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1EAE57',
  },
  foodBadgeTriangleNonVeg: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#B0413E',
  },
});

export default FoodBadge;
