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

@Entity({ name: "province" })
export class Province {
  @PrimaryColumn()
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

  @CreateDateColumn()
  datecreated: Date;

  @UpdateDateColumn()
  dateupdated: Date;

  @DeleteDateColumn()
  datedeleted: Date;
}

export type ProvinceRepo = Repository<Province>;
