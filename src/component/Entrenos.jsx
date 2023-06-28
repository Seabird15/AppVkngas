import { addDoc, collection, serverTimestamp, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import ModalComponent from './Modal'

export const Entrenos = ({ eventoSeleccionado, handleEventoClick, evento }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [asistentes, setAsistentes] = useState([]);
    const [noAsisten, setNoAsisten] = useState([]);

    useEffect(() => {
        if (eventoSeleccionado) {
            console.log("ID del evento seleccionado:", eventoSeleccionado.id);
            fetchAsistentes();
            fetchNoAsistentes();
        }
    }, [eventoSeleccionado]);

    const fetchAsistentes = async () => {
        try {
            const asistentesCollectionRef = collection(
                db,
                "eventos",
                eventoSeleccionado.id,
                "asistentes"
            );
            const asistentesSnapshot = await getDocs(asistentesCollectionRef);

            const asistentesData = [];
            asistentesSnapshot.forEach((doc) => {
                const asistente = doc.data();
                if (typeof asistente.nombre === "string") {
                    asistentesData.push(asistente.nombre);
                }
            });

            setAsistentes(asistentesData);
        } catch (error) {
            console.error("Error al obtener los asistentes al evento", error);
        }
    };

    const obtenerCorreo = (asistente) => {
        const usuario = auth.currentUser;
        return usuario.displayName || usuario.email || "Correo no disponible";
    }

    const confirmarAsistencia = async () => {
        try {
            const usuario = auth.currentUser;
            const nombreUsuario = usuario.displayName || "NombreUsuario";
            const eventoDocRef = doc(db, "eventos", eventoSeleccionado.id);
            const asistentesCollectionRef = collection(db, "eventos", eventoSeleccionado.id, "asistentes");

            await addDoc(asistentesCollectionRef, {
                nombre: nombreUsuario
            });


            fetchAsistentes(); // Actualizar lista de asistentes y no asistentes
        } catch (error) {
            console.error("Error al confirmar la asistencia", error);
        }
    };
    const fetchNoAsistentes = async () => {
        try {
            const noAsistenCollectionRef = collection(
                db,
                "eventos",
                eventoSeleccionado.id,
                "noAsisten"
            );
            const noAsistenSnapshot = await getDocs(noAsistenCollectionRef);

            const noAsistenData = [];
            noAsistenSnapshot.forEach((doc) => {
                const noAsistente = doc.data();
                if (typeof noAsistente.nombre === "string") {
                    noAsistenData.push(noAsistente.nombre);
                }
            });

            setNoAsisten(noAsistenData);
            console.log(noAsisten)
        } catch (error) {
            console.error("Error al obtener los no asistentes al evento", error);
        }
    };

    const darseDeBaja = async () => {
        try {
            const usuario = auth.currentUser;
            const nombreUsuario = usuario.displayName || usuario.email;
            const eventoDocRef = doc(db, "eventos", eventoSeleccionado.id);
            const noAsistenCollectionRef = collection(
                eventoDocRef,
                "noAsisten"
            );

            await addDoc(noAsistenCollectionRef, {
                nombre: nombreUsuario
            });
            fetchAsistentes(); // Actualizar lista de asistentes
            fetchNoAsistentes(); // Actualizar lista de no asistentes
        } catch (error) {
            console.error("Error al darse de baja", error);
        }
    };




    const openModal = () => {
        setIsModalOpen(true);
        handleEventoClick(evento); // Llamar a la función handleEventoClick aquí si es necesario
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="p-2 border rounded-md shadow-md bg-amber-400" onClick={openModal}>
                Ir
            </button>
            <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
                <div>
                    <button className="float-right" onClick={closeModal}>
                        &#215;
                    </button>
                    {eventoSeleccionado && (
                        <div className="p-2 shadow-md">
                            <label className="font-bold">Actividad</label>
                            <h2>{eventoSeleccionado.tituloEvent}</h2>
                            <label className="font-bold">Lugar</label>
                            <p>{eventoSeleccionado.lugarEvent}</p>
                            <label className="font-bold">Fecha</label>
                            <p>{eventoSeleccionado.fechaEvent}</p>
                            <label className="font-bold">Detalles</label>
                            <p>{eventoSeleccionado.descrEvent}</p>
                            {/* Mostrar otros detalles del evento */}
                        </div>
                    )}
                    <div className="flex justify-center gap-2 mt-6 text-left">
                        <button className="px-1 text-xs text-white bg-green-400 rounded-md shadow-md" onClick={confirmarAsistencia}>
                            Confirmar asistencia
                        </button>
                        <button className="px-2 text-xs text-white bg-red-600 rounded-md shadow-md" onClick={darseDeBaja}>
                            Darse de baja
                        </button>
                    </div>
                    <div className="p-2 mt-4 text-xs border rounded-2xl">
                        <p className="font-bold">Asistentes:</p>
                        {asistentes.map((asistente, index) => (
                            <p key={index}>{asistente || obtenerCorreo(asistente)}</p>
                        ))}
                    </div>

                    <div className="p-2 mt-4 text-xs border rounded-2xl">
                        <p className="font-bold">No asistente:</p>
                        {noAsisten.map((nombre, index) => (
                            <p key={index}>{nombre}</p>
                        ))}

                    </div>
                </div>
            </ModalComponent>
        </div>
    );
};

export default Entrenos;
