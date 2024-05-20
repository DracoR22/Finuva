'use client'

import { EditIcon, MoreHorizontalIcon } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"

type Props = {
    id: string
}

const Actions = ({ id }: Props) => {

    const { onOpen } = useOpenAccount()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant={'ghost'} className="size-8 p-0">
               <MoreHorizontalIcon className="size-4"/>
           </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
             <EditIcon className="size-4 mr-2"/>
               Edit
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Actions
