export const createPaymentIntent = async ({ payInFull = true }) => {
  // Create PaymentIntent as soon as the page loads
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }], payInFull }),
  });

  return response.json();
};

export const updatePaymentIntent = async ({
  paymentIntentId,
  payInFull = true,
}) => {
  // Update PaymentIntent
  const response = await fetch("/update-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentIntentId, payInFull }),
  });

  return response.json();
};

export const cancelPaymentIntent = async (paymentIntentId) => {
  const response = await fetch("/cancel-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentIntentId }),
  });

  return response.json();
};

export const retrievePaymentIntent = async (stripe, clientSecret) => {
  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  return paymentIntent;
};
