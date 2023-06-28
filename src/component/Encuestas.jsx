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

    const closeModal = () => {
        setMostrarModal(false)
    }

    const handleAgregarEncuesta = async () => {
        try {
            await agregarEncuesta({
                titulo,
                descripcion,
            });

            // Limpiar los campos del formulario
            setTitulo('');
            setDescripcion('');
            // Cerrar el modal
            setMostrarModal(false);
        } catch (error) {
            console.error('Error al agregar la encuesta', error);
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
                            <button type="button" className='p-1 bg-green-200 rounded-full shadow-md' onClick={handleAgregarEncuesta}>
                                Guardar Encuesta
                            </button>
                        </form>
                    </div>
                )}

                {/* Listado de encuestas */}
                {encuestas &&
                    encuestas.map((encuesta) => (
                        <div key={encuesta.id}>
                            <h3>{encuesta.titulo}</h3>
                            <p>{encuesta.descripcion}</p>
                        </div>
                    ))}
            </div>
            <StickyBar />
        </>
    );
};
