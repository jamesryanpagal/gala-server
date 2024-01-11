import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SuccessResponseService } from "src/utils/response/response.service";
import {
  CityOrMunicipality,
  CityOrMunicipalityRepo,
  Region,
  RegionRepo,
} from "src/utils/schema";
import {
  Province,
  ProvinceRepo,
} from "src/utils/schema/entities/ph-places/Province.entity";
import {
  CityOrMunicipalityDto,
  PaginateDto,
  PaginatedData,
  ProvinceDto,
} from "src/utils/types";
import { ILike } from "typeorm";

@Injectable()
export class PhPlacesService {
  constructor(
    @InjectRepository(Region) private regionRepo: RegionRepo,
    @InjectRepository(Province) private provinceRepo: ProvinceRepo,
    @InjectRepository(CityOrMunicipality)
    private cityOrMunicipalityRepo: CityOrMunicipalityRepo,
    private successResponseService: SuccessResponseService,
  ) {}

  private onPaginate<T>(
    page: number,
    size: number,
    data: T[],
  ): PaginatedData<T> {
    const currPage = (page - 1) * size;
    const pageItemCount = currPage + size;

    return {
      totalPage: Math.ceil(data.length / size),
      data: data.slice(currPage, pageItemCount),
    };
  }

  /**
   *
   * @param page curret page of pagination
   * @param size number of item to return
   * @param search series of character for filtering data
   * @returns filtered list of province based of region code
   */
  async onGetRegion({ page, size, search }: PaginateDto) {
    const regions = await this.regionRepo.find(
      !!search && {
        where: [
          { region: ILike(`%${search}%`) },
          { regionname: ILike(`%${search}%`) },
        ],
      },
    );

    const { totalPage, data } = this.onPaginate(page, size, regions);
    return this.successResponseService.PAGINATE(totalPage, data);
  }

  /**
   *
   * @param page curret page of pagination
   * @param size number of item to return
   * @param search series of character for filtering data
   * @param regionCode id from region one of region data for filtering province data
   * @returns filtered list of province based of region code
   */
  async onGetProvince({ page, size, search, regionCode }: ProvinceDto) {
    const provinces = await this.provinceRepo.find({
      where: {
        regioncode: regionCode,
        ...(!!search && { province: ILike(`%${search}%`) }),
      },
    });

    const { totalPage, data } = this.onPaginate(page, size, provinces);
    return this.successResponseService.PAGINATE(totalPage, data);
  }

  /**
   *
   * @param page curret page of pagination
   * @param size number of item to return
   * @param search series of character for filtering data
   * @param regionCode id from region one of region data for filtering province data
   * @returns filtered list of province based of region code
   */
  async onGetCitiesOrMinicipalities({
    page,
    size,
    search,
    regionCode,
    provinceCode,
  }: CityOrMunicipalityDto) {
    const cities = await this.cityOrMunicipalityRepo.find({
      where: {
        regioncode: regionCode,
        ...(!!provinceCode && { provincecode: provinceCode }),
        ...(!!search && { cityormunicipality: ILike(`%${search}%`) }),
      },
    });

    const { totalPage, data } = this.onPaginate(page, size, cities);
    return this.successResponseService.PAGINATE(totalPage, data);
  }
}
