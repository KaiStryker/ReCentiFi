const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // this will load environment variables from a .env file into process.env


const axiosHeaders = {
    headers: {
      'DOCK-API-TOKEN': "eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDIxMyIsInNlbGVjdGVkVGVhbUlkIjoiMTQyOTQiLCJjcmVhdG9ySWQiOiIxMDIxMyIsImlhdCI6MTY5NTUwMDQ3NywiZXhwIjo0Nzc0Nzk2NDc3fQ.3ILrmcQEfrHGnC96bKkd571Xu7M9j_lqEF6CAGKEheS7xfRR7PIj6GXsvlF6zlmnEVTcEVW5PUw3RLejFxH4Dw"
    },
  };

const baseUrl = 'https://api-testnet.dock.io'; //Replace with your actual base URL

const issueDid = async () => {
    const polygonDidBody = {
        keyType: 'bjj',
        type: 'polygonid'
    };
    const didResp = await axios.post(`${baseUrl}/dids`, polygonDidBody, axiosHeaders);
    console.log(didResp)
    return didResp;
};

const createProfile = async (did) => {
    const reqBody = {
        "name": "My Test Polygon ID DID",
        "did": did,
        "description": "Testing out the Issuer Profiles api"
    };
    return await axios.post(`${baseUrl}/profiles`, reqBody, axiosHeaders);
};

const issueClaim = async (did, tier) => {
    const requestBody = {
        schema: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.json',
        claims: [ 'id' ],
        credentialOptions: {
            anchor: false,
            persist: false,
            emailMessage: '',
            credential: {
                schema: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.json',
                issuer: did,
                name: 'Tier',
                type: [ "membership" ],
                subject: {
                    Tier: tier
                }
            },
            distribute: true
        }
    };

    const claim = await axios.post(`${baseUrl}/credentials/request-claims`, requestBody, axiosHeaders);
    console.log(claim.data)
    return claim
};


// export { issueClaim, issueDid, createProfile, DiD }

// console.log(issueClaim("did:polygonid:polygon:mumbai:2qE7vMuYG1Jj4TjwTTBeCfETS5yz2SdnY5hkvTQjgw", 0))
console.log(issueDid())