"use client"
import { CardOfTasks } from "@/components/CardOfTasks"
import { useEffect, useState } from "react"

const getTasks = async() => {
  const result = await fetch('http://localhost:3000/api/tasks')
  const data = await result.json()
  return data.result
}

const HomePage = () => {
  const [first, setFirst] = useState()
  
  useEffect(() => {
    esto()
  }, [])
  
  const esto = async () => {
    const tasks = await getTasks()
    setFirst(tasks)

  }

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {first?.map( item => (
          <CardOfTasks {...item} key={item.id}/>
        ))}
      </div>
    </section>
  )
}

export default HomePage
