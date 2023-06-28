import { useState } from "react";
import ModalComponent from './Modal'
import { BiCalendar, BiEditAlt } from "react-icons/bi";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { uploadFile } from "../firebase";
import { getFirestore, collection, addDoc, doc, updateDoc, setDoc } from "firebase/firestore";


export const EditProfile = () => {
    const [name, setName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(""); // Estado para almacenar la URL de la foto

    const handleUpdateProfile = async () => {
        try {
            const user = auth.currentUser;

            if (photo) {
                // Cargar la imagen y obtener la URL
                const photoURL = await uploadFile(photo);
                setPhotoURL(photoURL); // Guardar la URL de la foto en el estado
            }

            // Actualizar el perfil con los datos modificados
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL, // Utiliza la prop photoURL recibida
            });

            // Guardar la URL de la foto en Firestore
            if (user) {
                const userRef = collection(db, 'users');
                const userDocRef = doc(userRef, user.uid);
                await setDoc(userDocRef, {
                    photoURL: photoURL
                });

                console.log("Perfil actualizado correctamente");
            }

        } catch (error) {
            console.log("Error al actualizar el perfil:", error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="px-4 py-2 mr-3 text-white bg-red-300 rounded shadow-lg hover:bg-slate-303" onClick={openModal}>
                <BiEditAlt />
                Editar perfil
            </button>
            <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
                {/* Contenido del modal */}
                <h1 className="pb-4 font-bold">Editar Perfil</h1>
                <div className="flex flex-col gap-2 mt-5 text-xs">
                    {/* Campos de edición */}
                    <label htmlFor="">Cambiar nombre</label>
                    <input type="text" className="border" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="">Actualizar correo</label>
                    <input type="text" className="border" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

                    <label htmlFor="">Agregar foto de perfil</label>
                    <input type="file" className="border" onChange={(e) => setPhoto(e.target.files[0])} />

                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type="date" className="border" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />

                    <button className="p-2 border rounded-md bg-sky-800 bg-opacity-20" onClick={handleUpdateProfile}>
                        Actualizar
                    </button>
                </div>
            </ModalComponent>
        </div>
    );
};
