import { useState } from 'react'
import { Dropzone, FileMosaic } from '@files-ui/react'
import Button from './ui/Button'

const DragAndDrop = () => {
  const [files, setFiles] = useState([])

  const uploadFiles = async (files) => {
    setFiles(files)
  }

  const removeFile = (id) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id))
  }

  return (
    <div className='w-full'>
      <Dropzone
        label='Arrastre y suelte sus archivos aquí'
        accept='application/pdf'
        value={files}
        onChange={uploadFiles}
      >
        {files.map((file) => (
          <FileMosaic key={file.id} onDelete={removeFile} {...file} info />
        ))}
      </Dropzone>
      <div className='w-full text-center my-4'>
        <Button files={files} />
      </div>
    </div>
  )
}

export default DragAndDrop