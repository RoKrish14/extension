import StacksNftBns from '@assets/images/stacks-nft-bns.png';

import { StxIcon } from '@app/ui/components/avatar-icon/stx-icon';

import { CollectibleItemLayout } from '../collectible-item.layout';

export function StacksBnsName(props: { bnsName: string }) {
  const { bnsName } = props;

  return (
    <CollectibleItemLayout
      collectibleTypeIcon={<StxIcon width="lg" />}
      subtitle="Bitcoin Naming System"
      title={bnsName}
    >
      <img alt="nft image" src={StacksNftBns} width="100px" />
    </CollectibleItemLayout>
  );
}
