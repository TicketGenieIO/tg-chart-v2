export type PriceObject = {
  min: number;
  avg: number;
  max: number;
};

export type PriceDataPoint = {
  primary: PriceObject;
  secondary: PriceObject;
  date: Date;
};
