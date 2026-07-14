# INOX F&B Track Order App

React Native app for ordering food & beverages at INOX, with Razorpay payment integration.

## Features
- Sticky toolbar, sticky filters (Veg/Non-Veg + categories)
- Repeat Again horizontal list, synced with main list and cart
- Main food list with cart bottom sheet
- Razorpay payment integration (order creation → checkout → verification)

## Project Structure
```
InoxFoodApp/          # React Native app
inox-payment-server/  # Node/Express backend for Razorpay
```

---

## 1. React Native App (InoxFoodApp)

### Setup
```bash
npm install
cd ios && pod install && cd .. # iOS only
npx react-native run-android   # or run-ios
```

### Payments config
Set your backend URL and Razorpay Key ID in `src/utils/paymentService.js`:
```javascript
const BACKEND_URL = 'https://your-backend.vercel.app';
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXX';
```

Test payments: use **Netbanking** (any bank → Success). Cards may show an "international not supported" error on fresh test accounts — that's a Razorpay account setting, not an app bug.

### Data
Food items load from `src/data/fnb.json`.

### Build APK
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## 2. Backend (inox-payment-server)

Handles Razorpay order creation and payment verification — must run server-side since it uses the Razorpay Key Secret, which can never be placed in the mobile app.

### Endpoints
- `POST /api/create-order` — body `{ "amount": 250 }` → returns Razorpay order
- `POST /api/verify-payment` — body `{ order_id, payment_id, signature }` → returns `{ verified: true/false }`

### Setup
```bash
npm install
```
Create `.env`:
```
PORT=5050
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_key_secret
```
Run:
```bash
npm run dev
```

### Deploy (Vercel)
```bash
vercel
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
vercel --prod
```
Update `BACKEND_URL` in the RN app with the deployed URL.

### Note on keys
Key ID is safe in client code. Key Secret stays only in this backend's env vars — never in the app.
