import React, { useState } from 'react'
import InputComponent from '../common/Input'
import Button from '../common/Button'
import { toast } from 'react-toastify'
import FileInput from '../common/Input/FileInput'

function CreateAPodcastForm() {
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [displayImage,setDisplayImage] = useState()
    const [bannerImage,setBannerImage] = useState()
    const [loading,setLoading] = useState(false);
    const handleSubmit = ()=>{
        if(title && desc && displayImage && bannerImage){
            toast.success('Podcast Created !')
        }else{
            toast.error('All fields are mandatory !')
        }
    }
    const displayImageHandle=(file)=>{
        setDisplayImage(file)
    }
    const bannerImageHandle=(file)=>{
        setBannerImage(file)
    }
  return (
    <>
        <InputComponent 
            state={title}
            setState={setTitle}
            placeholder={"Title"}
            type={'text'}
            required={true}
        />
        <InputComponent 
            state={desc}
            setState={setDesc}
            placeholder={"Decription"}
            type={'text'}
            required={true}
        />
        <FileInput
            accept={'image/*'}
            id={'display-image-input'}
            fileHandleFnc={displayImageHandle}
            text={'Upload Display Image'}
        />
         <FileInput
            accept={'image/*'}
            id={'banner-image-input'}
            fileHandleFnc={bannerImageHandle}
            text={'Upload Banner Image'}
        />
        <Button
        text={loading?"Loading..":"Create Podcast"}
        onClick={handleSubmit}
        disabled={loading}
      />
    </>
  )
}

export default CreateAPodcastForm