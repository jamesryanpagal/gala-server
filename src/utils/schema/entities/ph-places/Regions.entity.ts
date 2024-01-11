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

@Entity({ name: "regions" })
export class Region {
  @PrimaryColumn()
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

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type RegionRepo = Repository<Region>;
