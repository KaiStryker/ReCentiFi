const express = require('express');
const {auth, resolver, loaders } = require('@iden3/js-iden3-auth')
const { Server } = require("socket.io");
const getRawBody = require('raw-body');
const { exec } = require('child_process');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios')

const app = express();
const port = 8080;
app.use(cors());

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if you're using HTTPS
}));

const io = new Server();

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/'); // set the destination
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // set the filename
  }
});

const upload = multer({ storage: storage });


app.use(express.static('static'));

app.get("/api/sign-in", (req, res) => {
    console.log('get Auth Request');
    GetAuthRequest(req,res);
});

app.get("/api/claim", (req, res) => {
  console.log('get Auth Request');
  issueClaim(req,res);
});

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res);
});

app.post("/api/upload", upload.single('video'), (req, res) => {
  console.log('upload');
  uploadVideo(req,res);
});

app.listen(port, () => {
    console.log('server running on port 8080');
});

const socketMessage = (fn, status, data) => ({
    fn,
    status,
    data,
  });

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();
// Create a map to store the requestsId
const requestIds = new Map();

const issueClaim = async (req, res) => {
  const requestBody = {
      schema: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.json',
      claims: [ 'id' ],
      credentialOptions: {
          anchor: false,
          persist: false,
          emailMessage: '',
          credential: {
              schema: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.json',
              issuer: "did:polygonid:polygon:mumbai:2qE7vMuYG1Jj4TjwTTBeCfETS5yz2SdnY5hkvTQjgw",
              name: 'Tier',
              type: [ "membership" ],
              subject: {
                  Tier: 0
              }
          },
          distribute: true
      }
  };
  const axiosHeaders = {
    headers: {
      'DOCK-API-TOKEN': "eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDIxMyIsInNlbGVjdGVkVGVhbUlkIjoiMTQyOTQiLCJjcmVhdG9ySWQiOiIxMDIxMyIsImlhdCI6MTY5NTUwMDQ3NywiZXhwIjo0Nzc0Nzk2NDc3fQ.3ILrmcQEfrHGnC96bKkd571Xu7M9j_lqEF6CAGKEheS7xfRR7PIj6GXsvlF6zlmnEVTcEVW5PUw3RLejFxH4Dw"
    },
  };

  const claim = await axios.post(`https://api-testnet.dock.io/credentials/request-claims`, requestBody, axiosHeaders);
  console.log(claim.data)
  requestIds.set(`${sessionId}`, claim.data.id)
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(claim.data);
};

const uploadVideo = async (req, res) => {
  try {
    res.send({ success: true, filePath: req.file.path });
    scanVideo(req, res)
} catch (error) {
    console.error("Error sending response:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
}
 
  // // Mocking the Filecoin upload with local save
  // exec('lotus client import video.mp4', (error, stdout, stderr) => {
  //     if (error) {
  //         res.status(500).json({ error: 'Failed to upload to Filecoin.' });
  //         return;
  //     }

  //     // This will be the CID from Filecoin in a real scenario
  //     const mockCID = 'QmYourFilecoinCID12345';
  //     res.json({ success: true, cid: mockCID });

  // });
}

const scanVideo = async (req, res) => {

  const workDir = `${__dirname}/open_model_zoo/demos/action_recognition_demo/python`;
  const venvDir = `${workDir}/.venv`;
  const createVenv = `python3 -m venv ${venvDir}`;
  const activateVenv = `. ${venvDir}/bin/activate`;
  const installNumpy = "pip install numpy"
  const installCv = "pip install opencv-python"
  const exportPath = "export PYTHONPATH=/opt/homebrew/Cellar/openvino/2023.1.0/lib/python3.11/site-packages:$PYTHONPATH";
  const exportLib = "export DYLD_LIBRARY_PATH=/opt/homebrew/Cellar/openvino/2023.1.0/lib:$DYLD_LIBRARY_PATH";
  const runScript = `${venvDir}/bin/python3 action_recognition_demo.py \
  -i ${__dirname}/uploads/${req.file.originalname} \
  --no_show \
  -at en-de \
  -m_en ./intel/action-recognition-0001/action-recognition-0001-encoder/FP32/action-recognition-0001-encoder.xml \
  -m_de ./intel/action-recognition-0001/action-recognition-0001-decoder/FP32/action-recognition-0001-decoder.xml \
  -lb ${__dirname}/open_model_zoo/demos/action_recognition_demo/python/testGarbage.txt`;
  

  exec(`cd ${workDir} && ${createVenv} && ${activateVenv} && ${installNumpy} && ${installCv} && ${exportPath} && ${exportLib} && ${runScript}`, 
    (error, stdout, stderr) => {
    
    if (stdout) {
        console.log("Output:", stdout);
    }
    if (stderr) {
        console.error("Error Output:", stderr);
    }

    // if (error) {
    //     res.status(500).json({ error: 'Failed to scan video.' });
    //     return;
    // }
  
      // This will be the CID from Filecoin in a real scenario
      // const valid = stdout.result; // subject to change
      // res.json({ success: true, result: valid });
  });
}
 
 
async function GetAuthRequest(req,res) {
  // Audience is verifier id
  const hostUrl = "https://4b04-208-123-173-93.ngrok-free.app"; // need to change everytime you stand up a ngrok tunnel
  const sessionId = req.sessionID;
  const callbackURL = "/api/callback";
  const audience = "did:polygonid:polygon:mumbai:2qE7vMuYG1Jj4TjwTTBeCfETS5yz2SdnY5hkvTQjgw";

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequest(
    'check ID',
    audience,
    uri,
  );


  const proofRequest = {
      id: 1695528474,
      circuitId: 'credentialAtomicQuerySigV2',
      query: {
        allowedIssuers: ['did:polygonid:polygon:mumbai:2qE7vMuYG1Jj4TjwTTBeCfETS5yz2SdnY5hkvTQjgw'],
        type: 'membership',
        context: 'https://raw.githubusercontent.com/KaiStryker/ReCentiFi/main/backend/schema/TierSystem.jsonld',
        credentialSubject: {
          Tier: {
            $eq: 0,
          },
        },
        skipClaimRevocationCheck: true,
    },
  };

  request.id = '1695528474';
  request.thid = '1695528474'; // need to change 

  const scope = request.body.scope ?? [];
  request.body.scope = [...scope, proofRequest];

  requestMap.set(`${sessionId}`, request);

  return res.status(200).set('Content-Type', 'application/json').send(request);
}

// const RPC_URL = '<RPC_URL>';
// const mainContractAddress = "0x624ce98D2d27b20b8f8d521723Df8fC4db71D79D"

async function Callback(req,res) {

    // Get session ID from request
    const sessionId = req.query.sessionId;
  
    // get JWZ token params from the post request
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

  
    // fetch authRequest from sessionID
    const authRequest = requestMap.get(`${sessionId}`);
    console.log(authRequest)
    const keyDIR = "./keys"

    const STATUS = {
        IN_PROGRESS: "IN_PROGRESS",
        ERROR: "ERROR",
        DONE: "DONE",
      };

    io.sockets.emit(
        sessionId,
        socketMessage("Callback", STATUS.IN_PROGRESS, authRequest)
      );
  
    // Add Polygon RPC node endpoint - needed to read on-chain state and identity state contract address
    const ethStateResolver = new resolver.EthStateResolver(
      "https://polygon-mumbai.g.alchemy.com/v2/G0gNWcYpU1gC38zNVkDFIlWhrhVXFcc0",
      "0x134B1BE34911E39A8397ec6289782989729807a4"
    );
    const resolvers = {
        ['polygon:mumbai']: ethStateResolver,
    };

    const verificationKeyloader = new loaders.FSKeyLoader(keyDIR);
    const sLoader = new loaders.UniversalSchemaLoader("ipfs.io");

    const verifier = new auth.Verifier(verificationKeyloader, sLoader, resolvers);

    let authResponse;
  
    try {
        const opts = {
          AcceptedStateTransitionDelay: 5 * 60 * 1000, // up to a 5 minute delay accepted by the Verifier
        };
        authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);
        const userId = authResponse.from;
        io.sockets.emit(
          sessionId,
          socketMessage("handleVerification", STATUS.DONE, authResponse)
        );
        return res
          .status(200)
          .set("Content-Type", "application/json")
          .send("User " + userId + " succesfully authenticated");
      } catch (error) {
        console.log("handleVerification error", sessionId, error);
        io.sockets.emit(
          sessionId,
          socketMessage("handleVerification", STATUS.ERROR, error)
        );
        return res.status(500).send(error);
      }
}