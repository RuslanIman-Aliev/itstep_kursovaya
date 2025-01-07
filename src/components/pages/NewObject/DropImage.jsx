import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PiUploadSimpleLight } from "react-icons/pi";
import './DropImage.css'
import { FaJava } from 'react-icons/fa';
const ImageUploader = ({onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
  );
  setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

    if (onFilesChange) {
      onFilesChange([...files, ...acceptedFiles]);  
  }
  }, [files,onFilesChange]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '*',
  });

  return (
    <div style={{ padding: '20px' }}>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          height:'200px',
          textAlign:'center',
          display:'flex',
          justifyContent:'center',
          background:'white',
          backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
        }}
      >
        <input {...getInputProps()} />
         
          <div className="info-upload">
          <PiUploadSimpleLight className='icon-upload'/>
          <p className='text-upload'>Drop files here</p>
            </div>
        
      </div>

      
    </div>
  );
};

export default ImageUploader;
