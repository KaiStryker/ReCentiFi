import styles from "./Submission.module.css"
import { FiUpload } from 'react-icons/fi';
import { useRouter } from 'next/router'; 
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Submission() {
  const router = useRouter(); 

  const [fileToUpload, setFileToUpload] = useState(null);

    const handleFileChange = (e) => {
      setFileToUpload(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('video', fileToUpload);
        
        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData);
            console.log(response.data);
            handleSubmitClick()
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };

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
    <h1 className={styles.h1}>
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
      <form 
      // action="/action_page.php" 
         action="/Loading" 
      style={{
        display: "flex",
        flexDirection: "column",
      }}>
          <input className={styles.button1}
           style={{
            marginTop: "15px",
            marginBottom: "15px"
          } }
           type="file" id="myFile" name="filename" onChange={handleFileChange}/>
          <input className={styles.button} type="submit" onClick={handleUpload}  />
      </form>
    </div>
    </div>

  </div>
  </>
  );
}
