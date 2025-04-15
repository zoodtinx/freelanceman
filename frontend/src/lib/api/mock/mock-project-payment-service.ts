import { mockProjectPayments } from "src/lib/api/mock/mock-data";
import { ProjectPaymentData } from "@types"

const paymentStats = {
   unpaid: 145000,
   processing: 50000,
   allAmountDue: 195000
}

export const getProjectPayment = () => {
   return Promise.resolve(mockProjectPayments)
}

export const getAmountDue = () => {
   return Promise.resolve(paymentStats)
}