import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePostDto {

    @ApiModelProperty()
    readonly user: {id:string, name:string};

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly imagePath: string;

    @ApiModelProperty()
    readonly likes: [{id:string, name:string}];

    @ApiModelProperty()
    readonly timestamp: Date;
}