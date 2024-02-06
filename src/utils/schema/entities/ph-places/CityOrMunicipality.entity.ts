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

@Entity({ name: "citiesormunicipalities" })
export class CityOrMunicipality {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  cityormunicipalityId: string;

  @Column({ unique: true })
  code: string;

  @Column()
  cityormunicipality: string;

  @Column({ nullable: true })
  oldname: string;

  @Column()
  iscapital: boolean;

  @Column({ nullable: true })
  districtcode: string;

  @Column({ nullable: true })
  provincecode: string;

  @Column()
  regioncode: string;

  @Column()
  islandgroupcode: string;

  @Column()
  digitcode: string;

  @OneToMany(() => User, user => user.cityormunicipality)
  users: User[];

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type CityOrMunicipalityRepo = Repository<CityOrMunicipality>;
