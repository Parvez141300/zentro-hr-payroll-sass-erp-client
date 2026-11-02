"use client";
import { getCompanyPayments } from "@/actions/payment.action";
import DataTable from "@/components/shared/tables/DataTable";
import { useTableQueryParams } from "@/hooks/useTableQueryParams";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { paymentColumn } from "./PaymentColumn";

const PaymentTable = ({ queryString }: { queryString: string }) => {
  const {
    sortingState,
    handleSortingChange,
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    searchValue,
    handleSearchChange,
  } = useTableQueryParams();

  const { data: paymentResponse, isLoading } = useQuery({
    queryKey: ["company-payments", queryString],
    queryFn: () => getCompanyPayments(queryString),
  });
  const paymentData = paymentResponse?.data;
  const payements = paymentData?.data;
  const paginationMeta = paymentData?.pagination;

  console.log("payement data", payements);

  return (
    <>
      {/* Department Head table */}
      <DataTable
        title="Company Payments"
        description="See your payments here."
        data={payements || []}
        columns={paymentColumn}
        isLoading={isLoading}
        emptyMessage="No payments found!"
        sorting={{ state: sortingState, onSortingChange: handleSortingChange }}
        toolbar={{
          search: {
            value: searchValue,
            onChange: handleSearchChange,
            placeholder: "Search payments...",
          },
        }}
        pagination={
          paginationMeta
            ? {
                page,
                limit,
                total: paginationMeta.total,
                totalPages: paginationMeta.totalPages,
                onPageChange: handlePageChange,
                onLimitChange: handleLimitChange,
              }
            : undefined
        }
      />
    </>
  );
};

export default PaymentTable;
