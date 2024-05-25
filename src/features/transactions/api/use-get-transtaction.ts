import { client } from '@/lib/hono'
import { convertAmountfromMiliunits } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['transaction', { id }],
        queryFn: async () => {
            // Do type safe api call to our hono API
            const response = await client.api.transactions[':id'].$get({ param: { id } })

            if (!response.ok) {
                throw new Error('Failed to fetch transaction')
            }

            const { data } = await response.json()

            return {
                ...data,
                amount: convertAmountfromMiliunits(data.amount),
            }
        }
    })

    return query
}