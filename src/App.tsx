import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginView from "./views/LoginView/LoginView";
import MainView from "./views/MainView/MainView";
import BookingsPage from "./pages/BookingsPage/BookingsPage";
import FieldsPage from "./pages/FieldsPage/FieldsPage";
import SportsPage from "./pages/SportsPage/SportsPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import CreateFieldPage from "./pages/CreateFieldPage/CreateFieldPage";
import CreateBookingPage from "./pages/CreateBookingPage/CreateBookingPage";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import FieldDetailPage from "./pages/FieldDetailPage/FieldDetailPage";
import BookingDetailPage from "./pages/BookingDetailPage/BookingDetailPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FieldDetailPageMap from "./pages/FieldDetailPageMap/FieldDetailPageMap";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import {
  LocaleContext,
  SupportedLocale,
  defaultLocale,
  getMessages,
} from "./contexts/LocaleContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import ProfileContent from "./pages/ProfilePage/ProfilePage_Components/ProfileContent";
import { Translations } from "./types/Translations";
const queryClient = new QueryClient();
interface LocaleData {
  locale: SupportedLocale;
  messages: Translations;
}

function App() {
  const [localeData, setLocaleData] = useState<LocaleData>({
    locale: defaultLocale,
    messages: getMessages(defaultLocale),
  });
  const changeLocale = (newLocale: SupportedLocale) => {
    console.log(`Trying to change locale to: ${newLocale}`);
    setLocaleData({ locale: newLocale, messages: getMessages(newLocale) });
  };
  return (
    <LocaleContext.Provider value={{ locale: localeData.locale, changeLocale }}>
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={localeData.locale}
        messages={{ ...localeData.messages }}
      >
        <QueryClientProvider client={queryClient}>
          <ProfileProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainView />}>
                  <Route index element={<Navigate to="/login" />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="bookings" element={<BookingsPage />} />
                  <Route path="fields" element={<FieldsPage />} />
                  <Route path="sports" element={<SportsPage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route
                    path="profile/*"
                    element={<ProfilePage isOwner={true} />}
                  >
                    <Route index element={<ProfileContent />} />
                    <Route path="history" element={<HistoryPage />} />
                    <Route
                      path="notifications"
                      element={<NotificationsPage />}
                    />
                    <Route path="statistics" element={<StatisticsPage />} />
                  </Route>
                  <Route path="groups" element={<GroupsPage />} />
                  <Route path="fields/create" element={<CreateFieldPage />} />
                  <Route
                    path="bookings/create"
                    element={<CreateBookingPage />}
                  />
                  <Route path="events/:id" element={<EventDetailPage />} />
                  <Route path="events/create" element={<CreateEventPage />} />
                  <Route path="fields/:id" element={<FieldDetailPage />} />
                  <Route
                    path="fields/map/:id"
                    element={<FieldDetailPageMap />}
                  />
                  <Route path="bookings/:id" element={<BookingDetailPage />} />
                </Route>
                <Route path="/" element={<LoginView />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  <Route path="landing" element={<LandingPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </ProfileProvider>
        </QueryClientProvider>
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
export default App;
