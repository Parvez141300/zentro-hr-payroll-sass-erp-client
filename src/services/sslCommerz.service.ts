import { httpServer } from "@/lib/http/httpServer";
import { ISSLCommerzInitiatePaymentPayload } from "@/types/sslCommerz.type";

const createSSLCommerzPayment = async (payload: ISSLCommerzInitiatePaymentPayload) => {
    const result = await httpServer.post("/api/v1/sslcommerz", payload);

    return result;
}

export const sslCommerzService = {
    createSSLCommerzPayment,
}