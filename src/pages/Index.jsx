import React from 'react';
import { getCliente } from '../data/clientes';
import { useLoaderData } from 'react-router-dom';

import Cliente from '../components/Cliente';

export function loader() {
  const data = getCliente();
  return data ;
}

const Index = () => {

  const data = useLoaderData();


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      {
        data.length > 0 ? (
          <table className='w-full bg-white shadow mt-5 relative overflow-x-auto'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='p-2'>Cliente</th>
                <th className='p-2'>Contacto</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>

              <tbody className='text-center'>
                {data.map( cliente => (
                  <Cliente
                    key={cliente.id}
                    cliente={cliente}
                  />  
                ))}
              </tbody>

          </table>
          
        ) 
        
        :(
          <p className='text-center mt-10'>No hay clientes aún</p>
        )
      
      }
    </>
  )
}

export default Index