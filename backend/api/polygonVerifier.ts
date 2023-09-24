import {auth, resolver, protocol} from '@iden3/js-iden3-auth'




module.exports = async (req, res) => {
  const requestMap = new Map();
  // const hostUrl = "<NGROK_URL>";
  // const sessionId = 1;
  // const callbackURL = "/api/callback"
  // const audience = "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs"

  const hostUrl = "https://f1a5-186-154-213-155.ngrok.io";
  const sessionId = 1;
  const callbackURL = "/api/callback";
  const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ";

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequest(
    'check ID',
    audience,
    uri,
  );
  
  request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
  request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542'; // need to change 

  const proofRequest: protocol.ZeroKnowledgeProofRequest = {
      id: 1,
      circuitId: 'credentialAtomicQuerySigV2',
      query: {
        allowedIssuers: ['*'],
        type: 'membership',
        context: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.jsonld',
        credentialSubject: {
          tier: {
            $eq: 0,
          },
        },
    },
  };

  const scope = request.body.scope ?? [];
  request.body.scope = [...scope, proofRequest];

  requestMap.set(`${sessionId}`, request);

  return res.status(200).set('Content-Type', 'application/json').send(request);
}