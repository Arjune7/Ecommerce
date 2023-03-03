import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51Mg6AUSD5N6JJlo4m7gLtjZDXmq5fvhCMLWuM5DkjhJKefHPDs2bnGrFFTkQfWYffHQqXJpmqQzRNKuginWXUsL100IjTBpv1w');
  }

  return stripePromise;
};

export default getStripe;
