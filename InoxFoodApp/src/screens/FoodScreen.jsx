import React, { useContext } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { FoodContext } from '../context/FoodContext';
import CartSheet from '../components/CartSheet';
import FilterChip from '../components/FilterChip';
import FoodCard from '../components/FoodCard';
import { filterItems } from '../constants/filterItems';
import { formatMoney } from '../utils/foodHelpers';

const CART_ICON = require('../../assets/icons/cart.png');

const getFilterColors = filter => {
  if (filter.type !== 'foodType') {
    return {
      iconColor: '#6D6D6D',
      iconBg: '#F3F3F3',
      dotColor: undefined,
    };
  }

  const isVegFilter = filter.value === 'Veg';

  return {
    iconColor: isVegFilter ? '#1EAE57' : '#D84B43',
    iconBg: isVegFilter ? '#EDF8F0' : '#FDEEEE',
    dotColor: isVegFilter ? '#1EAE57' : '#D84B43',
  };
};

const FoodScreen = () => {
  const {
    repeatItems,
    filteredItems,
    foodTypeFilter,
    setFoodTypeFilter,
    categoryFilter,
    setCategoryFilter,
    addItem,
    increaseItem,
    decreaseItem,
    cartCount,
    cartTotal,
    setCartOpen,
  } = useContext(FoodContext);

  const cartLabel = `${cartCount} ${cartCount === 1 ? 'item' : 'items'} added`;
  const bottomPadding = cartCount > 0 ? 196 : 24;
  const isAllSelected = foodTypeFilter === 'All' && categoryFilter === 'All';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <Feather name="chevron-left" size={26} color="#111111" />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Order Snacks</Text>
          <Text style={styles.headerLocation}>PVR Plaza, New Delhi</Text>
        </View>

        <Pressable style={styles.iconButton}>
          <Feather name="search" size={24} color="#111111" />
        </Pressable>
      </View>

      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
      >
        <View style={styles.repeatSection}>
          <View style={styles.repeatTitleRow}>
            <View style={styles.repeatLine} />
            <Text style={styles.repeatTitle}>REPEAT AGAIN?</Text>
            <View style={styles.repeatLine} />
          </View>

          {repeatItems.length === 0 ? (
            <Text style={styles.emptyText}>No repeat items found.</Text>
          ) : (
            <FlatList
              data={repeatItems}
              horizontal
              nestedScrollEnabled
              keyExtractor={item => item.itemId}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.repeatList}
              renderItem={({ item }) => (
                <FoodCard
                  item={item}
                  compact
                  onAdd={() => addItem(item.itemId)}
                  onPlus={() => increaseItem(item.itemId)}
                  onMinus={() => decreaseItem(item.itemId)}
                />
              )}
            />
          )}
        </View>

        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filterItems.map(filter => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                icon={filter.icon}
                showToggle={filter.type === 'foodType'}
                {...getFilterColors(filter)}
                active={filter.type === 'foodType' ? foodTypeFilter === filter.value : categoryFilter === filter.value}
                onPress={() => {
                  if (filter.type === 'foodType') {
                    setFoodTypeFilter(foodTypeFilter === filter.value ? 'All' : filter.value);
                    return;
                  }

                  setCategoryFilter(categoryFilter === filter.value ? 'All' : filter.value);
                }}
              />
            ))}
            <FilterChip
              label="All"
              icon="blur"
              active={isAllSelected}
              onPress={() => {
                setFoodTypeFilter('All');
                setCategoryFilter('All');
              }}
            />
          </ScrollView>
        </View>

        <View style={styles.mainSection}>
          {filteredItems.length === 0 ? (
            <Text style={styles.emptyText}>No food items match this filter.</Text>
          ) : (
            filteredItems.map(item => (
              <FoodCard
                key={item.itemId}
                item={item}
                onAdd={() => addItem(item.itemId)}
                onPlus={() => increaseItem(item.itemId)}
                onMinus={() => decreaseItem(item.itemId)}
              />
            ))
          )}
        </View>
      </ScrollView>

      {cartCount > 0 ? (
        <View style={styles.bottomDock}>
          <Pressable style={styles.cartBar} onPress={() => setCartOpen(true)}>
            <View style={styles.cartBarLeft}>
              <Image source={CART_ICON} style={styles.cartBarIcon} />
              <Text style={styles.cartBarText}>{cartLabel}</Text>
              <Feather name="chevron-up" size={14} color="#111111" style={{ marginLeft: 6 }} />
            </View>

            <Text style={styles.cartBarTotal}>{formatMoney(cartTotal, true)}</Text>
          </Pressable>

          <Pressable
            style={styles.proceedButtonDock}
            onPress={() => {
              
            }}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </Pressable>
        </View>
      ) : null}

      <CartSheet />
    </SafeAreaView>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 62,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6D8',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    lineHeight: 22,
  },
  headerLocation: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#656565',
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  repeatSection: {
    backgroundColor: '#FDEEEA',
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2D6D0',
  },
  repeatTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  repeatLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0C46E',
  },
  repeatTitle: {
    marginHorizontal: 10,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    color: '#7A662B',
  },
  repeatList: {
    paddingHorizontal: 14,
    paddingRight: 16,
  },
  repeatCard: {
    width: 208,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8DAD2',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  repeatImageWrap: {
    width: 46,
    height: 46,
    position: 'relative',
    marginRight: 8,
  },
  repeatImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F3F3',
    borderRadius: 7,
  },
  repeatBadgeWrap: {
    position: 'absolute',
    top: -2,
    left: -2,
  },
  // Name / price / add button stacked as a column to the right of the image.
  repeatContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  repeatName: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  repeatMeta: {
    marginTop: 3,
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
    color: '#9E9E9E',
  },
  repeatActionArea: {
    marginTop: 6,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  mainSection: {
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  mainCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  mainImageWrap: {
    width: 60,
    height: 60,
    marginRight: 10,
    position: 'relative',
  },
  mainImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  mainBadgeWrap: {
    position: 'absolute',
    top: -3,
    left: -3,
  },
  mainContent: {
    flex: 1,
    paddingTop: 1,
    paddingRight: 8,
  },
  mainName: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  mainPrice: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '700',
    color: '#676767',
  },
  mainActionArea: {
    alignItems: 'flex-end',
    minWidth: 78,
    paddingTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6D5A22',
    marginLeft: 8,
  },
  filterSection: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFE6D8',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6D8',
  },
  filterIcon: {
    width: 16,
    height: 16,
    tintColor: '#9E7F1F',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  categoryRow: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 4,
  },
  chip: {
    minHeight: 32,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8D1C2',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chipFoodType: {
    paddingRight: 8,
  },
  chipCategory: {
    paddingRight: 10,
  },
  chipActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBB87B',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  chipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#373737',
  },
  chipTextActive: {
    color: '#111111',
  },
  // Clearer on/off switch look for Veg / Non Veg.
  chipToggle: {
    marginLeft: 8,
    width: 30,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  chipToggleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  // Standard FSSAI-style veg / non-veg badge: white square, colored
  // border, dot (veg) or triangle (non-veg) inside.
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
  addButton: {
    minWidth: 54,
    paddingHorizontal: 10,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D9B84D',
    backgroundColor: '#FFF4D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonFull: {
    width: '100%',
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D9B84D',
    backgroundColor: '#FFF4D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonRepeat: {
    minWidth: 88,
    paddingHorizontal: 10,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D9B84D',
    backgroundColor: '#FFF4D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111111',
  },
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
  noteText: {
    marginTop: 4,
    fontSize: 9,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  noteTextRight: {
    marginTop: 4,
    fontSize: 9,
    fontWeight: '500',
    color: '#8A8A8A',
    textAlign: 'right',
  },
  noteTextSpacer: {
    height: 13,
  },
  // Persistent dock: cart summary pill stacked above a full-width Proceed button.
  bottomDock: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
  },
  cartBar: {
    borderRadius: 10,
    backgroundColor: '#F8E39C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EBCB57',
  },
  cartBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartBarIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#111111',
  },
  cartBarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  cartBarTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  proceedButtonDock: {
    marginTop: 8,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: '86%',
  },
  handle: {
    width: 90,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D4D4D4',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
  },
  sheetList: {
    paddingBottom: 8,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cartImageWrap: {
    width: 64,
    height: 64,
    marginRight: 10,
    position: 'relative',
  },
  cartImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  cartBadgeWrap: {
    position: 'absolute',
    top: -2,
    left: -2,
  },
  cartInfo: {
    flex: 1,
    paddingRight: 10,
  },
  cartName: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 8,
  },
  cartTotalText: {
    minWidth: 76,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  proceedButton: {
    marginTop: 12,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  proceedText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111111',
  },
  emptyText: {
    fontSize: 13,
    color: '#7D7D7D',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 14,
  },
});
