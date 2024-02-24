import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export const GET = async(request, {params}) => {
  try {
    const result = await prisma.task.findMany()
    
    return NextResponse.json({status: 'success', result})
    
  } catch (error) {
    
  }

}

export const POST = async(request, {params}) => {
  try {
    const {title, description} = await request.json()
    
    const result = await prisma.task.create({
      data: { 
        title: title, 
        description: description, 
      }
    })
    
    return NextResponse.json({
      status:'success', 
      message:'Tarea guardada exitosamente!!', 
      ...result})
    
  } catch (error) {
    console.log(error.message);  
  }

}
