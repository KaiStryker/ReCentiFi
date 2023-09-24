const axios = require('axios');
const baseUrl = process.env.BASE_URL;
const axiosHeaders = {
    headers: {
        'DOCK-API-TOKEN': "eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDIxMyIsInNlbGVjdGVkVGVhbUlkIjoiMTQyOTQiLCJjcmVhdG9ySWQiOiIxMDIxMyIsImlhdCI6MTY5NTUwMDQ3NywiZXhwIjo0Nzc0Nzk2NDc3fQ",
    },
};

// issueClaim.js
module.exports = async (req, res) => {
    const did = req.query.did;
    const tier = req.query.tier;

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

    try {
        const claim = await axios.post(`${baseUrl}/credentials/request-claims`, requestBody, axiosHeaders);
        res.status(200).json(claim.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to issue claim: ${error}`);
    }
}
