import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { UserResumeVm } from "../../../user/models/view-models/user-resume-vm.model";
import { BaseModelVm } from "../../../shared/base.model";

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