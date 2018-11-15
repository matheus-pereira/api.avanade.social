import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { UserResumeVm } from "../../../user/models/view-models/user-resume-vm.model";

export class PublicationParams {
    @ApiModelProperty()
    text: string;

    @ApiModelPropertyOptional()
    imagePath: string;

    user: UserResumeVm;
}