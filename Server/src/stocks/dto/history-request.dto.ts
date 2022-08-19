import { Interval } from '../enum/interval';

export interface HistoryRequestDto {
  period1: Date;
  period2: Date;
  events: string;
  includeAdjustedClose: boolean;
  interval: Interval;
}
