import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export const GET = async(request, {params}) => {
  
  const { id } = params
  
  const result = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })
  
  return NextResponse.json({status:'success', ...result})

}

export const PUT = async(request, {params}) => {
  
  const { id } = params
  const {title, description} = await request.json()

  const result = await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: { 
      title: title, 
      description: description, 
    }
  })
  
  return NextResponse.json({status:'success', ...result})

}

export const DELETE = async(request, {params}) => {
  try {
  
    const { id } = params
    
    const result = await prisma.task.delete({
      where: {
        id: Number(id)
      }
    })
    
    return NextResponse.json({status:'success', ...result})
    
  } catch (error) {

    return NextResponse.json(error.message)  
  }

}
