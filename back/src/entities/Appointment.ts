import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  // 🔥 PERMITIR NULL MOMENTÁNEAMENTE PARA EVITAR ERRORES
  @Column({ type: "date", nullable: true })
  date: Date;

  @Column({ type: "time", nullable: true })
  time: string;

  @Column({ default: "active" })
  status: string;

  // 🔥 NUEVO: para turnos hechos por admin sin usuario
  @Column({ nullable: true })
  clientName: string;

  // 🔥 OPCIONAL: relación con usuario verdadero
  @ManyToOne(() => User, (user) => user.appointments, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
