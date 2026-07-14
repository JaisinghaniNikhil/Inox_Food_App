import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatMoney, imageSource, isVeg } from '../utils/foodHelpers';
import FoodBadge from './FoodBadge';
import QuantityControl from './QuantityControl';

const CartRow = ({ item, onPlus, onMinus }) => {
  const veg = isVeg(item);
  const unitPrice = Number(item.itemOfferRate || item.itemRate || 0);

  return (
    <View style={styles.cartRow}>
      <View style={styles.cartImageWrap}>
        <Image source={imageSource(item.itemImageURL)} style={styles.cartImage} resizeMode="cover" />
        <View style={styles.cartBadgeWrap}>
          <FoodBadge veg={veg} />
        </View>
      </View>

      <View style={styles.cartInfo}>
        <Text style={styles.cartName} numberOfLines={2}>
          {item.itemName}
        </Text>

        <View style={styles.qtyRow}>
          <QuantityControl quantity={item.quantity} onPlus={onPlus} onMinus={onMinus} cartStyle />
        </View>
      </View>

      <Text style={styles.cartTotalText}>{formatMoney(unitPrice * item.quantity, true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  cartImageWrap: {
    width: 50,
    height: 50,
    marginRight: 10,
    position: 'relative',
  },
  cartImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#F3F3F3',
  },
  cartBadgeWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cartInfo: {
    flex: 1,
    paddingRight: 10,
  },
  cartName: {
    fontSize: 12.5,
    lineHeight: 15,
    fontWeight: '800',
    color: '#1B1B1B',
    paddingRight: 6,
    marginBottom: 6,
  },
  qtyRow: {
    marginTop: 0,
    alignItems: 'flex-start',
  },
  cartTotalText: {
    minWidth: 72,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '800',
    color: '#1B1B1B',
  },
});

export default CartRow;
