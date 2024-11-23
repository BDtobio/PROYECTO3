
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";


@Entity({
    name: "credentials",
})
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false, unique: true})
    username: string;

    @Column({ type: "varchar", nullable: false})
    password: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @OneToOne(() => User, (user) => user.credentials)
    @JoinColumn()
    user: User
}