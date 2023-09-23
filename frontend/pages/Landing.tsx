import styles from "./Landing.module.css"
// import styles from "./footer.module.css";

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
         Insert Worldcpin Verification here */}
            <button>
              Submit a new pickup
            </button>
            <p> Worldcoin Verifcation</p>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}
