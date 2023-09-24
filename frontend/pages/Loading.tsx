import { useEffect, useState } from 'react';
import styles from './Loading.module.css';
import loaderGif from './../public/loader.gif'
import Image from 'next/image'; 
import Link from 'next/link';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
          <p>You can now login into your Polygon ID</p>
          <div>
            {/* TODO: 
            Add Polygon Id pop to button below */}
            <button>
              Clean Credential
            </button>
            <button>
            <Link href="/Dashboard">Go to Dashboard</Link>
            </button>
          {/* TODO: 
          After Clean Credential verification route to dashboard */}
          </div>

        </div>
      )}
    </div>
    </>
  );
}
