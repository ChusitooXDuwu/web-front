
import { createContext, useContext, useState, FC, ReactNode } from "react";
import UserEntity from "../entities/UserEntity";

// Creamos un contexto vacío con los tipos adecuados
interface ProfileContextProps {
  profile: UserEntity;
  setProfile: (profile: UserEntity) => void;
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
    const mockUser: UserEntity = {
        givenName: "Armando",
        lastName: "Casas",
        email: "armando@example.com",
        gender: "M",
        favoriteSports: "Basketball",
        phoneNumber: "123-456-7890",
        imageUrl: "/assets/profile_ex.jpg",
        description: "Descripción de una persona...",
        since: "2009",
        friends: [],
        favoriteCourts: ["SUBA", "Usaquén"],
        sports: ["Basketball", "Tennis"],
        id: "1",
    };
  // Estado inicial con datos ficticios
  const [profile, setProfile] = useState<UserEntity>(mockUser);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
