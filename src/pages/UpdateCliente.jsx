import React from 'react';

import { getClienteById, updateCliente } from '../data/clientes';
import { useLoaderData ,useNavigate, Form, useActionData , redirect} from 'react-router-dom';

import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({params, fetch}) {

    const cliente = await getClienteById(params.id, fetch);

    if(Object.values(cliente).length === 0) {
        throw new Response ('Not found', {
            status: 404,
            statusText: 'Cliente no encontrado'
        });
    }

    return cliente;
}

export async function action({request, params}) {

    const formData = await request.formData();

  const datos = Object.fromEntries(formData.entries());



  const email = datos.email.trim();

  //  console.log(datos);

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  

  const errores = [];

  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios');
  }

  if (!regex.test(email)) {
    errores.push('El email no es valido');
  }

  //retornar datos si hay errores

  if (Object.keys(errores).length) {
    return errores;
  }

  await updateCliente(params.id,datos);



  return redirect('/');
}

const UpdateCliente = () => {

    const errores = useActionData();

    const navigate = useNavigate();
    const data = useLoaderData();


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Llene todos los campos para registrar un nuevo cliente</p>

      <div className='flex justify-end mt-5'>

        <button
          className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => navigate(-1)}
        >
          Volver
        </button>

      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>
        
        {
          errores?.length && (
            
            errores.map( (error, index) => (
              <Error
                key={index}
              >
                {error}
              </Error>
            ))

          ) 
        }
        
        <Form 
          method='post'
          noValidate
        >
         
          <Formulario
            cliente={data}
          />

          <input 
            type="submit" 
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 rounded cursor-pointer'
            value={'Guardar Cambios'}
          />
        </Form>

      </div>
    </>
  )
}

export default UpdateCliente