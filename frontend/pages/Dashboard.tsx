import styles from './Dashboard.module.css';
import React, { useState } from 'react';

export default function Dashboard() {
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);

  const showTierDiv = () => {
    setShowDiv1(true);
    setShowDiv2(false);
  };

  const showPickupsDiv = () => {
    setShowDiv1(false);
    setShowDiv2(true);
  };

  return (
    <>
      <div className={styles.dashboard_main_container}>
        <div>
          <h1>ReCentiFi Dashboard</h1>
        </div>
        <div className={styles.dashboard_sub_container}>
        
          <div>
            <div className={styles.test}>

            <div className={styles.dashboard_ul}>
            <h4 className={styles.dashboard_li}
            onClick={showTierDiv}>Tier</h4>
            <h4 className={styles.dashboard_li}
             onClick={showPickupsDiv}>Pickups</h4>
          <div className={styles.dashboard_score}>
                <li className={styles.li}>Socre: 8.5</li>
                <li className={styles.li}>Next Tier @ 10</li>
             
             </div>
            </div>
         

          </div>
          <div className="container">
            {showDiv1 && (
              <div>
                <h3>Unisawp V4 Hook</h3>
                <h3>AI Chatbot</h3>
                <h3>Private Events</h3>
              </div>
            )}
            {showDiv2 && (
              <div>
                <h3>Pickup 1</h3>
                <h3>Pickup 2</h3>
                <h3>Pickup 3</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}


