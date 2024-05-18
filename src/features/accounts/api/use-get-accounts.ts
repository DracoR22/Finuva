import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            // Do type safe api call to our hono API
            const response = await client.api.accounts.$get()

            if (!response.ok) {
                throw new Error('Failed to fetch accounts')
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}