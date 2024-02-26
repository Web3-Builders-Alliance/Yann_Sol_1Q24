import wallet from '../wba-wallet.json';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { createBundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';
import { readFile } from 'fs/promises';
import { bundlerModuleNameResolver } from 'typescript';
import { read } from 'fs';

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
    const file = await readFile('./generug.png');
    const image = await createGenericFile(file, 'generug.png');
    const [uri] = await bundlrUploader.upload([image]);
    console.log('Your image URI: ', uri);
  } catch (error) {
    console.log('Oops.. Something went wrong', error);
  }
})();
