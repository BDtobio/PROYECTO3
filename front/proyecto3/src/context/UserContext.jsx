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

  // 🔥 CARGA AUTOMÁTICA DEL USUARIO EN PRODUCCIÓN
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ==========================
  // 🔐 REGISTRO DE USUARIO
  // ==========================
  const registerUser = async (userData) => {
    return await axiosInstance.post("/users/register", userData);
  };

  // ==========================
  // 🔑 LOGIN
  // ==========================
  const loginUser = async (loginData) => {
    try {
      const res = await axiosInstance.post("/users/login", loginData);

      // Guardado en localStorage
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setRole(res.data.role);
      setUser(res.data.user);

      return res;
    } catch (error) {
      console.error("ERROR EN CONTEXT LOGINUSER:", error);
      throw error;
    }
  };

  // ==========================
  // 🚪 LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
  };

  // ==========================
  // 🔁 OBTENER TURNOS DEL USUARIO
  // ==========================
  const renderAppointments = async (userId) => {
    if (!userId) return;

    try {
      // ⚠️ FIX: faltaban los template strings correctos
      const { data } = await axiosInstance.get(`/users/${userId}`);

      setUserAppointments(data.user.appointments || []);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  // ==========================
  // 🗓 CREAR TURNO
  // ==========================
  const createAppointment = async (appointmentData) => {
    await axiosInstance.post("/appointments/schedule", appointmentData);
  };

  // ==========================
  // ➕ AGREGAR TURNO AL STATE
  // ==========================
  const addAppointment = (newAppointment) => {
    setUserAppointments((prev) => [...prev, newAppointment]);
  };

  // ==========================
  // ❌ CANCELAR TURNO
  // ==========================
  const cancelAppointment = async (appointmentId) => {
    try {
      // ⚠️ FIX: corregido el template string
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

  const adminCreateAppointment = async (appointmentData) => {
    try {
      const { data } = await axiosInstance.post("/appointments/admin", appointmentData);
      return data;
    } catch (err) {
      console.error("Error al crear turno admin:", err);
      throw err;
    }
  };

  // ==========================
  // 🟨 ADMIN: EDITAR TURNO
  // ==========================
  const adminUpdateAppointment = async (id, appointmentData) => {
    try {
      const { data } = await axiosInstance.put(`/appointments/admin/${id}`, appointmentData);
      return data;
    } catch (err) {
      console.error("Error al editar turno admin:", err);
      throw err;
    }
  };

  // ==========================
  // 🟥 ADMIN: ELIMINAR TURNO
  // ==========================
  const adminDeleteAppointment = async (id) => {
    try {
      await axiosInstance.delete(`/appointments/admin/${id}`);
    } catch (err) {
      console.error("Error al eliminar turno admin:", err);
      throw err;
    }
  };
  // ==========================
  // PROVIDER
  // ==========================
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
    adminCreateAppointment,
    adminUpdateAppointment,
    adminDeleteAppointment,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
