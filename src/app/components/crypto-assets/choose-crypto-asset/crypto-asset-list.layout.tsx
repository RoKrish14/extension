import { CryptoAssetSelectors } from '@tests/selectors/crypto-asset.selectors';
import { Stack, StackProps } from 'leather-styles/jsx';

export function CryptoAssetListLayout({ children }: StackProps) {
  return (
    <Stack data-testid={CryptoAssetSelectors.CryptoAssetList} px="space.05" width="100%">
      {children}
    </Stack>
  );
}
