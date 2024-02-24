"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewPage = ({ params }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (params.idTask) {
      fetch(`/api/tasks/${params.idTask}`)
        .then((resp) => resp.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (params.idTask) {
      const result = await fetch(`/api/tasks/${params.idTask}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log(data);
    } else {
      const result = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log(data);
    }

    router.refresh();
    router.push("/");
  };
  const deletedTask = async() => {
    const resp = await fetch(`/api/tasks/${params.idTask}`,{
      method: 'DELETE'
    })
    const data = await resp.json()
    console.log(data);
    router.refresh();
    router.push("/");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de tarea
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="titulo"
          value={title}
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="3"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            placeholder="describe tu tarea"
            type="submit"
          >
            Crear
          </button>
          {params.idTask && (
            <button
              type="button"
              onClick={deletedTask}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPage;
