import { useState } from 'react'
import './App.css'

export default function App(){

const [arregloTareas, setArregloTareas] = useState([]) 

const agregarTarea = () => {
  const inputTarea = document.querySelector('input');
  const tareaValue = inputTarea.value.trim(); 

  if (tareaValue) {
    const nuevaTarea = { id: crypto.randomUUID(), tarea: tareaValue, completada: false };
    setArregloTareas([nuevaTarea, ...arregloTareas]);
    inputTarea.value = ''; 
  } else {
    console.log('El campo de tarea está vacío o contiene solo espacios en blanco.');
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter'){
    agregarTarea();
  }
}

const eliminarTareas = () => {
  const nuevoArreglo = arregloTareas.filter(item => !item.completada)
  setArregloTareas(nuevoArreglo)
}

const actualizarTarea = (id) => {
  const tareaActualizada = arregloTareas.find(item => item.id === id)
  tareaActualizada.completada = !tareaActualizada.completada
  setArregloTareas([...arregloTareas]) 
}

return(
    <div>
      <nav className='navbar'>
        <h1> To Do List</h1>
      </nav>
      <div className='input-container'>
      <input type='text' placeholder='Tarea nueva...' onKeyDown={handleKeyDown}/>
    <button onClick={agregarTarea}>Añadir Tarea</button>
    <button onClick={eliminarTareas}>Borrar completados</button>
    <ul>
      {
      arregloTareas.map (item => {
        return <li key={item.id}>
          <p onClick={() => actualizarTarea(item.id)}
          className={item.completada ? 'check' : ''}
          >{item.tarea}</p>
          </li>
      })
    }
    </ul>
    </div>
  </div> 
  )
}
