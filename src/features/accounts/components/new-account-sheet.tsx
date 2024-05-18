import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/use-new-account"
import AccountForm from "./account-form"
import { insertAccountSchema } from "@/db/schema"
import { z } from "zod"
import { useCreateAccount } from "../api/use-create-account"

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

const NewAccountSheet = () => {

    const { isOpen, onClose } = useNewAccount()

    const { mutate, isPending } = useCreateAccount()

    const onSubmit = (values: FormValues) => {
       mutate(values, {
        onSuccess: () => {
          onClose()
        }
       })
    }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
       <SheetContent className="space-y-4">
           <SheetHeader>
             <SheetTitle>
                New Account
             </SheetTitle>
             <SheetDescription>
                Create a new account to track your transactions
             </SheetDescription>
           </SheetHeader>
           <AccountForm onSubmit={onSubmit} disabled={isPending} defaultValues={{ name: '' }}/>
       </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet
