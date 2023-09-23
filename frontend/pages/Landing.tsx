import styles from "./Landing.module.css"
// import styles from "./footer.module.css";
import Link from "next/link";



export default function Landing() {
  return (
    <>
      <div className={styles.landing}>
        <div>
          <div>
            <h1>How many pieces of Litter did you pickup today?</h1>
          </div>
          <div>

        {/* TODO:
         1. Insert Worldcpin Verification here 
         2. Fix Line Breaks*/}
            <p>To submit a new pickup: {'\n'} 
            1. Verify your proof of humanity with Worldcoin {'\n'} 
            2. Click on "Submit a new pickup here" below
            </p>
            <h4> Worldcoin Verifcation</h4>
            <button>
            <Link href="/Submission">Submit a new pickup here.</Link>
            </button>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}
