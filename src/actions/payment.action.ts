import { paymentService } from "@/services/payment.service"

export const getCompanyPayments = async(queryString?: string)=> {
    const result = await paymentService.getCompanyPayments(queryString);

    return result;
}