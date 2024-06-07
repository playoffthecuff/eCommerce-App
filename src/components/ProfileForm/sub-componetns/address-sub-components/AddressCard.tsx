import { useState } from 'react';
import { Badge, Spin } from 'antd';
import { Address, AddressType } from '../../../../types/authorization-response';
import userStore from '../../../../store/user-store';
import styles from '../../ProfileForm.module.css';
import { CardComponent } from './Card';

export function AddressCard({
  address,
  type,
  onEdit,
  onDeleteError,
  onDeleteSuccess,
}: {
  address: Address;
  type: AddressType;
  onEdit: (addr: Address) => void;
  onDeleteSuccess: () => void;
  onDeleteError: (error: Error) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAddress = async () => {
    setIsLoading(true);
    try {
      await userStore.deleteAddress(type, address.id);
      setIsLoading(false);
      onDeleteSuccess();
    } catch (error) {
      setIsLoading(false);
      onDeleteError(error as Error);
    }
  };

  const cardContent = <CardComponent address={address} onEdit={onEdit} handleDeleteAddres={handleDeleteAddress} />;

  return (
    <Spin spinning={isLoading} wrapperClassName={styles.spin}>
      {address.isDefault ? (
        <Badge.Ribbon text="Default address" className={styles['badge-style']}>
          {cardContent}
        </Badge.Ribbon>
      ) : (
        cardContent
      )}
    </Spin>
  );
}
