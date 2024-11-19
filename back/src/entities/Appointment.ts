
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({
    name: "appointments",
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.appointments)
    user: User;
}
// export const AppointmentModel = AppDataSource.getRepository(Appointment);