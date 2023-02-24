import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(isBetween);
dayjs.extend(updateLocale);

dayjs.updateLocale('zh', {
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
});

export type TDate = {
  d: Dayjs;
  str: string;
  date: string;
  year: number;
  month: number;
  start?: boolean;
  end?: boolean;
  today: boolean;
  current: boolean;
  past: boolean;
  selected?: boolean;
  outside: boolean;
  /* 判断是否同一个月 */
  fade: boolean;
  disabled: boolean;
  onPress: (d: TDate) => void;
};
type Options = {
  onChange: (res: any) => void;
  maxMonthShow: 4;
  start: string;
  end: string;
};

class Calendar {
  private static instance: Calendar | null;
  private options: Options;
  private _dates: TDate[][] = [];
  private format = 'YYYY-MM-DD';
  private maxMonthShow: number;
  private days_array = ['日', '一', '二', '三', '四', '五', '六'];
  private currentDate?: Dayjs;
  private startDate?: Dayjs;
  private endDate?: Dayjs;
  private earliestDate: Dayjs;
  private latestDate: Dayjs;
  private _years: number[] = [];
  private _months: number[] = [];

  constructor(options?: Options) {
    this.options = options || ({} as Options);
    this.maxMonthShow = options?.maxMonthShow || 4;
    this.earliestDate = dayjs().startOf('month');
    this.latestDate = dayjs().startOf('month').add(this.maxMonthShow, 'month');
    this.createCalendar();
  }
  static getInstance() {
    if (!Calendar.instance) {
      Calendar.instance = new Calendar();
    }
    return Calendar.instance;
  }

  private handle(d: TDate) {
    this.currentDate = d.d;
    if (d.fade || d.past || d.disabled) {
      return;
    }
    if (
      this.currentDate.isSame(this.startDate) ||
      this.currentDate.isSame(this.endDate)
    ) {
      return;
    }
    if (this.startDate && this.endDate) {
      //@ts-ignore
      this.startDate = this.endDate = null;
    }
    if (!this.startDate && !this.endDate) {
      this.startDate = this.currentDate;
      d.start = true;
    }
    if (
      this.startDate &&
      this.currentDate.isAfter(this.startDate) &&
      !this.endDate
    ) {
      this.endDate = this.currentDate;
      d.end = true;
    }
    if (this.startDate && this.currentDate.isBefore(this.startDate)) {
      this.endDate = this.startDate;
      this.startDate = this.currentDate;
    }
    if (this.startDate && this.endDate) {
      this.checkRandDays(this.startDate, this.endDate);
    }
  }

  private checkRandDays(start: Dayjs, end: Dayjs) {
    for (let i = 0; i < this._dates.length; i++) {
      for (let j = 0; j < this._dates[i].length; j++) {
        const date = this._dates[i][j];
        if (date.d.isAfter(end)) {
          return;
        }
        if (date.d.isBetween(start, end)) {
          console.log(2, date.d.format(this.format));
          date.selected = true;
        }
      }
    }
  }

  private createCalendar() {
    this._dates = this.calendarArrays();
  }

  private calendarArrays(
    switcher?: Dayjs,
    start?: Dayjs,
    end?: Dayjs,
    current?: Dayjs,
  ) {
    let monthsInRange = [];
    let months = [];
    let years = [];
    let now = dayjs().startOf('d');
    current = dayjs(switcher || current || start || end).startOf('d');
    for (let i = 0; i < this.maxMonthShow; i++) {
      let daysInRange = [];
      let reference = current || start || end;
      let startRange: Dayjs = dayjs(reference).startOf('month').startOf('week');
      let endRange = dayjs(reference).endOf('month');
      let d = startRange.clone();
      while (d.isBefore(endRange)) {
        daysInRange.push({
          d: d,
          str: d.format('D'),
          date: d.format(this.format),
          year: endRange.get('year'),
          month: endRange.get('month') + 1,
          start: start && d.isSame(start, 'day'),
          end: end && d.isSame(end, 'day'),
          today: d.isSame(now, 'day'),
          /** 现在选择的时间 */
          current: current && d.isSame(current, 'day'),
          past: d.isBefore(now),
          selected: start && end && d.isBetween(start, end),
          outside: d.isBefore(this.earliestDate) || d.isAfter(this.latestDate),
          /* 判断是否同一个月 */
          fade: !d.isSame(reference, 'month'),
          /* */
          disabled: d.isBefore(now.add(3, 'day')),
          onPress: (date: TDate) => this.handle(date),
        });
        d = d.add(1, 'day');
      }
      current = current.add(1, 'month').startOf('day');
      monthsInRange.push(daysInRange);
      months.push(endRange.get('month') + 1);
      years.push(endRange.get('year'));
    }
    this._months = months;
    this._years = years;
    return monthsInRange;
  }

  getNew() {
    return this.dates;
  }

  public get dates(): TDate[][] {
    return this._dates;
  }

  public get years(): number[] {
    return this._years;
  }

  public get months(): number[] {
    return this._months;
  }

  public get weekdays(): string[] {
    return this.days_array;
  }
}
export { Calendar };
