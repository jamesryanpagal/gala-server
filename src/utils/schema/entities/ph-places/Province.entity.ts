import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/User.entity";

@Entity({ name: "province" })
export class Province {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  provinceId: string;

  @Column({ unique: true })
  code: string;

  @Column()
  province: string;

  @Column()
  regioncode: string;

  @Column()
  islandgroupcode: string;

  @Column()
  digitcode: string;

  @OneToMany(() => User, user => user.province)
  users: User[];

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type ProvinceRepo = Repository<Province>;
