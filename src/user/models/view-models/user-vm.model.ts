import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { BaseModelVm } from "../../../shared/base.model";

export class UserVm extends BaseModelVm {
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelPropertyOptional()
    lastName?: string;

    @ApiModelPropertyOptional()
    fullName?: string;
}