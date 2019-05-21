/*
 * SPDX-License-Identifier: Apache-2.0
 */

 'use strict';

const CCC = require('fabric-network');
const { FileSystemWallet, Gateway, Transaction } = require('fabric-network');
const { Peer, User } = require('fabric-client');
const Client = require('fabric-client');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,'..',  '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

module.exports = {
    queryAllCompanys :
    
    async function(channelname, Userid){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // set the users id 'default : user2'
            let userid = 'user2';
            if(Userid) userid = Userid;

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(userid);

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: userid, discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(channelname);

            
            // Get the contract from the network.
            const contract = network.getContract('fabcompany');

            
            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryAllCompanys');
            const jsonresult = result.toString();
            //console.log(jsonresult);
            return jsonresult;
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    },
    
    queryAllChannels :
    
    async function() {
        try {
            const channellist = [];
            const client = new Client();
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);

            const Identity = await wallet.export("user2");
            const peer = new Peer("grpc://localhost:7051",1);

            client.setAdminSigningIdentity(Identity.privateKey, Identity.certificate, Identity.mspId);
            const result = await client.queryChannels(peer, 1);
            
            let jsonform = { channellist}
            for(var i = 0; i < result.channels.length; i++){
                channellist.push(result.channels[i].channel_id);

            }

            return jsonform;


        } catch (error) {
            console.error(`failed to queryAllChannels ${error}`);
            process.exit(1);
        }
    },

    queryblockinfo :
    
    async function(channelname, Userid){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);

            // set the users id 'default : user2'
            let userid = 'user2';
            if(Userid) userid = Userid;

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(userid);

            if (!userExists) {
                console.log(`An identity for the user ${userid} does not exist in the wallet`);
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: userid, discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(channelname);
            const channel = network.getChannel();
            
            var tempBlockinfo = [];
            var tempBlock_data_transaction_info = [];
            var blockheight = (await channel.queryInfo()).height.low;

            for(var i = 0; i < blockheight; i++){
                try{
			tempBlockinfo.push((await channel.queryBlock(i)).header);
			tempBlock_data_transaction_info.push((await channel.queryBlock(i)).data.data[0].payload.header.channel_header);

                } catch(err){
                    console.log(err);
                }
            }
	    

            return tempBlockinfo;
        } catch (error) {
            console.error(`Failed to queryblockinfo: ${error}`);
            process.exit(1);
        }
    },
    queryblockinfo2 :
    
    async function(channelname, Userid){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);

            // set the users id 'default : user2'
            let userid = 'user2';
            if(Userid) userid = Userid;

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(userid);

            if (!userExists) {
                console.log(`An identity for the user ${userid} does not exist in the wallet`);
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'user2', discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(channelname);
            const channel = network.getChannel();
            
            var tempBlockinfo = [];
            var tempBlock_data_transaction_info = [];
            var blockheight = (await channel.queryInfo()).height.low;

            for(var i = 0; i < blockheight; i++){
                try{
			tempBlockinfo.push((await channel.queryBlock(i)));//.header);
			tempBlock_data_transaction_info.push((await channel.queryBlock(i)).data.data[0].payload.header.channel_header);

                } catch(err){
                    console.log(err);
                }
            }
	    

            return tempBlock_data_transaction_info;
        } catch (error) {
            console.error(`Failed to queryblockinfo: ${error}`);
            process.exit(1);
        }
    },
    querytxinfo :
    
    async function(channelname){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user2');

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'user2', discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(channelname);
            const channel = network.getChannel();
            
            var tempBlockinfo = [];
            var tempBlock_data_transaction_info = [];
            var blockheight = (await channel.queryInfo()).height.low;
            console.log(blockheight);

            for(var i = 0; i < blockheight; i++){
                try{
		    var block1 = ((await channel.queryBlock(i)).data).data[0].payload.data;
		    if(!block1.actions) continue;
		    var block2 = block1.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args;

			var block3 = [];
			for(var j = 0; j < block2.length; j++){
				block3.push(block2[j].toString());
			}
			tempBlockinfo.push(block3);
			
			
                } catch(err){
                    console.log(err);
                }
            }
	    
            //console.log(tempBlockinfo);
            //console.log(tempBlock_data_transaction_info);

            return tempBlockinfo;
        } catch (error) {
            console.error(`Failed to queryblockinfo: ${error}`);
            process.exit(1);
        }
    }

    
};

