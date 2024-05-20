import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['category', { id }],
        queryFn: async () => {
            // Do type safe api call to our hono API
            const response = await client.api.categories[':id'].$get({ param: { id } })

            if (!response.ok) {
                throw new Error('Failed to fetch category')
            }

            const { data } = await response.json()

            return data
        }
    })

    return query
}