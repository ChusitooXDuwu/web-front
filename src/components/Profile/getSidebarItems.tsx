import { IntlShape } from "react-intl";

export const GetSidebarItems = (isOwner: boolean, page: string,formatMessage: IntlShape["formatMessage"]) => {

      // Ruta base para los elementos de la sidebar en la página de perfil
      const profileBasePath = "/profile";
       
      const baseItems = [{ label: formatMessage({id:"profile.sidebar.history"}), path: `${profileBasePath}/history`, id:"history" }];
    ;
    console.log(page,"pagina")
    // Elementos que solo aparecen si es el dueño del perfil
    const ownerItems = isOwner
      ? [
          { label: formatMessage({id:"profile.sidebar.myprofile"}), path: "/profile" , id:"profile"},
          { label: formatMessage({id:"profile.sidebar.notification"}),  path: `${profileBasePath}/notifications`, id:"notifications"},
          { label: formatMessage({id:"profile.sidebar.stats.mine"}),  path: `${profileBasePath}/statistics`,id:"statistics"},
         
        ]
      : [{ label: formatMessage({id:"profile.sidebar.stats.not.mine"}), path: `${profileBasePath}/statistics`, id:"statistics"}, { label: formatMessage({id:"profile.sidebar.profile"}), path: "/profile", id:"profile" },];
  
    // Unir los elementos base + los condicionales
    let sidebarItems = [ ...ownerItems,...baseItems];
    console.log(`/${page}`)
    sidebarItems = sidebarItems.filter((item) => !item.id.includes(page));

    // Reemplazar el primer elemento si la página no es "perfil"
    return sidebarItems ;
  };
  