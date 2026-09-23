"use client";
import { apiClient } from '@/library/helper';
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"

export default function ToggleBtn(
    {
        id, current, base_url, flag, trueText, falseText,
    }
) {

    const[currentValue, setCurrentValue] = useState()

    useEffect(
        () => {
            setCurrentValue(current)
        },[current]
    )

    const toggleHandler = () =>{
        apiClient.patch(`${base_url}/${id}/${flag}`)
        .then((response) => {
            if(response.data.flag == 1){
                toast.success(response.data.msg);
                setCurrentValue(!currentValue);
            }
        }).catch(() => {});
        //  setCurrentValue(!currentValue);
        }

  return (
    <>
    {
        currentValue == true ? (
            <button className=' ml-1 px-2 py-1 text-sm rounded text-white bg-green-600' onClick={toggleHandler}>{trueText}</button>
        ):(
            <button className=' ml-1 px-2 py-1 rounded text-white bg-red-600' onClick={toggleHandler}>{falseText}</button>
        )
    } 
    </>
  )
}
