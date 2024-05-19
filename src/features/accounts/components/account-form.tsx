import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { insertAccountSchema } from "@/db/schema"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2Icon, TrashIcon } from "lucide-react"

const formSchema = insertAccountSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
    id?: string
    defaultValues?: FormValues
    onSubmit: (values: FormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

const AccountForm = ({ onSubmit, defaultValues, disabled, id, onDelete }: Props) => {

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues
    })

    const handleSubmit = (values: FormValues) => {
      onSubmit(values)
    }

    const handleDelete = () => {
      onDelete?.()
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
           <FormField name="name" control={form.control} render={({ field }) => (
             <FormItem>
                <FormLabel>
                  Name
                </FormLabel>
                <FormControl>
                  <Input disabled={disabled} placeholder="e.g. Cash, Bank, Credit Card" {...field}/>
                </FormControl>
             </FormItem>
           )}/>
           <Button className="w-full" disabled={disabled}>
             {disabled ? <Loader2Icon className="w-4 h-4 animate-spin"/> : (id ? 'Save changes' : 'Create account')}
           </Button>
           {!!id && (
            <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant={'outline'}>
              <TrashIcon className="size-4 mr-2"/>
               Delete account
            </Button>
           )}
        </form>
    </Form>
  )
}

export default AccountForm