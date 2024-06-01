import { Address } from '../../types/authorization-response';

export function addressesAreEqual(addressCur: Address, addressUpdated: Address): boolean {
  for (const key in addressCur) {
    if (addressUpdated[key as keyof Address] !== addressCur[key as keyof Address]) {
      return false;
    }
  }
  return true;
}
