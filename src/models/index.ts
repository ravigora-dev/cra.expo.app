export type Specification = {
  name: string;
  value: string;
  variantPicker: string;
};

export type VariantLink = {
  specifications: Specification[];
  variantName: string;
  variantRef: string;
};

export enum AppScreens {
  Home = 'Home',
  Scanner = 'Scanner',
  Product = 'Product',
  NotFound = 'NotFound',
}
