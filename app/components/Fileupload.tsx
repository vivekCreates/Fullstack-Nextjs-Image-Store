"use client";
import  {useState}  from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


function Fileupload({ onSuccess }: { onSuccess: (url: IKUploadResponse) => void }) {

    const [error,setError] = useState<string | null>(null);
    const [uploading,setUploading] = useState<boolean>(false);

    const handleError = (err:{message:string}) => {
        setError(err?.message)
        setUploading(false)
    }

    const handleSuccess = (response:IKUploadResponse) => {
        setUploading(false)
        setError(null)
        onSuccess(response)
    }

    const handleFileUploadStart = () => {
        setUploading(true)
        setError(null)
    }
    return (
        <div className="">
            <h1>Upload File</h1>
            <IKUpload
            fileName="product"
            onError={handleError}
            onSuccess={handleSuccess}
            onUploadStart={handleFileUploadStart}
            />
            {
                uploading && <p>File is uploading</p>
            }
            {
                error && <p>{error}</p>
            }
        </div>
    )
}

export default Fileupload