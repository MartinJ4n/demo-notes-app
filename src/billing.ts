import handler from "./util/handler";
import Stripe from "stripe";
import { calculateCost } from "./util/cost";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  //@ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});
