'use client'

import { apiClient } from '@/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function DeleteBtn({delete_url}) {

    const router = useRouter();
    const deleteHandler = () => {
        apiClient.delete(delete_url) 
        .then((response) => {
            if(response.data.flag == 1){
                toast.success(response.data.msg);
                router.refresh();
            }else{
                toast.warning(response.data.msg)
            }
        })
        .catch(() => {
            toast.warning("something went wrong")
        })
    }
    
  return (
    <>
     <FaTrash onClick={deleteHandler} className='cursor-pointer text-red-600'/>
    </>
  )
}
