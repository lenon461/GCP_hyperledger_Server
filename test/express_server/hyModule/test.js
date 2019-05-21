/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,'..', '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const Client = require('fabric-client');
const {Peer} = require('fabric-client');


async function main() {
    try {

        // Create a new CA client for interacting with the CA.
          const caURL = ccp.certificateAuthorities['ca.example.com'].url;
          const ca = new FabricCAServices(caURL);
 
          // Create a new file system based wallet for managing identities.
          const walletPath = path.join(process.cwd(), 'wallet');
          const wallet = new FileSystemWallet(walletPath);
          console.log(`Wallet path: ${walletPath}`);
          console.log(wallet);
            wallet.export("admin").then((result) => {
                var mspid = result.mspId;
                var certificate = result.certificate;
                var privateKey = result.privateKey;
                console.log(privateKey);
                var client = new Client();
                client.setAdminSigningIdentity(privateKey, certificate, mspid);
                console.log("@");


        var peer = new Peer("grpc://localhost:7051",0);
        client.queryChannels(peer,1).then((result) => {
            console.log(result);
            console.log(result.channels[0].channel_id);   
        }).catch((err) => {
            console.log(err);  
        });
          }).catch((err) => {
                    console.log(err);  
                    });

/*
        var peer = new Peer("grpc://localhost:7051");
        console.log(client);
        client.queryChannels(peer,0).then((result) => {
            console.log(result);   
        }).catch((err) => {
            console.log(err);  
        });
*/







    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        process.exit(1);
    }
}

main();
