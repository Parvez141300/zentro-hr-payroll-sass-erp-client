export interface ISSLCommerzInitiatePaymentPayload {
    planName: string;
    billingCycle: "MONTHLY" | "YEARLY";
}

export interface ISSLCommerzInitiatePaymentResponse {
    url: string;
    paymentId: string;
    transactionId: string;
    sessionId: string;
}