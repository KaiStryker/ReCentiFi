import styles from "./Landing.module.css"
// import styles from "./footer.module.css";
import Link from "next/link";



export default function Landing() {
  return (
    <>
      <div className={styles.landing}>
        <div className={styles.landing_sub_container1}>
        <div>
          <h1 className={styles.h1}>
            <span  className={styles.span}>Re</span>Centi<span className={styles.span}>Fi</span></h1>
        </div>
          <div>
            <h2 className={styles.h2}>How many pieces of Litter did you pickup today?</h2>
          </div>
          <div>

        {/* TODO:
         1. Insert Worldcpin Verification here 
         2. Fix Line Breaks*/}
            <p className={styles.p}>To submit a new pickup:</p>
            <p className={styles.p}>1. Verify your proof of humanity with Worldcoin </p>
            <p className={styles.p}>2. Click on "Submit a new pickup here" below</p>
            <h4 className={styles.h2}> Worldcoin Verifcation</h4>
            <button className={styles.button}>
            <Link className={styles.link_text} href="/Submission">Submit a new pickup here.</Link>
            </button>
          </div>
        </div>
        <div className={styles.landing_sub_container2}>
        </div>
      </div>
      <div>
     
      </div>
    </>
  );
}
