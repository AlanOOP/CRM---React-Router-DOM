export const getCliente  = async () => {
    
    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL);
        const resultado = await respuesta.json();
        return resultado;
    }catch(error){
        console.log(error);
    }

}

export const getClienteById = async (id) => {
    
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
        const resultado = await respuesta.json();
        return resultado;
    }catch(error){
        console.log(error);
    }
}


export const addCliente = async (cliente) => {

    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resultado = await respuesta.json();
        return resultado;
    
    }catch(error){
        console.log(error);
    }

}

export const updateCliente = async (id , cliente) => {
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await respuesta.json();
        
    }catch(error){
        console.log(error);
    }
}

export const deleteCliente = async (id) => {
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method: 'DELETE'
        });
        await respuesta.json();
        
    }catch(error){
        console.log(error);
    }
}