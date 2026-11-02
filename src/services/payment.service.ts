import { httpServer } from "@/lib/http/httpServer"
import { IPaginatedData } from "@/types/pagination.type";
import { IPayment } from "@/types/payment.type";

const getCompanyPayments = async (queryString?: string) => {
    const result = await httpServer.get<IPaginatedData<IPayment[]>>(`/api/v1/payments?${queryString}`);

    return result;
}

export const paymentService = {
    getCompanyPayments,
}