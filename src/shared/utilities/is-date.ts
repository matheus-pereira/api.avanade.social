export function IsDate(value: string) {
    return !isNaN(new Date(value).getTime());
}