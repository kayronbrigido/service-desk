export const AddressType = {
  HOUSE: 1,
  WORK: 2,
};

export type InjectType = (typeof AddressType)[keyof typeof AddressType];
