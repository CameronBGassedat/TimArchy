interface DateConstructor {
    fromYmd(y: number, m: number, d: number): Date;
}
interface Date {
    hms(): string;
    ymd(): string;
    ymdhm(): string;
    ymdhms(): string;
    mmmyy(): string;
    mmmyyyy(): string;
    addHours(h: number): Date;
    addDays(d: number): Date;
    totalHours(): number;
    date(): Date;
    clone(): Date;
    addHours(days: number): Date;
    getDaysInMonth(): number;
    addMonths(value: number): Date;
    weekNumber(): number;
    monthNumber(): number;
    isBusinessDay(): boolean;
    nextBusinessDay(): Date;
    adjustNextBusinessDay(): Date;
    previousBusinessDay(): Date;
    adjustPreviousBusinessDay(): Date;
    isLastBusinessDayOfMonth(): boolean;
    lastBusinessDayOfMonth(): Date;
}

//declare global {
//    interface Date {
//        myMethod(): number;
//    }
//}