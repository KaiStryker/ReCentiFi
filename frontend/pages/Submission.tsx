import styles from "./Submission.module.css"
import { FiUpload } from 'react-icons/fi';
import { useRouter } from 'next/router'; 

export default function Submission() {
  const router = useRouter(); 

    // Function to handle the submit button click
    const handleSubmitClick = () => {
      //TODO:
      // Do we need any logic here?
      router.push('/Loading');
    };

  return (
  <>
  <div className={styles.subumission_main_container}>
    <div>
    <h1>
       Upload your Submission to Filecoin
    </h1>
    </div>
    <div className={styles.submission_sub_container}>
    <div className={styles.form}>
    <form>

    </form>
    </div>
    <div className={styles.upload_box}>
    <div>
      <FiUpload className={styles.upload_icon}/>
    </div>
      <form action="/action_page.php" 
      style={{
        display: "flex",
        flexDirection: "column",
      }}>
          <input
           style={{
            margin: "15px"
          }}
           type="file" id="myFile" name="filename"/>
          <input type="submit" onClick={handleSubmitClick}  />
      </form>
    </div>
    </div>

  </div>
  </>
  );
}
