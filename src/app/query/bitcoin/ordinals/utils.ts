import { HDKey } from '@scure/bip32';

import { NetworkModes } from '@shared/constants';
import { deriveAddressIndexKeychainFromAccount } from '@shared/crypto/bitcoin/bitcoin.utils';
import { getTaprootPayment } from '@shared/crypto/bitcoin/p2tr-address-gen';
import { DerivationPathDepth } from '@shared/crypto/derivation-path.utils';

export function hasInscriptions(data: unknown[]) {
  return data.length !== 0;
}

export function getTaprootAddress(index: number, keychain: HDKey, network: NetworkModes) {
  if (keychain.depth !== DerivationPathDepth.Account)
    throw new Error('Expects keychain to be on the account index');

  const addressIndex = deriveAddressIndexKeychainFromAccount(keychain)(index);

  if (!addressIndex.privateKey) {
    throw new Error('Expected privateKey to be defined');
  }

  const payment = getTaprootPayment(addressIndex.publicKey!, network);

  if (!payment.address) throw new Error('Expected address to be defined');

  return payment.address;
}

/**
 * Inscriptions contain arbitrary data. When retrieving an inscription, it should be
 * classified into one of the types below, indicating that the app can handle it
 * appropriately and securely. Inscriptions of types not ready to be handled by the
 * app should be classified as "other".
 */
const supportedInscriptionTypes = ['image', 'text', 'other'] as const;

type SupportedInscriptionType = (typeof supportedInscriptionTypes)[number];

interface BaseInscriptionInfo {
  /**
   * The kind of inscription as classified by this app. Different kinds of inscriptions
   * require different treatment (e.g., images vs documents).
   */
  type: SupportedInscriptionType;
  title: string;
  infoUrl: string;
}

interface ImageInscriptionInfo extends BaseInscriptionInfo {
  type: 'image';
  src: string;
}

interface TextInscriptionInfo extends BaseInscriptionInfo {
  type: 'text';
  contentSrc: string;
}

interface OtherInscriptionInfo extends BaseInscriptionInfo {
  type: 'other';
}

/**
 * Information useful to the app about an inscription depending on its
 * type. Typically, API data will be used to construct this object. This is
 * *not* the result of any one API response.
 */
export type InscriptionInfo = ImageInscriptionInfo | TextInscriptionInfo | OtherInscriptionInfo;

export function createInfoUrl(contentPath: string) {
  return `https://ordinals.com${contentPath}`.replace('content', 'inscription');
}

export function whenInscriptionType<T>(
  mimeType: string,
  branches: { [k in SupportedInscriptionType]?: () => T }
) {
  if (mimeType.startsWith('image/') && branches.image) {
    return branches.image();
  }

  if (mimeType.startsWith('text') && branches.text) {
    return branches.text();
  }

  if (branches.other) return branches.other();

  throw new Error('Unhandled inscription type.');
}

export async function getNumberOfInscriptionOnUtxo(id: string, index: number) {
  const resp = await fetch(`https://ordinals.com/output/${id}:${index}`);
  const html = await resp.text();
  const utxoPage = new DOMParser().parseFromString(html, 'text/html');
  return utxoPage.querySelectorAll('.thumbnails a').length;
}