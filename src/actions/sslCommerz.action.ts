import { sslCommerzService } from "@/services/sslCommerz.service";
import { ISSLCommerzInitiatePaymentPayload } from "@/types/sslCommerz.type";

export const createSSLCommerzPayment = async (payload: ISSLCommerzInitiatePaymentPayload) => {
    const result = await sslCommerzService.createSSLCommerzPayment(payload);

    return result;
}