import { Box, HStack, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { usePsbtSignerContext } from '@app/features/psbt-signer/psbt-signer.context';
import { BasicTooltip } from '@app/ui/components/tooltip/basic-tooltip';
import { LockIcon } from '@app/ui/icons/lock-icon';
import { UnlockIcon } from '@app/ui/icons/unlock-icon';

const immutableLabel =
  'Any modification to the transaction, including the fee amount or other inputs/outputs, will invalidate the signature.';
const uncertainLabel =
  'The transaction details can be altered by other participants. This means the final outcome of the transaction might be different than initially agreed upon.';

export function PsbtRequestDetailsHeader() {
  const { isPsbtMutable } = usePsbtSignerContext();
  const tokenLabelColor = isPsbtMutable
    ? token('colors.yellow.action-primary-default')
    : token('colors.ink.text-subdued');

  return (
    <HStack alignItems="center" gap="space.02">
      <styled.h2 textStyle="heading.05">Transaction</styled.h2>
      <BasicTooltip label={isPsbtMutable ? uncertainLabel : immutableLabel} side="bottom">
        <HStack
          alignItems="center"
          border={isPsbtMutable ? 'warning' : 'subdued'}
          borderRadius="xs"
          gap="space.01"
          px="space.02"
          py="space.01"
        >
          <Box width="12px">
            {isPsbtMutable ? (
              <UnlockIcon style={{ color: tokenLabelColor }} variant="small" />
            ) : (
              <LockIcon style={{ color: tokenLabelColor }} variant="small" />
            )}
          </Box>
          <styled.span
            color={isPsbtMutable ? 'yellow.action-primary-default' : 'ink.text-subdued'}
            textStyle="caption.02"
          >
            {isPsbtMutable ? 'Uncertain' : 'Certain'}
          </styled.span>
        </HStack>
      </BasicTooltip>
    </HStack>
  );
}
