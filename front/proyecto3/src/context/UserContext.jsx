/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

// CONTEXTO
export const UsersContext = createContext({
  role: null,
  user: null,
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  logout: () => {},
  renderAppointments: async () => {},
  createAppointment: async () => {},
  addAppointment: () => {},
  cancelAppointment: async () => {},
});

// PROVIDER
export const UsersProvider = ({ children }) => {
  
  // 🔥 Guardamos ROLE como principal
  const storedRole = localStorage.getItem("role");
  const storedUser = localStorage.getItem("user");

  const [role, setRole] = useState(storedRole ?? null);
  const [user, setUser] = useState(
    storedUser && !isNaN(Number(storedUser)) ? Number(storedUser) : null
  );

  const [userAppointments, setUserAppointments] = useState([]);

  // REGISTER
  const registerUser = async (userData) => {
    return await axiosInstance.post("/users/register", userData);
  };

  // LOGIN (UNIFICADO)
  const loginUser = async (loginData) => {
    try {
      const res = await axiosInstance.post("/users/login", loginData);

      // Guardamos role SIEMPRE
      localStorage.setItem("role", res.data.role);
      setRole(res.data.role);

      // Usuario normal → guardamos ID
      if (res.data.role === "user") {
        localStorage.setItem("user", res.data.user.id);
        setUser(res.data.user.id);
      } else {
        // Admin → NO usa userId
        localStorage.removeItem("user");
        setUser(null);
      }

      return res;
    } catch (error) {
      console.error("ERROR EN CONTEXT LOGINUSER:", error);
      throw error;
    }
  };

  // LOGOUT unificado
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
  };

  // Cargar turnos (solo user real)
  const renderAppointments = async (userId) => {
    if (!userId || isNaN(Number(userId))) return;

    try {
      const { data } = await axiosInstance.get(`/users/id/${userId}`);
      setUserAppointments(data.user.appointments || []);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const createAppointment = async (appointmentData) => {
    await axiosInstance.post("/appointments/schedule", appointmentData);
  };

  const addAppointment = (newAppointment) => {
    setUserAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axiosInstance.put(`/appointments/cancel/${appointmentId}`);
      const updated = userAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "cancelled" }
          : appointment
      );
      setUserAppointments(updated);
    } catch (error) {
      console.error("Error al cancelar la reserva", error);
    }
  };

  const value = {
    role,
    setRole,
    user,
    setUser,
    userAppointments,
    registerUser,
    loginUser,
    logout,
    renderAppointments,
    createAppointment,
    addAppointment,
    cancelAppointment,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
