import { BaseModelVm } from "src/shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { UserResumeVm } from "src/user/models/view-models/user-resume-vm.model";

export class PublicationVm extends BaseModelVm {
    @ApiModelProperty()
    user: UserResumeVm;

    @ApiModelPropertyOptional()
    text?: string;

    @ApiModelPropertyOptional()
    imagePath?: string;

    @ApiModelProperty({ isArray: true, type: UserResumeVm })
    likes: UserResumeVm[];

    @ApiModelProperty()
    totalLikes: string;
}