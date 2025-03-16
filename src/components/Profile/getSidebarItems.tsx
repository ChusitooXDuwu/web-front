export const getSidebarItems = (isOwner: boolean, page: string) => {
    
      // Ruta base para los elementos de la sidebar en la página de perfil
      const profileBasePath = "/profile";
       
      const baseItems = [{ label: "Historial Partidos", path: `${profileBasePath}/history`, id:"history" }];
    ;
  
    // Elementos que solo aparecen si es el dueño del perfil
    const ownerItems = isOwner
      ? [
          { label: "Mi Perfil", path: "/profile" , id:"profile"},
          { label: "Notificaciones",  path: `${profileBasePath}/notifications`, id:"notifications"},
          { label: "Mis estadísticas",  path: `${profileBasePath}/statistics`,id:"statistics"},
          { label: "Mis grupos", path: "/groups",id:"groups" },
        ]
      : [{ label: "Estadísticas", path: `${profileBasePath}/statistics`, id:"statistics"}, { label: "Perfil", path: "/profile", id:"profile" },];
  
    // Unir los elementos base + los condicionales
    let sidebarItems = [ ...ownerItems,...baseItems];
    console.log(`/${page}`)
    sidebarItems = sidebarItems.filter((item) => !item.id.includes(page));

    // Reemplazar el primer elemento si la página no es "perfil"
    return sidebarItems ;
  };
  