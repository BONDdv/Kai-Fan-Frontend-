import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useFoodStore from "../../store/food-store";
import CheckoutForm from "../../components/checkoutForm";

const stripePromise = loadStripe("pk_test_51QD97YE1n0ipSxselHRjF42oIEvQQ1pch0g69okDBA75lmBHzLrw5JqyUnvM7QZ4iIjUSID6AmgZUUTFOlukif4I00ZIMTMfhp");

const Payment = () => {
    const token = useFoodStore((s)=> s.token)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=> {
        payment(token)
        .then((res)=>{
            // console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    const appearance = {
        theme: 'stripe',
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = 'auto';


  return (
    <div className="m-5">
        {
            clientSecret && (
                <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>

            )
        }
    </div>
  )
}

export default Payment