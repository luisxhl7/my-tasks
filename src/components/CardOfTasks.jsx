'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const CardOfTasks = ({id, description, title, createdAt}) => {
    const router = useRouter()
    return (
        <div key={id} className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer" onClick={() => {router.push(`/tasks/edit/${id}`)}}>
        <h3 className="font-bold text-2xl mb-2">{title}</h3>
        <p>{description}</p>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
    )
}
