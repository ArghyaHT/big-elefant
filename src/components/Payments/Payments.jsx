const UPI_IDS = {
  paytm: "merchantpaytm@upi",
  gpay: "merchantgpay@upi",
  phonepe: "merchantphonepe@upi",

//   paytm: "paytmqr5flasf@ptys",
};
const PAYEE_NAME = "Your Business Name";
const TRANSACTION_NOTE = "Order Payment";

function generateUpiUrl(app, total) {
  const pa = UPI_IDS[app];
  if (!pa) return null;

  return `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(
    PAYEE_NAME
  )}&am=${total.toFixed(2)}&cu=INR&tn=${encodeURIComponent(TRANSACTION_NOTE)}`;
}

// paymentUtils.js
export function handleUpiPay(selectedApp, total) {
  console.log("Amount to pay:", total);
  console.log("Selected App:", selectedApp);

  const upiUrl = generateUpiUrl(selectedApp, total);
  if (upiUrl) {
    window.location.href = upiUrl;
  } else {
    alert("UPI ID not found for selected app");
  }
}
