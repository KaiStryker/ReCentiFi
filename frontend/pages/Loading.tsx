// export default function Loading() {
//   document.onreadystatechange = function () {
//     var state = document.readyState
//     if (state == 'complete') {
//         setTimeout(function(){
//             document.getElementById('interactive');
//            document.getElementById('load').style.visibility="hidden";
//         },1000);
//     }
//   }
//     return (
//     <>
//     <div id="load">
//       <div id="content">
//       <h1>
//           Loading page
//       </h1>
//       </div>
     
//     </div>
//     </>
//     );
//   }
  
// import { useEffect, useState } from 'react';
// import styles from './Loading.module.css';

// export default function Loading() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div  className={styles.content} style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
//       <div className={styles.load}>
//         <h1>Loading page</h1>
//       </div>
//       {/* Add your loader image here */}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import styles from './Loading.module.css'; // Update with your CSS import
import loaderGif from './../public/loader.gif'
import Image from 'next/image'; 

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div>
      <div className={styles.load} style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
        <div className={styles.content}>
          <h3>Hang tight while we are verifying your pickup.</h3>
          <Image src={loaderGif} alt="Loading" width={100} height={100} />
        </div>
      </div>
      {/* Conditionally render your content based on the isLoading state */}
      {!isLoading && (
        <div>
          {/* Your content goes here */}
          <h2>Success!</h2>
          <p>You can now login into your Polygon ID</p>
          <div>
            <button>
              Polygon ID login
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
