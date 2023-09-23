const axios = require('axios');
const baseUrl = process.env.BASE_URL;
const axiosHeaders = {
    headers: {
        'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
    },
};

// issueDid.js
module.exports = async (req, res) => {
    const polygonDidBody = {
        keyType: 'bjj',
        type: 'polygonid'
    };

    try {
        const didResp = await axios.post(`${baseUrl}/dids`, polygonDidBody, axiosHeaders);
        res.status(200).json(didResp.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Failed to issue DID: ${error}`);
    }
}