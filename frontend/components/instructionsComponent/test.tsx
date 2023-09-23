import styles from "./instructionsComponent.module.css";
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'

export default function Test() {

    const onSuccess = (response: ISuccessResult) => {
        console.log(response)
    }

    const handleVerify = (response: ISuccessResult) => {
        console.log(response)
    }
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            create<span>-web3-dapp</span>
          </h1>
          <h3>The ultimate solution to create web3 applications</h3>
        </div>
      </header>

    <IDKitWidget
        app_id="app_staging_9a3ad7be55658bd96c54f193ad85bd1c" // obtained from the Developer Portal
        action="test1" // this is your action name from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // optional callback when the proof is received
        credential_types={['orb', 'phone']} // optional, defaults to ['orb']
    >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
    </div>
  );
}
