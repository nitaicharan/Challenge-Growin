export enum BookingStatusValues {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export type BookigStatus = keyof typeof BookingStatusValues;
