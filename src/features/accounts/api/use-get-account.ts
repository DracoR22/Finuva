import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['account', { id }],
        queryFn: async () => {
            // Do type safe api call to our hono API
            const response = await client.api.accounts[':id'].$get({ param: { id } })

            if (!response.ok) {
                throw new Error('Failed to fetch account')
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}