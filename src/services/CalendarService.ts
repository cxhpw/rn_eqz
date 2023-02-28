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
  onPress: (d: TDate) => Promise<boolean>;
  dates: TDate[][];
  dirty: boolean;
};
type Options = {
  onChange?: (res: any, n: number | undefined) => void;
  maxMonthShow?: 4;
  start?: string;
  end?: string;
  boundary?: boolean;
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
  private cache: TDate[] = [];
  private startDateData?: TDate;
  private endDateData?: TDate;
  private prev_startDateData?: TDate;
  private prev_endDateData?: TDate;
  private isFixedDays: boolean = false;

  constructor(options?: Options) {
    console.info('生成Calendar实例');
    this.options = options || ({} as Options);
    this.maxMonthShow = options?.maxMonthShow || 4;
    this.startDate = options?.start ? dayjs(options?.start) : undefined;
    this.endDate = options?.end ? dayjs(options?.end) : undefined;
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

  onDatePress = async (DateData: TDate): Promise<boolean> => {
    this.currentDate = DateData.d;
    this.isFixedDays = false;
    if (DateData.fade || DateData.past || DateData.disabled) {
      return false;
    }
    if (
      this.currentDate.isSame(this.startDate) ||
      this.currentDate.isSame(this.endDate)
    ) {
      return false;
    } else if (this.startDate && this.endDate) {
      //@ts-ignore
      this.startDate = this.currentDate;
      this.endDate = undefined;
      this.startDateData = DateData;
      this.endDateData = undefined;
    } else if (!this.startDate && !this.endDate) {
      this.startDate = this.currentDate;
      this.startDateData = DateData;
    } else if (
      this.startDate &&
      this.currentDate.isAfter(this.startDate) &&
      !this.endDate
    ) {
      this.endDate = this.currentDate;
      this.endDateData = DateData;
    } else if (this.startDate && this.currentDate.isBefore(this.startDate)) {
      this.endDate = this.startDate;
      this.startDate = this.currentDate;
      this.endDateData = this.startDateData;
      this.startDateData = DateData;
    }
    this.checkRandDays();
    return true;
  };
  private cleanup() {
    let startIdx = this.cache.indexOf(this.prev_startDateData!);
    let endIdx = this.cache.indexOf(this.prev_endDateData!);
    let length = endIdx - startIdx;
    if (length > 0) {
      for (let i = startIdx; i <= endIdx; i++) {
        this.cache[i].selected = false;
        this.cache[i].start = false;
        this.cache[i].end = false;
      }
    }
    if (this.prev_startDateData && !this.prev_endDateData) {
      this.prev_startDateData.start = false;
      this.prev_startDateData.selected = false;
      this.prev_startDateData.end = false;
      this.prev_startDateData.start = false;
    }
  }

  private checkRandDays() {
    // 重置上一次日期状态
    this.cleanup();
    let startIdx = this.cache.indexOf(this.startDateData!);
    let endIdx = this.cache.indexOf(this.endDateData!);
    let length = endIdx - startIdx;
    if (startIdx !== -1) {
      this.startDateData!.start = true;
      this.startDateData!.end = false;
      this.startDateData!.selected = false;
    }
    if (endIdx !== -1) {
      this.endDateData!.end = true;
      this.endDateData!.start = false;
      this.endDateData!.selected = false;
    }
    if (length > 0) {
      for (let i = startIdx + 1; i < endIdx; i++) {
        this.cache[i].selected = true;
      }
    }
    // 保存当前日期状态
    this.prev_startDateData = this.startDateData;
    this.prev_endDateData = this.endDateData;
    if (!this.isFixedDays) {
      this.options.onChange?.(
        [this.startDateData?.date, this.endDateData?.date],
        this.days,
      );
    }
  }

  private createCalendar() {
    this._dates = this.calendarArrays(dayjs(), this.startDate, this.endDate);
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
        const dateObj: TDate = {
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
          onPress: (n: TDate) => this.onDatePress(n),
          dates: monthsInRange,
          /* 是否需要重新渲染 */
          dirty: false,
        };
        daysInRange.push(dateObj);
        this.cache.push(dateObj);
        if (dateObj.start) {
          this.startDateData = this.prev_startDateData = dateObj;
        }
        if (dateObj.end) {
          this.endDateData = this.prev_endDateData = dateObj;
        }
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

  public get start(): string | undefined {
    return this.startDateData?.date;
  }

  public get end(): string | undefined {
    return this.endDateData?.date;
  }

  public get days(): number | undefined {
    const n: number = this.startDate?.diff(this.endDate, 'day') || 0;
    return n! < 0 ? Math.abs(n!) + 1 : 0;
  }

  setStartEnd(start: string, end: string) {
    console.log('手动设置开始-结束日期', start, end);
    this.isFixedDays = true;
    this.cleanup();
    if (start && end) {
      this.startDate = dayjs(start);
      this.endDate = dayjs(end);
      for (let i = 0; i < this.cache.length; i++) {
        const element = this.cache[i];
        if (element.d.isSame(this.startDate)) {
          this.startDateData = element;
        } else if (element.d.isSame(this.endDate)) {
          this.endDateData = element;
          break;
        }
      }
      this.checkRandDays();
    }
  }
}
export { Calendar };
