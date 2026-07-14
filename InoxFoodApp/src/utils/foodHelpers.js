export const formatMoney = (value, keepDecimals = false) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: keepDecimals ? 2 : 0,
    maximumFractionDigits: keepDecimals ? 2 : 2,
  }).format(amount);
};

export const imageSource = base64 => ({
  uri: `data:image/jpeg;base64,${base64}`,
});

export const isVeg = item =>
  String(item?.foodType || '').trim().toLowerCase() === 'veg';

export const getItemNote = item => {
  if (item?.isAddOnAvailable) {
    return 'Customizable';
  }

  return '';
};
