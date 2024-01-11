import { Module } from "@nestjs/common";
import { PhPlacesService } from "./ph-places.service";
import { PhPlacesController } from "./ph-places.controller";
import { TypeormPhPlacesFeatures } from "src/utils/schema/typeorm.module";
import { SuccessResponseService } from "src/utils/response/response.service";
import { PaginatePipe } from "src/utils/pipes/pipes.pipe";

@Module({
  imports: [TypeormPhPlacesFeatures],
  providers: [PhPlacesService, SuccessResponseService, PaginatePipe],
  controllers: [PhPlacesController],
})
export class PhPlacesModule {}
