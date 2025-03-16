export const getSidebarItems = (isOwner: boolean, page: string) => {
    
    // Elementos base que siempre aparecen
    const baseItems = [
      { label: "Historial Partidos", path: "/history" },
          
    ];
  
    // Elementos que solo aparecen si es el dueño del perfil
    const ownerItems = isOwner
      ? [
          { label: "Mi Perfil", path: "/profile" },
          { label: "Notificaciones", path: "/notifications" },
          { label: "Mis estadísticas", path: "/statistics" },
          { label: "Mis grupos", path: "/groups" },
        ]
      : [{ label: "Estadísticas", path: "/statistics" },
      ];
  
    // Unir los elementos base + los condicionales
    let sidebarItems = [ ...ownerItems,...baseItems];
    console.log(`/${page}`)
    sidebarItems = sidebarItems.filter((item) => !item.path.includes(page));

    // Reemplazar el primer elemento si la página no es "perfil"
    return sidebarItems ;
  };
  