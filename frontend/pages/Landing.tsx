import styles from "./Landing.module.css"
// import styles from "./footer.module.css";
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import Link from "next/link";
import { useRouter } from 'next/router'; 

export default function Landing() {

  const onSuccess = (response: ISuccessResult) => {
    console.log(response)
    window.location.href = '/Submission';
  }
  
  const handleVerify = (response: ISuccessResult) => {
    console.log(response)
    window.location.href = '/Submission';
    
  }


  return (
    <>
      <div className={styles.landing}>
        <div  className={styles.landing_sub_container1}>
          <div>
          <h1 className={styles.h1}>
            <span  className={styles.span}>Re</span>Centi<span className={styles.span}>Fi</span></h1>
          </div>
          <div>
          <div>
            <h2 className={styles.h2}>How many pieces of Litter did you pickup today?</h2>
          </div>
        {/* TODO:
         1. Insert Worldcpin Verification here 
         2. Fix Line Breaks*/}
              <p className={styles.p}>To submit a new pickup:</p>
            <p className={styles.p}>1. Verify your proof of humanity with Worldcoin </p>
            <p className={styles.p}>2. Click on "Submit a new pickup here" below</p>
            <h4 className={styles.h2}> Worldcoin Verifcation</h4>
            <IDKitWidget
              app_id="app_staging_9a3ad7be55658bd96c54f193ad85bd1c" // obtained from the Developer Portal
              action="test1" // this is your action name from the Developer Portal
              onSuccess={onSuccess} // callback when the modal is closed
              handleVerify={handleVerify} // optional callback when the proof is received
              credential_types={['orb', 'phone']} // optional, defaults to ['orb']
            >
              {({ open }) => <button className={styles.button} onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}
