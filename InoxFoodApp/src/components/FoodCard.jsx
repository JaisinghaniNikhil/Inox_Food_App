import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatMoney, getItemNote, imageSource, isVeg } from '../utils/foodHelpers';
import FoodBadge from './FoodBadge';
import QuantityControl from './QuantityControl';

const FoodCard = ({ item, compact = false, onAdd, onPlus, onMinus }) => {
  const veg = isVeg(item);
  const price = Number(item.itemOfferRate || item.itemRate || 0);
  const note = getItemNote(item);
  const hasQty = item.quantity > 0;

  if (compact) {
    return (
      <View style={styles.repeatCard}>
        <View style={styles.repeatImageWrap}>
          <Image
            source={imageSource(item.itemImageURL)}
            style={styles.repeatImage}
            resizeMode="cover"
          />
          <View style={styles.badgeWrap}>
            <FoodBadge veg={veg} />
          </View>
        </View>

        <View style={styles.repeatContent}>
          <Text style={styles.repeatName} numberOfLines={2}>
            {item.itemName}
          </Text>

          <Text style={styles.repeatPrice} numberOfLines={1}>
            {formatMoney(price)}
          </Text>

          {note ? <Text style={styles.repeatNote}>{note}</Text> : null}

          <View style={styles.repeatAction}>
            {hasQty ? (
              <QuantityControl
                quantity={item.quantity}
                onPlus={onPlus}
                onMinus={onMinus}
                compact
              />
            ) : (
              <Pressable style={styles.addButton} onPress={onAdd}>
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.itemCard}>
      <View style={styles.itemImageWrap}>
        <Image
          source={imageSource(item.itemImageURL)}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.badgeWrap}>
          <FoodBadge veg={veg} />
        </View>
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.itemName}
        </Text>

        <Text style={styles.itemPrice} numberOfLines={1}>
          {formatMoney(price)}
        </Text>

        <Text style={styles.noteSpace} />
      </View>

      <View style={styles.itemActions}>
        {hasQty ? (
          <>
            <QuantityControl quantity={item.quantity} onPlus={onPlus} onMinus={onMinus} />
            {note ? <Text style={styles.noteText}>{note}</Text> : <Text style={styles.noteSpace} />}
          </>
        ) : (
          <>
            <Pressable style={styles.addButton} onPress={onAdd}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
            {note ? <Text style={styles.noteText}>{note}</Text> : <Text style={styles.noteSpace} />}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  repeatCard: {
    width: 228,
    minHeight: 76,
    marginRight: 8,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8DAD2',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  repeatImageWrap: {
    width: 56,
    height: 66,
    marginRight: 8,
    position: 'relative',
  },
  repeatImage: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#F3F3F3',
  },
  badgeWrap: {
    position: 'absolute',
    top: -2,
    left: -2,
  },
  repeatContent: {
    flex: 1,
    minWidth: 0,
  },
  repeatName: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  repeatPrice: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    color: '#696969',
  },
  repeatNote: {
    marginTop: 1,
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  repeatAction: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  itemImageWrap: {
    width: 60,
    height: 60,
    marginRight: 10,
    position: 'relative',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  itemContent: {
    flex: 1,
    paddingTop: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  itemPrice: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '700',
    color: '#676767',
  },
  itemActions: {
    alignItems: 'flex-end',
    minWidth: 78,
    paddingTop: 1,
  },
  addButton: {
    minWidth: 54,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D9B84D',
    backgroundColor: '#FFF4D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#111111',
  },
  noteText: {
    marginTop: 4,
    fontSize: 9,
    fontWeight: '500',
    color: '#8A8A8A',
    textAlign: 'right',
  },
  noteSpace: {
    height: 13,
  },
});

export default FoodCard;
