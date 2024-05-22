import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner"

type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$delete']>

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.transactions[':id']['$delete']({ param: { id } })

            return await response.json()
        },

        onSuccess: () => {
            toast.success('Transaction deleted')
            // Refetch all accounts using its key
            queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },

        onError: () => {
            toast.error('Failed to delete transaction. Please try again later.')
        }
    })

    return mutation
}