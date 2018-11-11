import { ApiModelProperty } from "@nestjs/swagger";


export class UserResumeVm {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    name: string;
}