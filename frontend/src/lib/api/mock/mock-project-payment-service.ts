import { mockProjectPayments } from "@mocks"
import { ProjectPaymentData } from "@types"


export const getProjectPayment = () => {
   return Promise.resolve(mockProjectPayments)
}