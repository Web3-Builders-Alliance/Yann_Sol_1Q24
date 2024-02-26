import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { createBundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(wallet)
);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    // const image = ???
    const metadata = {
      name: 'Rug Test',
      symbol: 'RG',
      description: 'A Rug',
      image:
        'https://arweave.net/c8uN9iSqBtT4GjZKvXHzuqZPhPkoUKVTRfUmLXmcyI8',
      attributes: [{ trait_type: 'RugType', value: 'HardRug' }],
      properties: {
        files: [
          {
            type: 'image/png',
            uri: 'https://arweave.net/c8uN9iSqBtT4GjZKvXHzuqZPhPkoUKVTRfUmLXmcyI8',
          },
        ],
      },
      creators: [],
    };
    const myUri = await bundlrUploader.uploadJson(metadata);
    console.log('Your image URI: ', myUri);
  } catch (error) {
    console.log('Oops.. Something went wrong', error);
  }
})();
