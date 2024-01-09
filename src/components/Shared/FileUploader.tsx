import React, {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
type FileUploaderProps = {
    fieldChange : (FILES : File []) => void;
    mediaUrl : string ;
}

const FileUploader = ({fieldChange , mediaUrl}: FileUploaderProps) => {
    const [file, setfile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(' ')
    const onDrop = useCallback((acceptedFiles :FileWithPath [])=> {
        setfile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({onDrop, accept : {
        "image/*" : [ '.png', 'jpg', 'jpeg', '.svg' , '.gif'],
      }})
    
  return (
    <div {...getRootProps()} className='flex flex-col flex-center bg-dark-3 rounded-xl cursor pointer'>
    <input {...getInputProps()}  className='cursor-pointer'/>
    {
     fileUrl ? (
     <>
        <div className='flex justify-center w-full p-5 -flex-1'><img src={fileUrl} alt="" className='flie_uploader-img' />
       </div>
       <p className='file_uploader-label'> Click or drag a photo</p>
        </>
     ) : (
        <div className='file_uploader-box'>
            <img src={fileUrl || "/assets/icons/file-upload.svg"}alt="file-upload" width={96} height={77} />
            <h3 className='mt-6 base-medium text-light-2 md-2'> Drag Photo Here</h3>
            <p className='mb-6 text-light-4 small-regular'>SVG, PNG, JPG, JPEG</p>

            <Button className='shad-button_dark_4'> Select from device </Button>
        </div>

        
     )
    }
  </div>
  )
}

export default FileUploader