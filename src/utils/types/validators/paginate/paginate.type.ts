import { IsNotEmpty } from "class-validator";

export class PaginateDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;

  search: string;
}

export class ProvinceDto extends PaginateDto {
  @IsNotEmpty()
  regionCode: string;
}

export class CityOrMunicipalityDto extends ProvinceDto {
  provinceCode: string;
}

export type PaginatedData<T> = {
  totalPage: number;
  data: T[];
};
