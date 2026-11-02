import { PaymentGateway, PaymentStatus, SubscriptionPlan } from "./enums.type";

export interface IPayment {
    id: string;
    gateway: PaymentGateway;
    plan: SubscriptionPlan;
    amountUSD: number | null;
    amountBDT: number | null;

    // Stripe fields
    stripePaymentIntentId: string | null;
    stripeInvoiceId: string | null;
    stripeSubscriptionId: string | null;

    // SSLCommerz fields
    sslTranId: string | null;
    sslValId: string | null;
    sslSessionKey: string | null;

    transactionId: string | null;
    status: PaymentStatus;
    paidAt: Date | null;
    subscriptionStart: Date | null;
    subscriptionEnd: Date | null;
    invoiceUrl: string | null;

    createdAt: Date;
    updatedAt: Date;

    // relations
    companyId: string;
}