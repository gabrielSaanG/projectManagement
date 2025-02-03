import React from 'react'

export default function ModalComponent({children}){
    return (
        <div className="flex items-center w-fit border-2 border-gray-200 shadow-sm rounded-2xl bg-white p-2">
            {children}
        </div>
    )
}