import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "created_at" })
  createdAt: Date;
}
