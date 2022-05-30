import React, { useState } from "react";
import {
  cancelPaymentIntent,
  createPaymentIntent,
  updatePaymentIntent,
} from "./api/paymentIntents";

import PropTypes from "prop-types";

const PAY_IN_FULL = "pay-in-full";
const PAY_PARTIAL = "pay-partial";

const PaymentType = ({
  paymentIntentId,
  setClientSecret,
  setPaymentIntentId,
}) => {
  const [type, setType] = useState(PAY_IN_FULL);

  const sendPayInFull = async () => {
    if (type === PAY_IN_FULL) {
      return;
    }
    setType(PAY_IN_FULL);

    setClientSecret(null);

    await cancelPaymentIntent(paymentIntentId);

    const data = await createPaymentIntent({ payInFull: true });

    setClientSecret(data.clientSecret);
    setPaymentIntentId(data.paymentIntent.id);
  };

  const sendPayPartial = async () => {
    if (type === PAY_PARTIAL) {
      return;
    }
    setType(PAY_PARTIAL);

    setClientSecret(null);

    await cancelPaymentIntent(paymentIntentId);

    const data = await createPaymentIntent({ payInFull: false });

    setClientSecret(data.clientSecret);
    setPaymentIntentId(data.paymentIntent.id);
  };

  const handlePayInFull = () => {
    sendPayInFull();
  };

  const handlePayDeposit = () => {
    sendPayPartial();
  };

  const handlePayPaymentPlan = () => {
    sendPayPartial();
  };

  const sendPayInFullUpdate = async () => {
    if (type === PAY_IN_FULL) {
      return;
    }
    setType(PAY_IN_FULL);

    // this forces the Elements component to unmount and remount
    setClientSecret(null);

    const data = await updatePaymentIntent({
      paymentIntentId,
      payInFull: true,
    });

    setClientSecret(data.clientSecret);
    setPaymentIntentId(data.paymentIntent.id);
  };

  const sendPayPartialUpdate = async () => {
    if (type === PAY_PARTIAL) {
      return;
    }
    setType(PAY_PARTIAL);

    // this forces the Elements component to unmount and remount
    setClientSecret(null);

    const data = await updatePaymentIntent({
      paymentIntentId,
      payInFull: false,
    });

    setClientSecret(data.clientSecret);
    setPaymentIntentId(data.paymentIntent.id);
  };

  const handlePayInFullUpdate = () => {
    sendPayInFullUpdate();
  };

  const handlePayDepositUpdate = () => {
    sendPayPartialUpdate();
  };

  const handlePayPaymentPlanUpdate = () => {
    sendPayPartialUpdate();
  };

  return (
    <div className="payment-types">
      <p>re-create paymentIntent</p>
      <ul className="tabs">
        <li>
          <button onClick={handlePayInFull}>Pay In Full</button>
        </li>
        <li>
          <button onClick={handlePayDeposit}>Pay Deposit</button>
        </li>
        <li>
          <button onClick={handlePayPaymentPlan}>Pay with Payment Plan</button>
        </li>
      </ul>
      <p>update paymentIntent</p>
      <ul className="tabs">
        <li>
          <button onClick={handlePayInFullUpdate}>Pay In Full</button>
        </li>
        <li>
          <button onClick={handlePayDepositUpdate}>Pay Deposit</button>
        </li>
        <li>
          <button onClick={handlePayPaymentPlanUpdate}>
            Pay with Payment Plan
          </button>
        </li>
      </ul>
    </div>
  );
};

PaymentType.propTypes = {
  setClientSecret: PropTypes.func.isRequired,
  setPaymentIntentId: PropTypes.func.isRequired,
};

export default PaymentType;
