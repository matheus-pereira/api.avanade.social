import * as Validator from 'validator';

export function IsEmail(value: string): boolean {
    return Validator.isEmail(value);
}