import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const QuantityControl = ({
  quantity,
  onPlus,
  onMinus,
  compact = false,
  fullWidth = false,
  cartStyle = false,
}) => {
  if (quantity <= 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.qtyBox,
        compact && styles.qtyBoxCompact,
        fullWidth && styles.qtyBoxFull,
        cartStyle && styles.qtyBoxCart,
      ]}
    >
      <Pressable
        onPress={onMinus}
        style={[styles.qtyBtn, compact && styles.qtyBtnCompact, cartStyle && styles.qtyBtnCart]}
      >
        <Text style={[styles.qtyBtnText, compact && styles.qtyBtnTextCompact, cartStyle && styles.qtyBtnTextCart]}>-</Text>
      </Pressable>

      <Text style={[styles.qtyValue, compact && styles.qtyValueCompact, cartStyle && styles.qtyValueCart]}>{quantity}</Text>

      <Pressable
        onPress={onPlus}
        style={[styles.qtyBtn, compact && styles.qtyBtnCompact, cartStyle && styles.qtyBtnCart]}
      >
        <Text style={[styles.qtyBtnText, compact && styles.qtyBtnTextCompact, cartStyle && styles.qtyBtnTextCart]}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0CC82',
    borderRadius: 6,
    backgroundColor: '#FFCC00',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  qtyBoxCompact: {
    height: 22,
  },
  qtyBoxCart: {
    height: 26,
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 6,
  },
  qtyBoxFull: {
    width: '100%',
    alignSelf: 'stretch',
  },
  qtyBtn: {
    width: 25,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnCompact: {
    width: 20,
    height: 22,
  },
  qtyBtnCart: {
    width: 26,
    height: 24,
  },
  qtyBtnText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '900',
    color: '#111111',
  },
  qtyBtnTextCompact: {
    fontSize: 12,
    lineHeight: 12,
  },
  qtyBtnTextCart: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '800',
  },
  qtyValue: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    color: '#111111',
  },
  qtyValueCompact: {
    minWidth: 16,
    fontSize: 11,
  },
  qtyValueCart: {
    minWidth: 22,
    fontSize: 13,
    fontWeight: '700',
  },
});

export default QuantityControl;
