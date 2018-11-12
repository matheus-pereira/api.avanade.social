import { BaseModel, schemaOptions } from "src/shared/base.model";
import { prop, ModelType, arrayProp, } from "typegoose";
import { UserResumeVm } from "src/user/models/view-models/user-resume-vm.model";

export class Publication extends BaseModel<Publication> {
    @prop({ required: [true, 'User is required'] })
    user: UserResumeVm;

    @prop()
    text?: string;

    @prop()
    imagePath?: string;

    @arrayProp({ items: UserResumeVm, default: [] })
    likes: UserResumeVm[];

    @prop()
    get totalLikes(): string {
        return `${this.likes.length}`;
    }

    static get model(): ModelType<Publication> {
        return new Publication().getModelForClass(Publication, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}
