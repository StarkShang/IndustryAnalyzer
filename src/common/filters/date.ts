import moment from "moment";

export function absoluteDate(val: moment.MomentInput, format: string): string {
    return val ? moment(val).format(format) : "";
}

export function relativeDateFilter(val: moment.MomentInput): string {
    const localLocale = moment(val);
    localLocale.locale("zh-cn");
    return val ? localLocale.fromNow() : "";
}

export function year(val: moment.MomentInput): string {
    return val ? moment(val).format("YYYY") : "";
}
export function date(val: moment.MomentInput): string {
    return val ? moment(val).format("MM-DD") : "";
}

export function time(val: moment.MomentInput): string {
    return val ? moment(val).format("HH:mm") : "";
}
