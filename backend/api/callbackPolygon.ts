import getRawBody from "raw-body";
import { auth, resolver } from "@iden3/js-iden3-auth";
import path from "path";

module.exports = async (req, res) => {
    // Get session ID from request
    const sessionId = req.query.sessionId;
  
    // get JWZ token params from the post request
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();
  
    // fetch authRequest from sessionID
    const authRequest = requestMap.get(`${sessionId}`);
    const keyDIR = "../keys"

  
    // Add Polygon RPC node endpoint - needed to read on-chain state and identity state contract address
    const ethStateResolver = new resolver.EthStateResolver(
      "https://polygon-mumbai.g.alchemy.com/v2/G0gNWcYpU1gC38zNVkDFIlWhrhVXFcc0",
      "0x46Fd04eEa588a3EA7e9F055dd691C688c4148ab3"
    );
    const resolvers = {
        ['polygon:mumbai']: ethStateResolver,
    };

    // EXECUTE VERIFICATION
    const verifier = await auth.Verifier.newVerifier(
        {
            stateResolver: resolvers,
            circuitsDir: path.join(__dirname, keyDIR),
            ipfsGatewayURL:"https://ipfs.io"
        }
    );

    let authResponse;
  
    try {	
        authResponse = await verifier.fullVerify(tokenStr, authRequest);
    } catch (error) {
    return res.status(500).send(error);
    }
    return res
      .status(200)
      .set("Content-Type", "application/json")
      .send("user with ID: " + authResponse.from + " Succesfully authenticated");
  }