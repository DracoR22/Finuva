'use client'

import { useMemo } from "react"
import { SingleValue } from "react-select"
import CreateableSelect from "react-select/creatable"

type Props = {
    onChange: (value?: string) => void
    onCreate?: (value: string) => void
    options?: { label: string; value: string }[]
    value?: string | null | undefined
    disabled?: boolean
    placeholder?: string
}

const Select = ({ onChange, disabled, onCreate, options = [], placeholder, value }: Props) => {

    const onSelect = (option: SingleValue<{ label: string, value: string }>) => {
        onChange(option?.value)
    }

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value)
    }, [options, value])

  return (
    <CreateableSelect placeholder={placeholder} className="text-sm h-10"
    styles={{
        control: (base) => ({
            ...base,
            borderColor: "#3F3F3F",
            backgroundColor: '#00000',
            ":hover": {
                borderColor: "#6B4483"
            },
        }),
     menu: (m) => ({
        ...m,
        backgroundColor: '#1A1A17',
     }),
     option: (m) => ({
        ...m,
        color: "white",
        backgroundColor: '#1A1A17',
        ":active": {
            backgroundColor: "#6B4483"
        },
        ":hover": {
            backgroundColor: "#6B4483"
        },
     }),
    }} value={formattedValue} onChange={onSelect} options={options} onCreateOption={onCreate} isDisabled={disabled}/>
  )
}

export default Select
