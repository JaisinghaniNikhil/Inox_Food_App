import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterChip = ({
  label,
  active,
  onPress,
  icon,
  iconColor = '#6D6D6D',
  iconBg = '#F3F3F3',
  showToggle = false,
  dotColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        showToggle ? styles.chipFoodType : styles.chipCategory,
        active && styles.chipActive,
      ]}
    >
      <View style={styles.chipLeft}>
        <View style={[styles.chipIconWrap, { backgroundColor: iconBg }]}>
          {icon ? <MaterialCommunityIcons name={icon} size={12} color={iconColor} /> : null}
        </View>
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      </View>

      {showToggle ? (
        <View
          style={[
            styles.chipToggle,
            { justifyContent: active ? 'flex-end' : 'flex-start' },
            active && { backgroundColor: iconBg, borderColor: dotColor || iconColor },
          ]}
        >
          <View style={[styles.chipToggleDot, { backgroundColor: active ? (dotColor || iconColor) : '#BDBDBD' }]} />
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default FilterChip;
