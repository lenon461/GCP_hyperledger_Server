/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const companys = [
            
            {
                companyname: 'kt',
                money: 100
            },
            {
                companyname: 'lg',
                money: 1000
            },
            {
                companyname: 'SKT',
                money: 1000
            },
        ];

        for (let i = 0; i < companys.length; i++) {
            companys[i].docType = 'company';
            await ctx.stub.putState('COMPANY' + i, Buffer.from(JSON.stringify(companys[i])));
            console.info('Added <--> ', companys[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCompany(ctx, companyNumber) {
        const companyAsBytes = await ctx.stub.getState(companyNumber); // get the car from chaincode state
        if (!companyAsBytes || companyAsBytes.length === 0) {
            throw new Error(`${companyrNumber} does not exist`);
        }
        console.log(companyAsBytes.toString());
        return companyAsBytes.toString();
    }

    async createCompany(ctx, companyNumber, companyname, moneystr) {
        console.info('============= START : Create Company ===========');

        const money = parseInt(moneystr); 
        const company = {
            companyname,
            docType: 'company',
            money 
        };

        await ctx.stub.putState(companyNumber, Buffer.from(JSON.stringify(company)));
        console.info('============= END : Create Company ===========');
    }

    async queryAllCompanys(ctx) {
        const startKey = 'COMPANY0';
        const endKey = 'COMPANY999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeCompanyName(ctx, companyNumber, newName) {
        console.info('============= START : changeCompanyName ===========');

        const companyAsBytes = await ctx.stub.getState(companyNumber); // get the car from chaincode state
        if (!companyAsBytes || companyAsBytes.length === 0) {
            throw new Error(`${companyNumber} does not exist`);
        }
        const company = JSON.parse(companyAsBytes.toString());
        company.companyname = newName;

        await ctx.stub.putState(companyNumber, Buffer.from(JSON.stringify(company)));
        console.info('============= END : changeCompanyOwner ===========');
    }

    async donateMoney(ctx, companyNumber, amount) {
        console.info('============= START : donateMoney ===========');

        const companyAsBytes = await ctx.stub.getState(companyNumber); // get the car from chaincode state
        if (!companyAsBytes || companyAsBytes.length === 0) {
            throw new Error(`${companyNumber} does not exist`);
        }
        const company = JSON.parse(companyAsBytes.toString());
        company.money += parseInt(amount);
        console.log(company.money);

        await ctx.stub.putState(companyNumber, Buffer.from(JSON.stringify(company)));
        console.info('============= END : donateMoney ===========');
    }
}

module.exports = FabCar;
