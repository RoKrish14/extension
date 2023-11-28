import { memo } from 'react';

import { AccountAvatar } from '@app/components/account/account-avatar';

interface AccountAvatarItemProps {
  publicKey: string;
  index: number;
  name: string;
}
export const AccountAvatarItem = memo(({ name, publicKey, index }: AccountAvatarItemProps) => {
  return <AccountAvatar index={index} name={name} publicKey={publicKey} />;
});
