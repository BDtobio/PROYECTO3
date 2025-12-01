import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
date: Date;

  @Column()
  time!: string;

  @Column({ default: "active" })
  status!: string;

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: "CASCADE" })
  user!: User;
}
