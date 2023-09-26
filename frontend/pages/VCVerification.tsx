import { useState } from 'react';
import QRCode from "react-qr-code";
import axios from 'axios';

export default function VCVerification() {
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const base_url = "http://localhost:8080/";
  
  const handleQRButtonClick = async () => {
    setLoading(true);

    await axios.get(base_url + 'api/sign-in')
    .then(response => {
        const id = response.headers['x-id'];
        const data = response.data;
        console.log(data);
        setQrData(data);
        setLoading(false);
    })
    .catch(err => {
        console.error(err);
        setLoading(false);
    });
  };

  return (
    <main className="main-content">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!qrData ? (
            <button className="btn-qr" onClick={handleQRButtonClick}>Sign Up</button>
          ) : (
            <QRCode value={JSON.stringify(qrData)} size={450} />
          )}
        </>
      )}
    </main>
  );
};