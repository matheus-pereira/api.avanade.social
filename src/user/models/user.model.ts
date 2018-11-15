import { prop, ModelType } from "typegoose";
import { BaseModel, schemaOptions } from "../../shared/base.model";
import { IsEmail } from "../../shared/utilities/is-email";

export class User extends BaseModel<User> {
    @prop({
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => IsEmail(value),
            message: 'Invalid email'
        },
        unique: true
    })
    email: string;


    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters']
    })
    password: string;

    @prop()
    avatar?: string;

    @prop({ required: [true, 'First name is required'] })
    firstName: string;

    @prop()
    lastName?: string;
    

    @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName ? this.lastName : ''}`.trim();
    }

    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}