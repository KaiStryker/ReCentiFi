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
      <div id='hidden_dashboard' className={styles.dashboard_main_container}>
      
       
        <div>
        <h1 className={styles.h1}>
            <span  className={styles.span}>Re</span>Centi<span className={styles.span}>Fi</span> Dashboard</h1>
        </div>
        <div className={styles.dashboard_sub_container}>
        
          <div>
            <div className={styles.test}>

            <div className={styles.dashboard_ul}>
            <h4 className={styles.dashboard_li}
            onClick={showTierDiv}>Tier</h4>
            <h4 className={styles.dashboard_li}
             onClick={showPickupsDiv}>Pickups</h4>
             </div>
             <div className={styles.dashboard_score}>
                <li className={styles.li}>Socre: 8.5</li>
                <li className={styles.li}>Next Tier @ 10</li>
             
            </div>
         

          </div>
          <div className="container">
            {showDiv1 && (
             <div>
             <h3>Unisawp V4 Hook</h3>
             <p>Gain access to our exclusive liquidity pool where you can become an LP. Must be a tier 1 member.</p>
             <h3>AI Chatbot</h3>
             <p>Specailized AI bot services, that is not yet realized to the general public!</p>
             <h3>Private Events</h3>
             <p>At this Tier you have access to local community meetups that are not open to the public, traveling stipends for out of state and counrty events and more.</p>
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


