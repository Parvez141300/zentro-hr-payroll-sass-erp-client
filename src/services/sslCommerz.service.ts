import { httpServer } from "@/lib/http/httpServer";
import { ISSLCommerzInitiatePaymentPayload, ISSLCommerzInitiatePaymentResponse } from "@/types/sslCommerz.type";

const createSSLCommerzPayment = async (payload: ISSLCommerzInitiatePaymentPayload) => {
    const result = await httpServer.post<ISSLCommerzInitiatePaymentResponse>("/api/v1/sslcommerz/initiate", payload);

    return result;
}

export const sslCommerzService = {
    createSSLCommerzPayment,
}