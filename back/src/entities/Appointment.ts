
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({
    name: "appointments",
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    status: string;

   @ManyToOne(() => User, user => user.appointments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })  // 👈 NECESARIO
    user: User;
}
// export const AppointmentModel = AppDataSource.getRepository(Appointment);