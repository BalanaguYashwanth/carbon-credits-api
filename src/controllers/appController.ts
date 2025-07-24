import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export const createCompany = async(req, res) => {
    try {
        const {companyName, credits=0} =  req.body
        if(!companyName){
            throw new Error('Company Name is required');
        }

        const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
        const keyPair = Ed25519Keypair.deriveKeypair(process.env.OWNER_MNEMONIC_KEY);
        const txb = new Transaction();

        txb.moveCall({
          arguments: [
            txb.pure.string(companyName),
            txb.pure.string(credits.toString()),
          ],
          target: `${process.env.CARBON_CREDITS_PACKAGE_ID}::carbon_credits::create_company`,
        });
        const result = await suiClient.signAndExecuteTransaction({
            transaction: txb,
            signer: keyPair,
        });
        const transaction = await suiClient.waitForTransaction({
            digest: result.digest,
            options: {
                showEffects: true,
            },
        });
        const txDigest = transaction?.digest
        const status = transaction?.effects?.status.status
        const objectId = transaction?.effects?.created[0]?.reference?.objectId
        res.status(200).json({
                companyId: objectId,
                data:`https://testnet.suivision.xyz/object/${objectId}`, 
                transaction:`https://testnet.suivision.xyz/txblock/${txDigest}`,
                txStatus:status,
                txInfo: transaction
            })
      } catch (error) {
        res.status(400).json({ status: "failure", message: `something went wrong: ${error}` });
      }
}

export const addOrUpdateCredits = async (req, res) => {
    try {
        const {companyId, credits} =  req.body
        if(!(companyId && credits)){
            throw new Error('Company ID and credit are required');
        }
        const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
        const keyPair = Ed25519Keypair.deriveKeypair(process.env.OWNER_MNEMONIC_KEY);
        const txb = new Transaction();

        txb.moveCall({
          arguments: [
            txb.object(companyId),
            txb.pure.string(credits.toString()),
          ],
          target: `${process.env.CARBON_CREDITS_PACKAGE_ID}::carbon_credits::update_company_credits`,
        });
        const result = await suiClient.signAndExecuteTransaction({
            transaction: txb,
            signer: keyPair,
        });
        const transaction = await suiClient.waitForTransaction({
            digest: result.digest,
            options: {
                showEffects: true,
            },
        });
        const txDigest = transaction?.digest
        const objectId = transaction?.effects?.sharedObjects[0]?.objectId
        const status = transaction?.effects?.status.status
        res.status(200).json({
                companyId: objectId,
                data:`https://testnet.suivision.xyz/object/${objectId}`, 
                transaction:`https://testnet.suivision.xyz/txblock/${txDigest}`,
                txStatus:status,
                txInfo: transaction
            })
      } catch (error) {
        res.status(400).json({ status: "failure", message: `something went wrong: ${error}` });
      }
}