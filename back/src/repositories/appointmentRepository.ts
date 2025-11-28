import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";
import moment from "moment";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
validateAllowAppointment: function (date: Date, time: string): void {
  const appointmentDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

  if (!appointmentDateTime.isValid()) {
    throw new Error("La fecha u hora no son válidas.");
  }

  const hour = appointmentDateTime.hour();

  if (!((hour >= 10 && hour < 14) || (hour >= 20 && hour < 24))) {
    throw new Error("El restaurante solo acepta reservas de 10:00 a 14:00 y de 20:00 a 24:00.");
  }
},



  validateExistingAppointment: async function (
  userId: number,
  date: Date,
  time: string
): Promise<void> {
  const appointmentFound = await this.findOne({
    where: {
      user: { id: userId },
      date: date,
      time: time,
    },
  });

  if (appointmentFound) {
    throw new Error(
      `La cita con fecha: ${date}, hora: ${time}, para el usuario con id ${userId}, ya existe.`
    );
  }
},


});

export default AppointmentRepository;
