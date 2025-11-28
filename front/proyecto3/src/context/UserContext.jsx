/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

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

export const UsersProvider = ({ children }) => {

  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);

  // 🔥 Cargar localStorage SOLO en cliente (fix para Vercel)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ============================
  // REGISTER
  // ============================

  const registerUser = async (userData) => {
    return await axiosInstance.post("/users/register", userData);
  };

  // ============================
  // LOGIN
  // ============================

  const loginUser = async (loginData) => {
    try {
      const res = await axiosInstance.post("/users/login", loginData);

      // Guardar rol
      localStorage.setItem("role", res.data.role);
      setRole(res.data.role);

      // Si es usuario normal → guardamos datos
      if (res.data.role === "user") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }

      return res;
    } catch (error) {
      console.error("ERROR EN CONTEXT LOGINUSER:", error);
      throw error;
    }
  };

  // ============================
  // LOGOUT
  // ============================

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
    setUserAppointments([]);
  };

  // ============================
  // TURNOS DEL USUARIO
  // ============================

  const renderAppointments = async (userId) => {
    if (!userId) return;

    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setUserAppointments(data.user.appointments || []);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  // ============================
  // CREAR TURNO
  // ============================

  const createAppointment = async (appointmentData) => {
    await axiosInstance.post("/appointments/schedule", appointmentData);
  };

  // ============================
  // AGREGAR TURNO LOCAL
  // ============================

  const addAppointment = (newAppointment) => {
    setUserAppointments((prev) => [...prev, newAppointment]);
  };

  // ============================
  // CANCELAR TURNO
  // ============================

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

  // ============================
  // PROVIDER
  // ============================

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
