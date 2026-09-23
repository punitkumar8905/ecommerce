'use client'
import { apiClient } from '@/library/helper';
import React, { useState } from 'react'
import { FaTrash, FaCheck } from 'react-icons/fa';
import { RiGalleryFill } from 'react-icons/ri';
import { createPortal } from "react-dom";

export default function MultipleImage({ api_url, other_images, delete_url, image_url }) {
    const [otherImages, setOtherImages] = useState(Array.isArray(other_images) ? other_images : other_images ? [other_images] : []);
    const [toggle, setToggle] = useState(false);


    const deleteHandler = (idx) => {
        apiClient.delete(delete_url + idx)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.msg);
                        setOtherImages(response.data.current_other_images);
                    }
                }
            ).catch(() => { })
    }
    const uploadHandler = (e) => {
        e.preventDefault()
        const images = e.target.other_images.files;
        const formData = new FormData();
        for (let img of images) {
            formData.append("other_imaes", img);
        }
        apiClient.post(api_url, formData)
            .then(
                (response) => {
                    if (response.data.flag == 1) {
                        toast.success(response.data.msg);
                        setOtherImages(response.data.current_other_images);
                        e.target.reset();
                    }
                }
            ).catch(() => { })
    }
    return (
        <div>
            <button
                type="button"
                onClick={() => setToggle(true)}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 p-3 text-white shadow-lg transition hover:bg-slate-700"
            >
                <RiGalleryFill className="text-2xl" />
            </button>
           <div
  className={`${toggle ? 'flex' : 'hidden'} fixed inset-0 z-[9999999] items-center justify-center bg-slate-950/70 p-4`}
  onClick={() => setToggle(false)}
>

             <div
  className="relative w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Manage Product Images</h2>
                            <p className="text-sm text-slate-500">View existing images, delete selected ones, and upload new files.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setToggle(false)}
                            className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.8fr_1fr] overflow-auto">
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {otherImages?.length ? (
                                    otherImages.map((img_name, idx) => (
                                        <div key={idx} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                            <img
                                                src={`${image_url}${img_name}`}
                                                alt={`Product image ${idx + 1}`}
                                                className="mb-4 h-48 w-full rounded-3xl object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => deleteHandler(idx)}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                                        No additional images available.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900">Upload new images</h3>
                            <p className="mt-1 text-sm text-slate-500">Select one or more files to add new product images.</p>
                            <form onSubmit={uploadHandler} className="mt-6 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Select files</label>
                                    <input
                                        multiple={true}
                                        name="other_images"
                                        type="file"
                                        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                                    >
                                        <FaCheck /> Upload
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setToggle(false)}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-200 px-6 py-3 text-slate-900 transition hover:bg-slate-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
