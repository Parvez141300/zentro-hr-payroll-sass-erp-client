import { httpServer } from "@/lib/http/httpServer";
import { ICreateCheckoutSessionPayload, ICreateCheckoutSessionResponse } from "@/types/stripe.type";

const createStripeCheckoutSession = async (payload: ICreateCheckoutSessionPayload) => {
    const result = await httpServer.post<ICreateCheckoutSessionResponse>("/api/v1/stripe/create-checkout-session", payload);

    return result;
}

export const stripeService = {
    createStripeCheckoutSession,
}