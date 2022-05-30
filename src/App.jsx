import "./App.css";

import React, { useEffect, useState } from "react";

import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import PaymentType from "./PaymentType";
import { createPaymentIntent } from "./api/paymentIntents";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_p9R8CxZfH5OR9y6GtLbPAoKT");

const App = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  useEffect(() => {
    const init = async () => {
      const data = await createPaymentIntent({
        items: [{ id: "xl-tshirt" }],
        payInFull: true,
      });

      console.log("fetchPaymentIntent", data);

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntent.id);
    };

    init();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
    // locale: 'es',
  };

  return (
    <div className="App">
      <p>
        Client Secret: <code>{clientSecret}</code>
      </p>
      <p>
        Payment Intent: <code>{paymentIntentId}</code>
      </p>
      <PaymentType
        paymentIntentId={paymentIntentId}
        setClientSecret={setClientSecret}
        setPaymentIntentId={setPaymentIntentId}
      />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default App;
