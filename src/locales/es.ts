import { Translations } from "../types/Translations";

const en: Translations = {
  email: "Correo Electrónico",
  emailPlaceholder: "Ingrese su correo electrónico",
  password: "Contraseña",
  passwordPlaceholder: "Ingrese su contraseña",
  login: "Ingresar",
  signup: "Registrarse",
  newInSporthub: "¿Nuevo en Sporthub?",
  registerHere: "Regístrese Aquí",
  areYouAMember: "¿Eres miembro de Sporthub?",
  "login.error.credentials":
    "Correo o contraseña inválidos. Por favor intente nuevamente.",
  // Pages
  "pages.home": "Inicio",
  "pages.bookings": "Reservas",
  "pages.fields": "Canchas",
  "pages.fields.create": "Crear Cancha",
  "pages.sports": "Deportes",
  "pages.events": "Eventos",
  "pages.users": "Usuarios",
  // Forms
  "form.placeholder.name": "Ingrese su nombre",
  "form.placeholder.email": "Ingrese su correo",
  "form.placeholder.password": "Ingrese su contraseña",
  "form.placeholder.phone": "Ingrese su teléfono",
  "form.placeholder.birthdate": "Ingrese su fecha de nacimiento",
  "form.placeholder.search": "Buscar",
  "form.placeholder.givenName": "Ingrese su primer nombre",
  "form.placeholder.lastName": "Ingrese su apellido",
  "form.placeholder.description": "Ingrese una descripción",
  "form.label.name": "Nombre",
  "form.label.email": "Correo",
  "form.label.password": "Contraseña",
  "form.label.phone": "Teléfono",
  "form.label.birthdate": "Fecha de nacimiento",
  "form.label.givenName": "Primer Nombre",
  "form.label.lastName": "Apellido",
  "form.label.gender": "Género",
  "form.label.isOwner": "¿Es propietario?",
  "form.label.description": "Descripción",
  "form.gender.select": "Seleccione una opción",
  "form.gender.male": "Masculino",
  "form.gender.female": "Femenino",
  "form.gender.other": "Otro",
  // Home
  "home.title.upcoming": "Mis próximos partidos",
  "home.title.available": "Partidos disponibles",
  "home.link.bookings": "Ver todas",
  "home.link.totalBookings": "Tiene un total de {bookings} reservas",
  "home.noData": "No se encontraron {dataName}. Intenta ",
  "home.data.upcomingEvents": "partidos próximos",
  "home.prompt.addEvent": "agregar un partido",
  "home.data.availableEvents": "partidos disponibles",
  "home.prompt.searchEvent": "buscar un partido",
  // Bookings
  "bookings.title": "Mis Reservas",
  "bookings.nodata": "No has realizado reservas",
  // Booking detail
  "booking.untilTime": "Hasta las {time}",
  "booking.place": "Lugar",
  "booking.seeDetail": "Ver detalle",
  "bookingDetailPage.loading": "Cargando ...",
  "bookingDetailPage.loading.details": "Cargando detalles de la reserva...",
  // Fields
  "fields.title": "Canchas disponibles",
  "fields.createButton": "Crear cancha",
  "fields.dataNotFound": "No se encontraron datos para la búsqueda ' {value} '",
  "fieldDetailPageMap.loading.details": "Cargando mapa del campo...",
  "fieldDetailCard.details.sports": "Deportes:",
  // Create Field
  "fields.create.title": "Crear una nueva cancha",
  "field.form.label.name": "Nombre",
  "field.form.placeholder.name": "Ingrese el nombre del establecimiento",
  "field.form.label.city": "Ciudad",
  "field.form.choice": "Seleccione una opción",
  "field.form.label.address": "Dirección",
  "field.form.placeholder.address": "Ingrese la dirección",
  "field.form.label.price": "Precio",
  "field.form.placeholder.price": "Ingrese el precio",
  "field.form.label.sports": "Deportes",
  "field.form.label.photos": "Fotos del establecimiento",
  "field.form.submit": "Crear Cancha",
  // Profile sideBar
  "profile.sidebar.notification": "Notificaciones",
  "profile.sidebar.stats.mine": "Mis Estadísticas",
  "profile.sidebar.stats.not.mine": "Estadísticas",
  "profile.sidebar.history": "Historial Partidos",
  "profile.sidebar.logout": "Cerrar Sesión",
  "profile.sidebar.goback": "Volver",
  "profile.sidebar.myprofile": "Mi perfil",
  "profile.sidebar.profile": "Perfil",
  // Profile Content Sport Lists
  "profile.content.sportList": "Mis Deportes",
  // Profile Content My friends
  "profile.content.friendList.friends": "Mis Amigos",
  "profile.content.friendList.addfriends": "Agregar Amigo",
  // Profile Content favoriteCourts
  "profile.content.favoriteCourts": "Mis Canchas Favoritas",
  // Profile Content aboutme
  "profile.content.aboutme": "Sobre mí",
  "profile.content.aboutme.since": "Jugador desde",
  "profile.content.aboutme.email": "Correo",
  "profile.content.aboutme.phone": "Teléfono",
  "profile.content.aboutme.gender": "Género",
  // Profile Notification
  "profile.notifications": "Notificaciones",
  "profile.notifications.none": "No hay notificaciones.",
  // Profile History
  "profile.history": "Historial de Eventos",
  "profile.history.in": "en",
  "profile.history.location": "Ubicación",
  "profile.history.date": "Fecha",
  "profile.history.Players": "Jugadores",
  // Profile Statistics
  "profile.statistics": "Estadísticas Generales",
  "profile.statistics.total": "Total Partidos Jugados",
  "profile.statistics.court": "Canchas más populares",
  "profile.statistics.player": "Ha jugado más con ",
  "profile.statistics.loading": "Cargando Estadísticas",
  // Navbar component
  "navbar.bookings": "Mis Reservas",
  "navbar.fields": "Canchas",
  "navbar.sports": "Deportes",
  "navbar.events": "Eventos",
  "navbar.profile": "Perfil",
  "navbar.searchButton": "Buscar",
  "navbar.searchPlaceholder": "Busca Canchas, Deportes o Reservas",
  // SportCard
  "sportCard.availableFields": "Campos disponibles",
  "sportCard.availableBookings": "Reservas disponibles",
  // SportsPage
  "sportsPage.title": "Deportes",
  // DetailsPage
  "eventDetailPage.participants": "Participantes",
  "eventDetailPage.sport": "Deporte",
  "eventDetailPage.loading.details": "Cargando detalles de la reserva...",
  "eventDetailPage.events": "Eventos disponibles",
  // FieldDetailCard
  "fieldDetailCard.event_title": "Evento en la cancha : ",
  "fieldDetailCard.setOccupied.notOccupied": "No ocupada 😀",
  "fieldDetailCard.setOccupied.Occupied": "Ocupada 🥲",
  "fieldDetailCard.details": "Detalles de la cancha",
  "fieldDetailCard.details.seeInMap": "Ver en mapa",
  "fieldDetailCard.details.openingHours": "Horarios:",
  "fieldDetailCard.details.contact": "Contacto:",
  "fieldDetailCard.details.isOcuppiedQuestion": "¿Cancha ocupada?:",
  "fieldDetailCard.details.price": "Precio:",
  "fieldDetailCard.details.availableBookings":
    "Partidos disponibles en esta cancha:",

  "fieldDetailPage.loading.details": "Cargando detalles del campo...",
  "fieldDetailPage.price": "Precio: $",
  "fieldDetailPage.divide": "Dividir precio entre jugadores",
  "fieldDetailPage.payment": "Selecciona cómo deseas pagar",
  // fieldDetailButtons
  "fieldDetailButtons.book": "Crear una reserva",
  "fieldDetailButtons.cancel": "Cancelar reserva",
  "fieldDetailButtons.join": "Unirse a la reserva",
  "fieldDetailButtons.createEvent": "Crear Evento",
  // Cancel&CommentsButton
  "cancelAndCommentsButton.cancel": "Cancelar",
  "cancelAndCommentsButton.addComment": "Agregar comentario",
  "fieldDetailCard.commentForm.writeComment": "Deja tu comentario",
  "fieldDetailCard.commentForm.sendComment": "Subir",
  "alert.comment": "Tu comentario fue subido",
  // MapView
  "mapView.mapfrom": "Mapa de",
  // GameCardComponent
  "game.first": "Sé el primero en inscribirte",
  "game.cupos": "Cupos",
  "game.fecha": "Fecha: ",
  "game.time": "Hora: ",
  "game.lleno": "Partido Lleno",
  "game.sub": "Inscribirme",
  // EventForm
  "event.alert": "Reserva creada",
  "event.form.label.fecha": "Seleccione fecha y hora de la reserva",
  "event.form.label.cantidadJugadores": "Seleccione la cantidad de jugadores",
  "event.form.submit": "Reservar",
  // FieldsFilter
  "field.soccer": "Fútbol",
  "field.basket": "Baloncesto",
  "field.tennis": "Tenis",
  "field.volley": "Voleibol",
  "field.todos": "Todos",
  // payments
  "pages.eventsall": "Eventos disponibles",
  "pages.price": "Precio: $",

  // friends modal
  "friends.modal.title": "Agregar amigo",
  "friends.modal.search-label": "Buscar usuario",
  "friends.modal.search-placeholders": "Juan Pérez",
  // sports modal
  "sports.modal.title": "Agregar un deporte favorito",

  // browse
  "browse.fields": "Buscar canchas",
  "browse.sports": "Buscar deportes",
};

export default en;
