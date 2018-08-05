/* eslint camelcase: 0 */
export interface BTDSettings {
  ts: 'absolute_us' | 'absolute_metric' | 'custom' | 'relative';
  full_after_24: boolean;
  no_tco: boolean;
  custom_ts?: {
    short: string;
    full: string;
  };
}

export const BTD_CUSTOM_ATTRIBUTE = 'data-btd-custom';
