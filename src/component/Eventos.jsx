import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    const fetchEventos = async () => {
        try {
            const eventosCollectionRef = collection(db, 'eventos');
            const querySnapshot = await getDocs(eventosCollectionRef);
            const eventosData = [];
            querySnapshot.forEach((doc) => {
                eventosData.push({ id: doc.id, ...doc.data() });
            });
            setEventos(eventosData);
        } catch (error) {
            console.error('Error al obtener la información', error);
        }
    }

    useEffect(() => {
        fetchEventos();
    }, [])

    return (
        <div>
            <h4 className="my-2 text-center">Próximos Eventos</h4>
            {eventos.map((evento) => (
                <div key={evento.id} className="p-2 m-2 border">
                    <label className="font-bold">Actividad</label>
                    <h2>{evento.tituloEvent}</h2>
                    <label className="font-bold">Lugar</label>
                    <p>{evento.lugarEvent}</p>
                    <label className="font-bold">Fecha</label>
                    <p>{evento.fechaEvent}</p>
                    <label className="font-bold">Detalles</label>
                    <p>{evento.descrEvent}</p>
                    <button className="p-2 border rounded-md shadow-md bg-amber-400">Ir</button>

                </div>

            ))}
        </div>
    )
}