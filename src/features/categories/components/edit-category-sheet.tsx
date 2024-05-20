import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { insertCategorySchema } from "@/db/schema"
import { z } from "zod"
import { Loader2Icon } from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm"
import { useOpenCategory } from "../hooks/use-open-category"
import { useGetCategory } from "../api/use-get-category"
import { useEditCategory } from "../api/use-edit-category"
import { useDeleteCategory } from "../api/use-delete-category"
import CategoryForm from "./category-form"

const formSchema = insertCategorySchema.pick({
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

const EditCategorySheet = () => {

    const { isOpen, onClose, id } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to delete this category')

    const { data, isLoading } = useGetCategory(id)
    const { mutate, isPending } = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

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
                Edit Category
             </SheetTitle>
             <SheetDescription>
                Edit an existing category
             </SheetDescription>
           </SheetHeader>
           {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <Loader2Icon className="size-4 text-muted-foreground animate-spin"/>
            </div>
           ) : (
            <CategoryForm id={id} onSubmit={onSubmit} disabled={isPending || deleteMutation.isPending } defaultValues={defaultValues} onDelete={onDelete}/>
           )}
       </SheetContent>
    </Sheet>
    </>
  )
}

export default EditCategorySheet
