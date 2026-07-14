import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FoodContext } from '../context/FoodContext';
import { formatMoney } from '../utils/foodHelpers';
import { payWithRazorpay } from '../utils/paymentService';
import CartRow from './CartRow';

const CartSheet = () => {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    increaseItem,
    decreaseItem,
    clearCart,
  } = useContext(FoodContext);
  const cartLabel = `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`;
  const [paying, setPaying] = useState(false);

  const handlePayment = async () => {
    if (cartTotal <= 0 || paying) return;

    setPaying(true);
    try {
      const result = await payWithRazorpay({ cartTotal });
      setPaying(false);
      Alert.alert('Payment successful', `Payment ID: ${result.paymentId}`);
      clearCart?.();
      setCartOpen(false);
    } catch (err) {
      setPaying(false);
     
      Alert.alert('Payment failed', err.message || err.description || 'Please try again');
    }
  };

  return (
    <Modal transparent visible={cartOpen} animationType="slide" onRequestClose={() => setCartOpen(false)}>
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setCartOpen(false)} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Your Cart</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetList}>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
              cartItems.map(item => (
                <CartRow
                  key={item.itemId}
                  item={item}
                  onPlus={() => increaseItem(item.itemId)}
                  onMinus={() => decreaseItem(item.itemId)}
                />
              ))
            )}
          </ScrollView>

          <View style={styles.summaryBar}>
            <View style={styles.summaryLeft}>
              <Feather name="shopping-cart" size={15} color="#111111" />
              <Text style={styles.summaryText}>{cartLabel} added</Text>
              <Feather name="chevron-down" size={14} color="#111111" />
            </View>
            <Text style={styles.summaryTotal}>{formatMoney(cartTotal, true)}</Text>
          </View>

          <Pressable
            style={[styles.proceedButton, paying && styles.proceedButtonDisabled]}
            onPress={handlePayment}
            disabled={paying || cartItems.length === 0}
          >
            {paying ? (
              <ActivityIndicator color="#111111" />
            ) : (
              <Text style={styles.proceedText}>Proceed to Pay</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
    maxHeight: '88%',
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 99,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 10,
  },
  sheetList: {
    paddingBottom: 10,
  },
  emptyText: {
    fontSize: 13,
    color: '#666666',
    paddingVertical: 18,
  },
  summaryBar: {
    marginTop: 4,
    minHeight: 38,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#F6E4B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111111',
    marginHorizontal: 6,
  },
  summaryTotal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111111',
  },
  proceedButton: {
    marginTop: 8,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#FFCC00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonDisabled: {
    opacity: 0.7,
  },
  proceedText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
});

export default CartSheet;
