import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, agregarEncuesta } from '../firebase';
import { collection } from "firebase/firestore";
import { StickyBar } from './StickyBar';


export const Encuestas = () => {
    const encuestasRef = collection(db, 'encuestas');
    const [encuestas] = useCollectionData(encuestasRef, { idField: 'id' });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [opciones, setOpciones] = useState([]); // Estado para las opciones de la encuesta
    const [nuevaOpcion, setNuevaOpcion] = useState(''); // Estado para la nueva opción ingresada

    const closeModal = () => {
        setMostrarModal(false)
    }

    const handleAgregarEncuesta = async () => {
        try {
            await agregarEncuesta({
                titulo,
                descripcion,
                opciones,
            });

            // Limpiar los campos del formulario
            setTitulo('');
            setDescripcion('');
            setOpciones([]);
            // Cerrar el modal
            setMostrarModal(false);
        } catch (error) {
            console.error('Error al agregar la encuesta', error);
        }
    };

    //Funcion para agregar opciones
    const agregarOpcion = () => {
        if (nuevaOpcion.trim() !== '') {
            setOpciones([...opciones, nuevaOpcion]);
            setNuevaOpcion('');
        }
    }

    const handleVotar = async (encuestaId, opcionIndex) => {
        try {
            const encuestaDocRef = doc(db, 'encuestas', encuestaId);
            await updateDoc(encuestaDocRef, {
                [`opciones.${opcionIndex}.votos`]: increment(1),
            });
            console.log('Voto registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar el voto:', error);
        }
    };

    return (
        <>
            <div className='h-full'>
                <h1 className='py-4 text-2xl tracking-wider text-center'>Encuestas</h1>

                {/* Botón para abrir el modal */}
                <div className='flex justify-center'>
                    <button className='p-2 bg-green-300 rounded-full shadow-md' onClick={() => setMostrarModal(true)}>Crear Encuesta</button>
                </div>

                {/* Modal de creación de encuestas */}
                {mostrarModal && (
                    <div className='p-4 m-2 mt-5 bg-white rounded-sm shadow-sm'>
                        <button className='float-right' onClick={closeModal}>&#215;</button>
                        <h2>Crear Nueva Encuesta</h2>
                        <form className='flex flex-col gap-2 mt-4'>
                            <input
                                type="text"
                                className='shadow-sm'
                                placeholder="Título"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <textarea
                                placeholder="Descripción"
                                className='shadow-sm'
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                            <input
                                type="text"
                                className='shadow-sm'
                                placeholder='Agregar opción'
                                value={nuevaOpcion}
                                onChange={(e) => setNuevaOpcion(e.target.value)} />
                            <button
                                type="button"
                                className='p-1 bg-green-200 rounded-full shadow-md'
                                onClick={agregarOpcion}
                            >
                                Agregar opción
                            </button>



                            {/* Mostrar las opciones ingresadas */}
                            {opciones.map((opcion, index) => (
                                <div key={index}>{opcion}</div>
                            ))}
                            <button type="button" className='p-1 bg-green-200 rounded-full shadow-md' onClick={handleAgregarEncuesta}>
                                Guardar Encuesta
                            </button>
                        </form>
                    </div>
                )}

                {/* Listado de encuestas */}
                {encuestas &&
                    encuestas.map((encuesta) => (
                        <div className='m-2 bg-white' key={encuesta.id}>
                            <h3>{encuesta.titulo}</h3>
                            <p>{encuesta.descripcion}</p>
                            <p>{encuesta.opciones}</p>

                        </div>
                    ))}


            </div>
            <StickyBar />
        </>
    );
};
