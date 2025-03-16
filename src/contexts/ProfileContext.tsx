
import { createContext, useContext, useState, FC, ReactNode } from "react";
import { UserProfile } from "../entities/UserProfileEntity"; // Importamos la interfaz que creamos

// Creamos un contexto vacío con los tipos adecuados
interface ProfileContextProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile debe usarse dentro de ProfileProvider");
  }
  return context;
};

// Componente Provider para envolver la aplicación
export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Estado inicial con datos ficticios
  const [profile, setProfile] = useState<UserProfile>({
    name: "Armando Paredes",
    email: "armando@example.com",
    gender: "Male",
    favorite_sports: "Basketball",
    phone_number: "123-456-7890",
    image_url: "/assets/profile_ex.jpg",
    description: "Descripción de una persona...",
    since: "2009",
    friends: ["Ernesto Pérez", "Carlos López","Hola"],
    favoriteCourts: ["SUBA", "Usaquén"],
    sports: ["Basketball", "Tennis"],
    id: "1"
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
