import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PaginateDto, SignupDto } from "../types";

export const stringToPascal = (value: string) => {
  const valArr = value.split(" ");
  return valArr.map(v => (v = v[0].toUpperCase() + v.substring(1))).join(" ");
};

export const stringToNum = (value: string) => +value;

@Injectable()
export class SignupPipe implements PipeTransform {
  transform(value: SignupDto, _metadata: ArgumentMetadata): SignupDto {
    return {
      ...value,
      firstname: stringToPascal(value.firstname),
      middle: stringToPascal(value.middle),
      lastname: stringToPascal(value.lastname),
      address: stringToPascal(value.address),
    };
  }
}

@Injectable()
export class PaginatePipe implements PipeTransform {
  transform(value: PaginateDto, _metadata: ArgumentMetadata): PaginateDto {
    return {
      ...value,
      page: stringToNum(value.page.toString()),
      size: stringToNum(value.size.toString()),
    };
  }
}
