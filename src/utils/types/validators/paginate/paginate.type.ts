import { IsNotEmpty } from "class-validator";

export class PaginateDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;

  search: string;

  initialCode: string;
}

export class RegionDto extends PaginateDto {}

export class ProvinceDto extends PaginateDto {
  regionCode: string;
}

export class CityOrMunicipalityDto extends ProvinceDto {
  provinceCode: string;
}

export type PaginatedData<T> = {
  totalPage: number;
  data: T[];
};
