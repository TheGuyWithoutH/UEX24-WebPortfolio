"use client";

import { FiSend } from "react-icons/fi";
import styles from "../../styles/Home.module.css";

export default function SendButton() {
  return (
    <button className={styles.sendButton} onClick={() => {}}>
      <FiSend className={styles.sendIcon} />
    </button>
  );
}
