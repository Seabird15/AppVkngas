import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { format, getDay } from 'date-fns';
import { es } from 'date-fns/locale'
import { BiCalendar, BiEditAlt, } from "react-icons/bi";


import { Entrenos } from "./Entrenos";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

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

    const formatDate = (fecha) => {
        const date = new Date(fecha);
        const dayName = format(date, 'EEEE', { locale: es });
        const formattedDate = format(date, 'dd/MM/yyyy');
        const hour = format(date, 'HH:mm');
        return `${dayName}, ${formattedDate} - ${hour}`;
    };

    const handleEventoClick = (evento) => {
        setEventoSeleccionado(evento);
    };

    return (
        <>
            <span className="flex justify-center mt-2"><BiCalendar /></span>
            <h4 className="my-2 font-semibold text-center ">Próximos Eventos:</h4>

            <div className="grid grid-cols-1 md:grid md:grid-cols-3">
                {eventos.map((evento) => (
                    <div key={evento.id} className="p-2 m-2 text-xs bg-white border rounded-sm shadow-md ">
                        <label className="font-bold">Actividad</label>
                        <h2>{evento.tituloEvent}</h2>
                        <label className="font-bold">Lugar</label>
                        <p>{evento.lugarEvent}</p>
                        <label className="font-bold">Fecha</label>
                        <p>{formatDate(evento.fechaEvent)}</p>
                        <label className="font-bold">Detalles</label>
                        <p>{evento.descrEvent}</p>
                        <Entrenos
                            eventoSeleccionado={eventoSeleccionado}
                            handleEventoClick={handleEventoClick}
                            evento={evento} // Pasa el evento actual como prop al componente Entrenos
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
