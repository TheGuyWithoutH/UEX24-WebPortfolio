"use client";

import { FiSend } from "react-icons/fi";
import styles from "../../styles/Home.module.css";

export default function SendButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="submit" className={styles.sendButton} onClick={onClick}>
      <FiSend className={styles.sendIcon} />
    </button>
  );
}
