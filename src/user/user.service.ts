import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gender } from "src/utils/constants/constants";
import { ErrorResponseService } from "src/utils/response/response.service";
import { User, UserRepo } from "src/utils/schema";
import { FindOptionsRelations, FindOptionsSelect } from "typeorm";

type UserKey = keyof User;
type UserKeys = UserKey[];

type UserProps = {
  selectionType: "multiple";
  key: UserKeys;
  value: string;
};

type UserProp = {
  selectionType: "single";
  key: UserKey;
  value: string;
};

type GetUserProps = UserProps | UserProp;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: UserRepo,
    private errorResponseService: ErrorResponseService,
  ) {}

  async getUser({ selectionType = "multiple", key, value }: GetUserProps) {
    const isArrayOfProps = selectionType === "multiple" && Array.isArray(key);

    const selectOptions: FindOptionsSelect<User> = {
      userid: true,
      firstname: true,
      middle: true,
      lastname: true,
      birthdate: true,
      gender: true,
      region: {
        region: true,
        regionname: true,
        digitcode: true,
      },
      province: {
        province: true,
        digitcode: true,
      },
      cityormunicipality: {
        cityormunicipality: true,
        digitcode: true,
      },
      cellphonenum: true,
      username: true,
      email: true,
    };

    const relationOptions: FindOptionsRelations<User> = {
      region: true,
      province: true,
      cityormunicipality: true,
    };

    try {
      const user = await this.userRepo.findOne({
        where: !isArrayOfProps
          ? { [`${key}`]: value }
          : key.map(k => ({ [k]: value })),
        select: selectOptions,
        relations: relationOptions,
      });

      if (!!!user) {
        this.errorResponseService.NOT_FOUND("user");
        return;
      }

      return { ...user, gender: Gender[user.gender] };
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }
}
