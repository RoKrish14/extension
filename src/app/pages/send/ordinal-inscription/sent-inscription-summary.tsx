import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, HStack, Stack } from 'leather-styles/jsx';
import get from 'lodash.get';

import { Blockchains } from '@shared/models/blockchain.model';
import { SupportedInscription } from '@shared/models/inscription.model';
import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useBitcoinExplorerLink } from '@app/common/hooks/use-bitcoin-explorer-link';
import { useClipboard } from '@app/common/hooks/use-copy-to-clipboard';
import { FormAddressDisplayer } from '@app/components/address-displayer/form-address-displayer';
import { BaseDrawer } from '@app/components/drawer/base-drawer';
import {
  InfoCard,
  InfoCardBtn,
  InfoCardRow,
  InfoCardSeparator,
} from '@app/components/info-card/info-card';
import { InscriptionPreview } from '@app/components/inscription-preview-card/components/inscription-preview';
import { CheckmarkIcon } from '@app/ui/icons/checkmark-icon';
import { CopyIcon } from '@app/ui/icons/copy-icon';
import { ExternalLinkIcon } from '@app/ui/icons/external-link-icon';

import { InscriptionPreviewCard } from '../../../components/inscription-preview-card/inscription-preview-card';

function useSendInscriptionSummaryState() {
  const location = useLocation();
  return {
    txid: get(location.state, 'txid') as string,
    recipient: get(location.state, 'recipient', '') as string,
    arrivesIn: get(location.state, 'arrivesIn') as string,
    inscription: get(location.state, 'inscription') as SupportedInscription,
    feeRowValue: get(location.state, 'feeRowValue') as string,
  };
}

export function SendInscriptionSummary() {
  const { txid, recipient, arrivesIn, inscription, feeRowValue } = useSendInscriptionSummaryState();

  const navigate = useNavigate();
  const txLink = {
    blockchain: 'bitcoin' as Blockchains,
    txid,
  };

  const { onCopy } = useClipboard(txid || '');
  const { handleOpenBitcoinTxLink: handleOpenTxLink } = useBitcoinExplorerLink();
  const analytics = useAnalytics();

  function onClickLink() {
    void analytics.track('view_transaction_confirmation', { symbol: 'BTC' });
    handleOpenTxLink(txLink);
  }

  function onClickCopy() {
    onCopy();
    toast.success('ID copied!');
  }

  return (
    <BaseDrawer title="Sent" isShowing onClose={() => navigate(RouteUrls.Home)}>
      <Box mt="space.06" px="space.06">
        <InscriptionPreviewCard
          icon={<CheckmarkIcon mt="space.01" width="lg" />}
          image={<InscriptionPreview inscription={inscription} />}
          subtitle="Ordinal inscription"
          title={inscription.title}
        />
      </Box>

      <InfoCard pt="space.06" pb="space.06" px="space.06">
        <Stack mb="space.06" width="100%">
          <InfoCardRow title="To" value={<FormAddressDisplayer address={recipient} />} />
          <InfoCardSeparator />
          {arrivesIn && <InfoCardRow title="Estimated confirmation time" value={arrivesIn} />}
          <InfoCardRow title="Fee" value={feeRowValue} />
        </Stack>

        <HStack gap="space.04" width="100%">
          <InfoCardBtn onClick={onClickLink} icon={<ExternalLinkIcon />} label="View details" />
          <InfoCardBtn onClick={onClickCopy} icon={<CopyIcon />} label="Copy ID" />
        </HStack>
      </InfoCard>
    </BaseDrawer>
  );
}
