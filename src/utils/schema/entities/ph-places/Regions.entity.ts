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

@Entity({ name: "regions" })
export class Region {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  regionId: string;

  @Column({ unique: true })
  code: string;

  @Column()
  region: string;

  @Column()
  regionname: string;

  @Column()
  islandgroupcode: string;

  @Column()
  digitcode: string;

  @OneToMany(() => User, user => user.region)
  users: User[];

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type RegionRepo = Repository<Region>;
