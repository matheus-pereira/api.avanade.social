import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class PublicationParams {
    @ApiModelProperty()
    text: string;

    @ApiModelPropertyOptional()
    imagePath: string;
}