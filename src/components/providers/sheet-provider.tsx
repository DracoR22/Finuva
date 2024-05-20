'use client'

import EditAccountSheet from "@/features/accounts/components/edit-account-sheet"
import NewAccountSheet from "@/features/accounts/components/new-account-sheet"
import { useEffect, useState } from "react"
import { useMountedState } from "react-use"

const SheetProvider = () => {

    // const [isMounted, setIsMounted] = useState(false)

    // useEffect(() => {
    //     setIsMounted(true)
    // }, [])

    const isMounted = useMountedState()

    if (!isMounted) return null

  return (
    <>
      <NewAccountSheet/>
      <EditAccountSheet/>
    </>
  )
}

export default SheetProvider
