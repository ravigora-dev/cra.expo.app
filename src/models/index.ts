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
