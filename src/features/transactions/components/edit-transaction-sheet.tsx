import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { insertCategorySchema, insertTransactionSchema } from "@/db/schema"
import { z } from "zod"
import { useConfirm } from "@/hooks/use-confirm"
import { useOpenTransacion } from "../hooks/use-open-transaction"
import { useGetTransaction } from "../api/use-get-transtaction"
import { useEditTransaction } from "../api/use-edit-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"
import { Loader2Icon } from "lucide-react"
import TransactionForm from "./transaction-form"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"

const formSchema = insertTransactionSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

const EditTransactionSheet = () => {

    const { isOpen, onClose, id } = useOpenTransacion()

    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to delete this transaction')

    const { data, isLoading } = useGetTransaction(id)
    const { mutate, isPending } = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)

    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name })

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({ label: category.name, value: category.id }))

    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({ name })
    
    const accountOptions = (accountQuery.data ?? []).map((account) => ({ label: account.name, value: account.id }))

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
        accountId: data.accountId,
        categoryId: data.categoryId,
        amount: data.amount.toString(),
        date: data.date ? new Date(data.date) : new Date(),
        payee: data.payee,
        notes: data.notes
    } : {
        accountId: '',
        categoryId: '',
        amount: '',
        date: new Date(),
        payee: '',
        notes: ''
    }

  return (
    <>
    <ConfirmDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
       <SheetContent className="space-y-4">
           <SheetHeader>
             <SheetTitle>
                Edit Transaction
             </SheetTitle>
             <SheetDescription>
                Edit an existing transaction
             </SheetDescription>
           </SheetHeader>
           {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <Loader2Icon className="size-4 text-muted-foreground animate-spin"/>
            </div>
           ) : (
            <TransactionForm id={id} onSubmit={onSubmit}
             disabled={isPending || deleteMutation.isPending || isLoading || categoryMutation.isPending || accountMutation.isPending || categoryQuery.isLoading || accountQuery.isLoading } categoryOptions={categoryOptions}
             onCreateCategory={onCreateCategory} accountOptions={accountOptions} onCreateAccount={onCreateAccount} defaultValues={defaultValues} onDelete={onDelete}/>
           )}
       </SheetContent>
    </Sheet>
    </>
  )
}

export default EditTransactionSheet
