import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from "typeorm";
import { Region } from "../ph-places/Regions.entity";
import { Province } from "../ph-places/Province.entity";
import { CityOrMunicipality } from "../ph-places/CityOrMunicipality.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn("uuid")
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
  gender: number;

  @ManyToOne(() => Region, region => region.users)
  @JoinColumn({ name: "regionId" })
  region: Region;

  @ManyToOne(() => Province, province => province.users, {
    nullable: true,
  })
  @JoinColumn({ name: "provinceId" })
  province: Province;

  @ManyToOne(() => CityOrMunicipality, cm => cm.users)
  @JoinColumn({ name: "cityormunicipalityId" })
  cityormunicipality: CityOrMunicipality;

  @Column()
  cellphonenum: string;

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
