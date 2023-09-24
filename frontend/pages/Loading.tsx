import { useEffect, useState } from 'react';
import styles from './Loading.module.css';
import loaderGif from './../public/loader.gif'
import Image from 'next/image'; 
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import axios from 'axios'

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [qrUrl, setqrUrl] = useState("");
  const [nextStep, setNextStep] = useState(false)

  const router = useRouter(); 

  const claimCredential = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/claim');
  
      // Handle success
      if (response.data) {
        const qrUrl = response.data.qrUrl
        setqrUrl(qrUrl)
        setNextStep(true)
        console.log("qrUrl stored");
      } else {
        console.log("Failed to retrieve Url");
      }
    } catch (error) {
      console.error("There was an error claiming the credential:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (qrUrl) {
        // window.location.href = qrUrl;
        window.open(qrUrl)
        // router.push(qrUrl)
        // setTimeout(() => {
        //   window.location.href = '/Dashboard';
        // }, 5000);
    }
  }, [qrUrl]);


  return (
    <>
    <div className={styles.loading_main_container}>
      <div className={styles.load} style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
        <div className={styles.content}>
          <div>
          <h3>Hang tight while we verify your pickup.</h3>
          </div>
          <div>
          <Image src={loaderGif} alt="Loading" width={150} height={150} />
          </div>
        </div>
      </div>
      {/* Conditionally render your content based on the isLoading state */}
      {!isLoading && (
        <div className={styles.sucess_content}> 
          <h2>Success!</h2>
          <p>You can now claim your Credential</p>
          <div>
            {/* TODO: 
            Add Polygon Id pop to button below */}
            <button onClick={claimCredential}>
              Claim Credential
            </button>
            { nextStep && (
                <button>
                <Link href="/Dashboard">Go to Dashboard</Link>
                </button> 
            )}
          {/* TODO: 
          After Clean Credential verification route to dashboard */}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
