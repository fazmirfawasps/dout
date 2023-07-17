import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import api from '../axios/axios';

// const stripePromise = loadStripe('pk_test_51NHbVVSFTJEFvJs0k2t1FYlSAvP28nhiNlU3wP8HR6EyGr1FXNJvjPjWSHaHP77fMR2U7c7AuDoK7H04TD6nqaQo00DJK3p8gX');

const StripeCheckout = () => {
  // const [sessionId, setSessionId] = useState('');

  const handleCheckout = async () => {
    try {
     //  const stripe = await stripePromise;

      api('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineItems: [
            {
              price_data: {
                currency: 'INR',
                product_data: {
                  name: 'Product Name',
                  description: 'Product Description',
                },
                unit_amount: 2500,
              },
              quantity: 1,
            },
          ],
        }),
      }).then((response)=>{

          window.location.href = response.data.url

      })

       
      
     

      
    } catch (error) {
      console.error(error);
    }
  };

//   useEffect(() => {
//     if (sessionId) {
//       stripePromise.then((stripe) => {
//         stripe.redirectToCheckout({ sessionId });
//       });
//     }
//   }, [sessionId]);

  return (
    <div>
      <button onClick={handleCheckout} style={{marginTop:'300px'}}>Checkout</button>
    </div>
  );
};

export default StripeCheckout;
