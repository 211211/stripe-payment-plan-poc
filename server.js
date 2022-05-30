const express = require("express");
const app = express();
// This is a sample test API key.
const stripe = require("stripe")("sk_test_XXYwwDRro2q39lnZIscrWP5x");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, payInFull } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: payInFull ? ["klarna", "card"] : ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent,
  });
});

app.post("/update-payment-intent", async (req, res) => {
  const { paymentIntentId, payInFull } = req.body;

  const methodTypes = payInFull ? ["klarna", "card"] : ["card"];

  const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    payment_method_types: methodTypes,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent,
  });
});

app.post('/cancel-payment-intent', async (req, res) => {
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent,
  });
});


app.listen(3006, () => console.log("Node server listening on port 3006!"));
