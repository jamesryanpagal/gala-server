import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  @Generated("uuid")
  userid: string;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  middle: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: string;

  @Column()
  region: string;

  @Column({ nullable: true })
  province: string;

  @Column()
  cityOrMunicipality: string;

  @Column()
  cellphoneNum: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;

  @DeleteDateColumn()
  dateDeleted: Date;
}

export type UserRepo = Repository<User>;
