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

  // 🔥 FIX PARA PRODUCCIÓN: CARGAR USER AL INICIAR LA APP
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const registerUser = async (userData) => {
    return await axiosInstance.post("/users/register", userData);
  };

  const loginUser = async (loginData) => {
    try {
      const res = await axiosInstance.post("/users/login", loginData);

      // Guardado INMEDIATO en localStorage → FIX en producción
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

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
  };

 const renderAppointments = async (userId) => {
  if (!userId) return;

  try {
    const { data } = await axiosInstance.get(`/appointments/user/${userId}`);
    setUserAppointments(data.appointments || []);
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
