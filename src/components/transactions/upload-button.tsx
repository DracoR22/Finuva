import { useCSVReader } from "react-papaparse"
import { Button } from "../ui/button"
import { UploadIcon } from "lucide-react"

type Props = {
    onUpload: (results: any) => void
}

const UploadButton = ({ onUpload }: Props) => {

    const { CSVReader } = useCSVReader()

  return (
    <CSVReader onUploadAccepted={onUpload}>
        {({ getRootProps }: any) => (
            <Button size={'sm'} className="w-full lg:w-auto" {...getRootProps()}>
                <UploadIcon className="size-4 mr-2"/>
                Import
            </Button>
        )}
    </CSVReader>
  )
}

export default UploadButton
