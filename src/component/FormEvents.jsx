import { useState } from 'react'
import { db } from '../firebase'; // Asegúrate de tener esta importación correcta
import { collection, addDoc } from 'firebase/firestore'; // Importa collection y addDoc

import ModalComponent from './Modal'


export const FormEvents = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    //Recuperar datos del form
    const [evento, setEvento] = useState({
        tituloEvent: '',
        lugarEvent: '',
        fechaEvent: '',
        descrEvent: '',
    })

    //Evento handleChange donde se recuperaran los datos ingresados por el usuario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEvento((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    //Funcion del boton registrar eventos
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(evento)
        //Enviar datos a firebase
        try {
            const eventosCollectionRef = collection(db, 'eventos');
            await addDoc(eventosCollectionRef, evento);
            console.log('Evento guardado en Firestore');
            closeModal();
            fetchEventos();
            // Aquí puedes realizar cualquier acción adicional después de guardar los datos en Firestore
        } catch (error) {
            console.error('Error al guardar el evento en Firestore:', error);
        }
    }

    return (
        <>
            <button className='w-full p-2 bg-green-200 rounded-md shadow-lg' onClick={openModal}>Agendar Entrenamiento</button>
            <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
                <div>
                    <button className='float-right' onClick={closeModal}>&#215;</button>
                    <h1 className='text-red-600'>Agendar Entrenamiento</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label>Titulo</label>
                            <input type="text" className='bg-slate-200 rounded-3' name='tituloEvent' id='tituloEvent' value={evento.tituloEvent} onChange={handleChange} />
                            <label>Lugar</label>
                            <input type="text" className='bg-slate-200 rounded-3' name='lugarEvent' id='lugarEvent' value={evento.lugarEvent} onChange={handleChange} />
                            <label>Fecha</label>
                            <input type="datetime-local" className='bg-slate-200 rounded-3' name='fechaEvent' id='fechaEvent' value={evento.fechaEvent} onChange={handleChange} />
                            <label>Comentarios</label>
                            <textarea className='bg-slate-200 rounded-3' cols="20" rows="5" name='descrEvent' id="descrEvent" value={evento.descrEvent} onChange={handleChange}></textarea>
                            <button type='submit' className='p-2 mt-4 bg-green-400 rounded-md shadow-lg' onClick={handleSubmit}>Agendar</button>
                        </div>
                    </form>
                </div>

            </ModalComponent>
        </>
    )
}
