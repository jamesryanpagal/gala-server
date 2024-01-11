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

@Entity({ name: "citiesormunicipalities" })
export class CityOrMunicipality {
  @PrimaryColumn()
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

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type CityOrMunicipalityRepo = Repository<CityOrMunicipality>;
