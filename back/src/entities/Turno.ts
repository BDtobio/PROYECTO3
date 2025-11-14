import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  email!: string;

  @Column()
  hora!: string;

  @Column()
  mesa!: number;
}
