import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BitcoinTx } from '@shared/models/transactions/bitcoin-transaction.model';
import { RouteUrls } from '@shared/route-urls';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useBitcoinExplorerLink } from '@app/common/hooks/use-bitcoin-explorer-link';
import {
  containsTaprootInput,
  getBitcoinTxCaption,
  getBitcoinTxValue,
  isBitcoinTxInbound,
} from '@app/common/transactions/bitcoin/utils';
import { openInNewTab } from '@app/common/utils/open-in-new-tab';
import { IncreaseFeeButton } from '@app/components/stacks-transaction-item/increase-fee-button';
import { TransactionTitle } from '@app/components/transaction/transaction-title';
import {
  convertInscriptionToSupportedInscriptionType,
  createInscriptionInfoUrl,
} from '@app/query/bitcoin/ordinals/inscription.hooks';
import { useGetInscriptionsByOutputQuery } from '@app/query/bitcoin/ordinals/inscriptions-by-param.query';
import { useCurrentAccountNativeSegwitAddressIndexZero } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';
import { BtcIcon } from '@app/ui/components/avatar-icon/btc-icon';
import { BulletSeparator } from '@app/ui/components/bullet-separator/bullet-separator';
import { Caption } from '@app/ui/components/typography/caption';

import { TransactionItemLayout } from '../transaction-item/transaction-item.layout';
import { BitcoinTransactionIcon } from './bitcoin-transaction-icon';
import { InscriptionIcon } from './bitcoin-transaction-inscription-icon';
import { BitcoinTransactionStatus } from './bitcoin-transaction-status';

interface BitcoinTransactionItemProps {
  transaction: BitcoinTx;
}
export function BitcoinTransactionItem({ transaction }: BitcoinTransactionItemProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: inscriptionData } = useGetInscriptionsByOutputQuery(transaction, {
    select(data) {
      const inscription = data.results[0];
      if (!inscription) return;
      return convertInscriptionToSupportedInscriptionType(inscription);
    },
  });

  const bitcoinAddress = useCurrentAccountNativeSegwitAddressIndexZero();
  const { handleOpenBitcoinTxLink: handleOpenTxLink } = useBitcoinExplorerLink();
  const analytics = useAnalytics();
  const caption = useMemo(() => getBitcoinTxCaption(transaction), [transaction]);
  const value = useMemo(
    () => getBitcoinTxValue(bitcoinAddress, transaction),
    [bitcoinAddress, transaction]
  );

  if (!transaction) return null;

  const onIncreaseFee = () => {
    navigate(RouteUrls.IncreaseBtcFee, { state: { btcTx: transaction } });
  };

  const openTxLink = () => {
    void analytics.track('view_bitcoin_transaction');
    if (inscriptionData) {
      openInNewTab(createInscriptionInfoUrl(inscriptionData.id));
      return;
    }
    handleOpenTxLink({ txid: transaction?.txid || '' });
  };

  const isOriginator = !isBitcoinTxInbound(bitcoinAddress, transaction);
  const isEnabled =
    isOriginator && !transaction.status.confirmed && !containsTaprootInput(transaction);

  const txCaption = (
    <BulletSeparator>
      <Caption>{caption}</Caption>
      {inscriptionData ? <Caption>{inscriptionData.mime_type}</Caption> : null}
    </BulletSeparator>
  );

  const title = inscriptionData ? `Ordinal inscription #${inscriptionData.number}` : 'Bitcoin';
  const increaseFeeButton = (
    <IncreaseFeeButton
      isEnabled={isEnabled}
      isSelected={pathname === RouteUrls.IncreaseBtcFee}
      onIncreaseFee={onIncreaseFee}
    />
  );

  return (
    <TransactionItemLayout
      openTxLink={openTxLink}
      rightElement={isEnabled ? increaseFeeButton : undefined}
      txCaption={txCaption}
      txIcon={
        <BitcoinTransactionIcon
          icon={inscriptionData ? <InscriptionIcon inscription={inscriptionData} /> : <BtcIcon />}
          transaction={transaction}
          btcAddress={bitcoinAddress}
        />
      }
      txStatus={<BitcoinTransactionStatus transaction={transaction} />}
      txTitle={<TransactionTitle title={title} />}
      txValue={value}
    />
  );
}
