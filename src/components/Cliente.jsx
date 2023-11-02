import React from 'react'
import { Form, useNavigate, redirect } from 'react-router-dom';
import { deleteCliente } from '../data/clientes';
import Swal from 'sweetalert2';

export const action = async ({params}) => {


  
  const r = await Swal.fire({
    title: "Estas seguro de eliminar este cliente?",
    text: "No podras revertir esto despues!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar!'
  })

  if (r.isConfirmed) {
      
    await deleteCliente(params.id);
      
  }

  
  
  return redirect('/');
}


const Cliente = ({cliente}) => {

  const navigate = useNavigate();
  
  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-2xl text-gray-800'> {nombre} {''}  </p>
        <p className=''> {empresa} </p>
      </td>

      <td className='p-6'>
        <p className='text-gray-600'>Email: <span className='text-gray-800 uppercase'>{email}</span></p>
        <p className='text-gray-600'>Tel: <span className='text-gray-800 uppercase'>{telefono}</span></p>
      </td>

      <td className='p-6 flex space-x-2 items-center justify-center'>

        <button
          type='button'
          className='flex justify-center items-center bg-yellow-500 py-4 px-4 w-1/2" text-white rounded text-xs uppercase font-bold hover:bg-yellow-600'
          onClick={ () => navigate (`/clientes/${id}/editar`)}
        >
          Editar
        </button>

        <Form
          method='post'
          action={ `/clientes/${id}/eliminar`  }  
           
        >

          <button
            type='submit'
            className='flex justify-center items-center bg-red-600 py-4 px-2 w-full text-white rounded text-xs uppercase font-bold hover:bg-red-800'
          >
            Eliminar
          </button>

        </Form>
      
      </td>
    </tr>
  )
}

export default Cliente