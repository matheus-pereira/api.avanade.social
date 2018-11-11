import { LoginVm } from "./login-vm.model";
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

export class RegisterVm extends LoginVm {
    @ApiModelProperty()
    firstName: string;
    
    @ApiModelPropertyOptional()
    lastName?: string;
}