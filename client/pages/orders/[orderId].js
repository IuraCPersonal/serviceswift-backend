import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import Link from "next/link";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  if (timeLeft < 0)
    return (
      <div className="max-w-xl mx-auto flex justify-center items-center flex-col gap-8">
        <p className="text-8xl text-center">Order expired</p>
        <Link href="/" className="text-blue-500">
          Go to home
        </Link>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-8">
      <p className="text-8xl text-center">
        Time left to pay: {timeLeft} seconds
      </p>
      <StripeCheckout
        token={(token) => doRequest({ token: token.id })}
        stripeKey="pk_test_51O2BysASgkaFpyQQEWozh2OEygRmFQFdhsmSgzZeCMBM9YWjLS2OpL3ov2GSpbOuf2meuqyepyP1iVLQN25bIJR700TKFy8aNV"
        amount={order.job.price * 100}
        email={currentUser.email}
      >
        <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pay with Stripe
        </button>
      </StripeCheckout>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
