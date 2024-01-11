import { Controller, Get, Query } from "@nestjs/common";
import { PhPlacesService } from "./ph-places.service";
import {
  CityOrMunicipalityDto,
  PaginateDto,
  ProvinceDto,
} from "src/utils/types";
import { PaginatePipe } from "src/utils/pipes/pipes.pipe";

@Controller("ph-places")
export class PhPlacesController {
  constructor(private phPlacesService: PhPlacesService) {}

  @Get("/regions")
  regions(@Query(PaginatePipe) dto: PaginateDto) {
    return this.phPlacesService.onGetRegion(dto);
  }

  @Get("/province")
  province(@Query(PaginatePipe) dto: ProvinceDto) {
    return this.phPlacesService.onGetProvince(dto);
  }

  @Get("/citiesormunicipalities")
  citiesormunicipalities(@Query(PaginatePipe) dto: CityOrMunicipalityDto) {
    return this.phPlacesService.onGetCitiesOrMinicipalities(dto);
  }
}
