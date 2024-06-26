import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { insertCategorySchema } from "@/db/schema"
import { z } from "zod"
import { useNewCategory } from "../hooks/use-new-category"
import { useCreateCategory } from "../api/use-create-category"
import CategoryForm from "./category-form"


const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>


const NewCategorySheet = () => {

    const { isOpen, onClose } = useNewCategory()

    const { mutate, isPending } = useCreateCategory()

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
                New Category
             </SheetTitle>
             <SheetDescription>
                Create a new account to track your transactions
             </SheetDescription>
           </SheetHeader>
           <CategoryForm onSubmit={onSubmit} disabled={isPending} defaultValues={{ name: '' }}/>
       </SheetContent>
    </Sheet>
  )
}

export default NewCategorySheet
