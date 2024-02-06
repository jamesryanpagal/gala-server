import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user/User.entity";
import { config } from "../config/db.config";
import { Region } from "./entities/ph-places/Regions.entity";
import { Province } from "./entities/ph-places/Province.entity";
import { CityOrMunicipality } from "./entities/ph-places/CityOrMunicipality.entity";

export const Typeorm = TypeOrmModule.forRoot({
  type: "postgres",
  host: config().DBHOST,
  port: config().DBPORT,
  username: config().DBUSERNAME,
  password: config().DB_PASSWORD,
  database: config().DB,
  entities: [User, Region, Province, CityOrMunicipality],
  synchronize: true,
});

export const TypeormAuthFeatures = TypeOrmModule.forFeature([
  User,
  Region,
  Province,
  CityOrMunicipality,
]);
export const TypeormPhPlacesFeatures = TypeOrmModule.forFeature([
  Region,
  Province,
  CityOrMunicipality,
]);
