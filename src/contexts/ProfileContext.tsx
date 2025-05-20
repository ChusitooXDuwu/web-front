import { createContext, useContext, useState, FC, ReactNode } from "react";
import UserEntity from "../entities/user/UserEntity";
import { useQuery } from "@tanstack/react-query";
import { requestMyProfile } from "../services/UserService/UserService";

// Creamos un contexto vacío con los tipos adecuados
interface ProfileContextProps {
  profile: UserEntity | null;
  refetch: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

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

  const { data: profileData, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => requestMyProfile(),
    staleTime: Infinity,
    retry: 1,
  });

  return (
    <ProfileContext.Provider
      value={{ profile: profileData?.data || null, refetch }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
