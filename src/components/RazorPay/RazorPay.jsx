// components/RazorpayPayment.jsx
import React, { forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const RazorpayPayment = forwardRef(
  ({ amount, currency = 'INR', onSuccess, onFailure, customerData }, ref) => {
    const initiatePayment = async () => {
      try {
        const { data } = await axios.post(
          'https://big-elefant-payment.onrender.com/create-order',
          { amount, currency }
        );

        console.log("customerData",customerData)

        const { id: order_id, amount: razorAmount } = data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: razorAmount.toString(),
          currency: 'INR',
          name: 'Big Elefant',
          description: 'Order Payment',
          order_id,
          handler: async function (response) {
            const verifyRes = await axios.post(
              'https://big-elefant-payment.onrender.com/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.status === 'success') {
              const paymentInfo = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };

              // Combine payment info and customer data
              const fullData = {
                ...customerData,
                payment: paymentInfo,
                orderId: order_id,
              };

              onSuccess?.(fullData); // pass full data to parent
            } else {
              onFailure?.('Invalid signature');
            }
          },
          prefill: {
            name: `${customerData.firstName} ${customerData.lastName}`,
            email: customerData.email,
            contact: customerData?.contact,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Payment initiation failed:', err);
        onFailure?.('Something went wrong');
      }
    };

    useImperativeHandle(ref, () => ({
      initiatePayment,
    }));

    return null;
  }
);


export default RazorpayPayment;
