import { BaseModelVm } from "src/shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

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