"use server";

import { stripeService } from "@/services/stripe.service";
import { ICreateCheckoutSessionPayload } from "@/types/stripe.type";

export const createStripeCheckoutSession = async (payload: ICreateCheckoutSessionPayload) => {
    const result = await stripeService.createStripeCheckoutSession(payload);

    return result;
}