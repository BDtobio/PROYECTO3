// import { Entity,PrimaryGeneratedColumn,Column, OneToMany, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn} from "typeorm"
// import { Appointment } from "./Appointment"
// import { Credential } from "./Credential"



// @Entity({
//     name:"users"
// })
// export class User{
//     @PrimaryGeneratedColumn()
//     id:number
//     @Column({
//         type:"varchar",length:100,nullable:false
//     })
//         name:string
//         @Column({type:"varchar",length:100,unique:true,nullable:false})
//         email:string
//         @Column({type:"date",nullable:false})
//         birthdate:Date
//         @Column({type:"integer",nullable:false, unique:true})
//         nDni:number
//         @CreateDateColumn()
//         createdAt?:Date
//         @UpdateDateColumn()
//         updateAt?:Date
//    @OneToOne(() => Credential,{cascade:true})
//     @JoinColumn()
//     credential: Credential;

//     @OneToMany(() => Appointment, (appointment) => appointment.user)
//     appointments: Appointment[]

// }


import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({
    name: "users",
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({ type: "varchar", length: 100, unique: true, nullable: false})
    email: string;

    @Column({  type: "date", nullable: false}) 
    birthdate: Date;

    @Column({ type: "integer", unique: true, nullable: false})
    nDni: number;

    @CreateDateColumn()
    createdAt?: Date;

    @CreateDateColumn()
    updatedAt?: Date;

    @OneToOne(() => Credential, (credential) => credential.user, { cascade: true })
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
}