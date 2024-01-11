import { Injectable, HttpStatus, HttpException } from "@nestjs/common";

type CatchProp = {
  message: string;
  status: number;
};

type ResponseProp<T> = Pick<CatchProp, "message"> & {
  statusCode: number;
  response?: T;
};

type ResponsePaginateProp<T> = ResponseProp<T> & {
  pageTotal: number;
};

type UniqueProp = "username" | "email";
type NotFoundProp = "user";

const res = <T>(prop: ResponseProp<T>) => {
  return prop;
};

const resPaginate = <T>(props: ResponsePaginateProp<T>) => {
  return props;
};

@Injectable()
export class SuccessResponseService {
  constructor() {}

  OK<T>(response?: T) {
    return res({
      message: "Success",
      statusCode: HttpStatus.OK,
      response,
    });
  }

  PAGINATE<T>(pageTotal: number, response?: T) {
    return resPaginate({
      message: "Success",
      statusCode: HttpStatus.OK,
      pageTotal,
      response,
    });
  }
}

@Injectable()
export class ErrorResponseService {
  constructor() {}

  INVALID_CREDETIALS() {
    throw new HttpException(
      "Invalid email or password.",
      HttpStatus.BAD_REQUEST,
    );
  }

  UNIQUE_FOUND(prop: UniqueProp) {
    throw new HttpException(`${prop} already exist`, HttpStatus.BAD_REQUEST);
  }

  NOT_FOUND(prop: NotFoundProp) {
    throw new HttpException(`${prop} not found`, HttpStatus.NOT_FOUND);
  }

  CATCH({ message, status }: CatchProp) {
    throw new HttpException(message, status);
  }
}
