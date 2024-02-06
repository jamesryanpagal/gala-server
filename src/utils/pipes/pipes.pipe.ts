import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PaginateDto, SignupDto } from "../types";
import { pattern } from "../format/regex";
import { CountryCode } from "../constants/constants";

export const stringToPascal = (value: string) => {
  if (!value) {
    return value;
  }
  const valArr = value.split(" ");
  return valArr.map(v => (v = v[0].toUpperCase() + v.substring(1))).join(" ");
};

export const stringToNum = (value: string) => +value;

export const stringTrim = (value: string) =>
  `${CountryCode}${value.replace(pattern.SPACES, "")}`;

@Injectable()
export class SignupPipe implements PipeTransform {
  transform(value: SignupDto, _metadata: ArgumentMetadata): SignupDto {
    return {
      ...value,
      firstname: stringToPascal(value.firstname),
      middle: stringToPascal(value.middle),
      lastname: stringToPascal(value.lastname),
      gender: stringToNum(value.gender.toString()),
      cellphonenum: stringTrim(value.cellphonenum),
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
