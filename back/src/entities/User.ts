import { Entity,PrimaryGeneratedColumn,Column, OneToMany, JoinColumn, OneToOne} from "typeorm"
import { Appointment } from "./Appointment"
import { Credential } from "./Credential"



@Entity({
    name:"users"
})
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        length:100
    })
        name:string
        @Column()
        email:string
        @Column()
        birthdate:string
        @Column()
        nDni: number
        
   @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.userId)
    appointments: Appointment[]

}


