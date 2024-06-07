import { FormInstance } from 'antd';
import { Address } from '../../types/authorization-response';

export function addressesAreEqual(addressCur: Address, addressUpdated: Address): boolean {
  for (const key in addressCur) {
    if (addressUpdated[key as keyof Address] !== addressCur[key as keyof Address]) {
      return false;
    }
  }
  return true;
}

export const checkIfFormValid = (form: FormInstance<unknown>, callback: (valid: boolean) => void): void => {
  const fields = form.getFieldsError();
  for (const field of fields) {
    if (field.errors.length > 0) {
      callback(false);
      return;
    }
  }
  callback(true);
};
