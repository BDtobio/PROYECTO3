/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // ajustá ruta si hace falta

export const UsersContext = createContext({
  user: "",
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  renderAppointments: async () => {},
  createAppointment: async () => {},
  addAppointment: () => {},
  cancelAppointment: async () => {},
});

export const UsersProvider = ({ children }) => {
  
  const [user, setUser] = useState(localStorage.getItem("user") ?? 0);
  const [userAppointments, setUserAppointments] = useState([]);
  
  const registerUser = async (userData) => {
      return await axiosInstance.post("/users/register", userData);
  }
  const loginUser = async (loginData) => {
      const res = await axiosInstance.post("/users/login", loginData);
      localStorage.setItem("user", res.data.user.id);
      setUser(res.data.user.id);
      return res;
  }

  const renderAppointments = async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setUserAppointments(data.user.appointments);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  const createAppointment = async (appointmentData) => {
    await axiosInstance.post("/appointments/schedule", appointmentData);
  };

  const addAppointment = (newAppointment) => {
    setUserAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axiosInstance.put(`/appointments/cancel/${appointmentId}`);
      const newAppointments = userAppointments.map((appointment) => 
        appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment
      );
      setUserAppointments(newAppointments);
    } catch (error) {
      console.error("Error al cancelar la reserva", error);
    }
  };

  const value = {
    user,
    setUser,
    userAppointments,
    registerUser,
    loginUser,
    renderAppointments,
    createAppointment,
    addAppointment,
    cancelAppointment
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
