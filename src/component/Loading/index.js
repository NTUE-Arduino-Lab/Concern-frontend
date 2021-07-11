import styles from "./styles.module.scss";
// icon匯入
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className={styles.loading_loadingBlock}>
      <FontAwesomeIcon
        className={styles.loadingBlock_icon}
        icon={faSpinner}
        spin
      />
      <p className={styles.loadingBlock_text}>Loading . . .</p>
    </div>
  );
};

export default Loading;
