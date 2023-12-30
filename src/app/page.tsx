"use client"
import { useEffect, useState } from "react"


export default function Home() {

  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User[]>([])

  const getUsuarios = async () => {
    setLoading(true)
    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUser(data)
    }catch (err){
     console.error("Erro ao tentar lista os usuarios")
    }
    setLoading(false)
  }

  const handlePost = async () => {
    const responsive = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Titulo feio por Wilson',
            body: 'Corpo feito por Wilson',
            userId: 1001
        })
    });
    const data = await responsive.json();
    console.log(data)
  }

  useEffect(() => {
      
      getUsuarios();
      // fetch('https://jsonplaceholder.typicode.com/users')
      // .then(res => res.json())
      // .then((data) => {
      //       setUser(data);
      // })
      // .catch(()=>{
      //   console.log("Erro ao fazer a requisicao")
      // })
      // .finally(() => {
      //   setLoading(false)
      // })

  }, [])


  return (
    <div className="container mx-auto h-svh text-center">
        <h1>Lista de Usuarios</h1>
        <button className="bg-cyan-900 p-2 w-52 text-white" onClick={handlePost}>Adicionar Post</button>
        <ul>
          {loading &&
               <div className="w-28 h-28 border-8 border-red-100 border-r-red-600 border-t-red-600 rounded-full animate-spin mx-auto mt-40"></div>       
          }
          {!loading && user.length > 0 &&  
          user.map((e) => (
            <li className="bg-slate-3100 my-2 p-1 text-sm">Nome: {e.name} - email {e.email}</li>
          ))
          }
        </ul>

        {!loading && user.length <= 0 &&
          <div className="bg-red-400 text-white p-1 rounded-md">Não existe usúario para mostrar</div>
        }
    </div>
  )
}
