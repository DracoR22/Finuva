import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGetAccounts } from "../api/use-get-accounts"
import { useCreateAccount } from "../api/use-create-account"
import Select from "@/components/global/select"

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
   const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null)

   const selectValue = useRef<string>()

   const accountQuery = useGetAccounts()
   const accountMutation = useCreateAccount()
   const onCreateAccount = (name: string) => accountMutation.mutate({ name })

   const accountOptions = (accountQuery.data ?? []).map((account) => ({
      label: account.name,
      value: account.id
   }))

   const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve })
   })

   const handleClose = () => {
    setPromise(null)
   }

   const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
   }

   const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
   }

   const ConfirmationDialog = () => {
    return (
        <Dialog open={promise !== null} onOpenChange={handleCancel}>
          <DialogContent>
            <DialogHeader>
               <DialogTitle>Select Account</DialogTitle>
               <DialogDescription>Please select an account to continue</DialogDescription>
            </DialogHeader>
            <Select placeholder="Select an account" options={accountOptions} disabled={accountQuery.isLoading || accountMutation.isPending}
            onCreate={onCreateAccount} onChange={(value) => selectValue.current = value}/>
            <DialogFooter className="pt-2">
               <Button onClick={handleCancel} variant={'outline'}>
                 Cancel
               </Button>
               <Button onClick={handleConfirm} variant={'outline'}>
                 Confirm
               </Button>
            </DialogFooter>
        </DialogContent>
     </Dialog>
    )
   }

   return [ConfirmationDialog, confirm]
}