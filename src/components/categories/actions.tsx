'use client'

import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { useConfirm } from "@/hooks/use-confirm"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"

type Props = {
    id: string
}

const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to delete this category.')

    const { onOpen } = useOpenCategory()

    const deleteMutation = useDeleteCategory(id)

    const handleDelete = async () => {
      const ok = await confirm()

      if (ok) {
        deleteMutation.mutate()
      }
    }

  return (
    <>
      <ConfirmDialog/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant={'ghost'} className="size-8 p-0">
               <MoreHorizontalIcon className="size-4"/>
           </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
             <EditIcon className="size-4 mr-2"/>
               Edit
            </DropdownMenuItem>
            <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
             <TrashIcon className="size-4 mr-2"/>
               Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Actions
