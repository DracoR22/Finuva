'use client'

import { DataTable } from "@/components/global/data-table"
import { columns } from "@/components/transactions/columns"
import ImportCard from "@/components/transactions/import-card"
import UploadButton from "@/components/transactions/upload-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { Loader2, PlusIcon } from "lucide-react"
import { useState } from "react"
import { transactions as transactionSchema } from "@/db/schema"
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account"
import { toast } from "sonner"
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions"

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT'
}

const INITAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}

const TransactionsPage = () => {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITAL_IMPORT_RESULTS)

    const onUpload = (results: typeof INITAL_IMPORT_RESULTS) => {
       setImportResults(results)
       setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
      setImportResults(INITAL_IMPORT_RESULTS)
      setVariant(VARIANTS.LIST)
    }

    const createTransactions = useBulkCreateTransactions()

    const { onOpen } = useNewTransaction()

    const { data, isLoading } = useGetTransactions()
    const { mutate, isPending } = useBulkDeleteTransactions()

    const [AccountDialog, confirm] = useSelectAccount()

    const disabled = isLoading || isPending

    const onSubmitImport = async (values: typeof transactionSchema.$inferInsert[]) => {
       const accountId = await confirm()

       if (!accountId) {
        return toast.error('Please select an account to continue.')
       }

       const data = values.map((value) => ({
        ...value,
        accountId: accountId as string
       }))

       createTransactions.mutate(data, {
         onSuccess: () => {
          onCancelImport()
         }
       })
    }

    if (isLoading) {
      return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
           <Card className="border-none drop-shadow-sm">
             <CardHeader>
               <Skeleton className="h-8 w-48"/>
             </CardHeader>
             <CardContent>
               <div className="h-[500px] w-full flex items-center justify-center">
                  <Loader2 className="size-6 text-muted-foreground animate-spin"/>
               </div>
             </CardContent>
           </Card>
        </div>
      )
    }

    if (variant === VARIANTS.IMPORT) {
      return (
        <>
          <AccountDialog/>
          <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport}/>
        </>
      )
    }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                   Transactions History
                </CardTitle>
               <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
               <Button onClick={onOpen} className="w-full lg:w-auto">
                   <PlusIcon className="size-4 mr-2"/>
                   Add new
                </Button>
                <UploadButton onUpload={onUpload}/>
               </div>
            </CardHeader>
            <CardContent>
              <DataTable filterKey="payee" disabled={disabled} columns={columns} data={data || []} 
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id)
                mutate({ ids })
              }}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default TransactionsPage
