import { Suspense, useMemo } from 'react';

import { TransactionTypes } from '@stacks/connect';
import { PostConditionMode } from '@stacks/transactions';
import { Flex } from 'leather-styles/jsx';

import { IS_TEST_ENV } from '@shared/environment';

import { usePostConditionModeState } from '@app/store/transactions/post-conditions.hooks';
import { useTransactionRequestState } from '@app/store/transactions/requests.hooks';
import { useTransactionPostConditions } from '@app/store/transactions/transaction.hooks';

import { NoPostConditions } from './no-post-conditions';
import { PostConditionsList } from './post-conditions-list';
import { StxPostCondition } from './stx-post-condition';

function PostConditionsSuspense(): React.JSX.Element | null {
  const postConditions = useTransactionPostConditions();
  const mode = usePostConditionModeState();
  const pendingTransaction = useTransactionRequestState();
  const hasPostConditions = useMemo(
    () => postConditions && postConditions?.length > 0,
    [postConditions]
  );
  const isStxTransfer =
    pendingTransaction?.txType === TransactionTypes.STXTransfer && !hasPostConditions;

  if (!postConditions || !pendingTransaction) return <></>;
  if (!IS_TEST_ENV && mode === PostConditionMode.Allow) return null;

  return (
    <Flex
      border="4px solid"
      borderColor="accent.border-default"
      borderRadius="md"
      flexDirection="column"
      mb="space.05"
      width="100%"
    >
      {hasPostConditions ? (
        <PostConditionsList />
      ) : isStxTransfer ? (
        <StxPostCondition />
      ) : (
        <NoPostConditions />
      )}
    </Flex>
  );
}

export function PostConditions(): React.JSX.Element {
  return (
    <Suspense fallback={<></>}>
      <PostConditionsSuspense />
    </Suspense>
  );
}
