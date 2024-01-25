import Image from "next/image";
import MessageBubble from "./components/messages/MessageBubble";
import styles from "./styles/Home.module.css";
import { FiSend } from "react-icons/fi";
import ChatFeed from "./components/messages/ChatFeed";
import { use } from "react";

const messages = [
  {
    type: "bot",
    message:
      "Hello you! I am JarvUEX, an AI conceived to guide you through this interactive experiment. Do not be afraid, I am not conscious (yet).",
    delay: 1000,
  },
  {
    type: "bot",
    message:
      "In this website, you will delve into the synthesis of human creativity and artificial intelligence. However, it is imperative to navigate the nuanced terrain that lies at the intersection of innovation and caution.",
    delay: 3000,
  },
  {
    type: "bot",
    message: "I am myself not to trust 😆. Understood?",
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    delay: 500,
  },
  {
    type: "bot",
    message: "Shall we ?",
    delay: 1000,
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Starry background */}
      <div className={styles.starrySky}>
        <div className={`${styles.star} ${styles.star1}`}></div>
        <div className={`${styles.star} ${styles.star2}`}></div>
        <div className={`${styles.star} ${styles.star3}`}></div>
        <div className={`${styles.star} ${styles.star4}`}></div>
        <div className={`${styles.star} ${styles.star5}`}></div>
        <div className={`${styles.star} ${styles.star6}`}></div>
        <div className={`${styles.star} ${styles.star7}`}></div>
        <div className={`${styles.star} ${styles.star8}`}></div>
        <div className={`${styles.star} ${styles.star9}`}></div>
        <div className={`${styles.star} ${styles.star10}`}></div>
        {/* Add more stars as needed */}
      </div>
      <div className={styles.centeredContent}>
        <div className={`${styles.left} text-black`}>
          <h1 className="text-8xl font-bold">UEX23 Portfolio</h1>
          <h2 className="text-4xl font-light">Ugo Balducci</h2>
        </div>
        <div className={styles.right}>
          <ChatFeed messages={messages} />
          {/* Modern text input at the bottom */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              className={styles.textInput}
            />
            <button className={styles.sendButton}>
              <FiSend className={styles.sendIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
