import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import AccountForm from "./account-form"
import { insertAccountSchema } from "@/db/schema"
import { z } from "zod"
import { useCreateAccount } from "../api/use-create-account"
import { useOpenAccount } from "../hooks/use-open-account"
import { useGetAccount } from "../api/use-get-account"
import { Loader2Icon } from "lucide-react"
import { useEditAccount } from "../api/use-edit-account"
import { useDeleteAccount } from "../api/use-delete-account"
import { useConfirm } from "@/hooks/use-confirm"

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

const EditAccountSheet = () => {

    const { isOpen, onClose, id } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to delete this account')

    const { data, isLoading } = useGetAccount(id)
    const { mutate, isPending } = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)

    const onSubmit = (values: FormValues) => {
       mutate(values, {
        onSuccess: () => {
          onClose()
        }
       })
    }

    const onDelete = async () => {
      const ok = await confirm()

      if (ok) {
        deleteMutation.mutate(undefined, {
          onSuccess: () => {
            onClose()
          }
        })
      }
    }

    const defaultValues = data ? {
        name: data.name,
    } : {
        name: ' n '
    }

  return (
    <>
    <ConfirmDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
       <SheetContent className="space-y-4">
           <SheetHeader>
             <SheetTitle>
                Edit Account
             </SheetTitle>
             <SheetDescription>
                Edit an existing account
             </SheetDescription>
           </SheetHeader>
           {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <Loader2Icon className="size-4 text-muted-foreground animate-spin"/>
            </div>
           ) : (
            <AccountForm id={id} onSubmit={onSubmit} disabled={isPending || deleteMutation.isPending } defaultValues={defaultValues} onDelete={onDelete}/>
           )}
       </SheetContent>
    </Sheet>
    </>
  )
}

export default EditAccountSheet
