import styles from "./styles/Home.module.css";
import ChatFeed, { Message } from "./components/messages/ChatFeed";
import SendButton from "./components/messages/SendButton";
import messages from "./texts/welcome.json";

export default function Home() {
  const chatMessages: Message[] = messages.map((message) => ({
    type: message.type as "bot" | "instructions" | "user",
    message: message.message,
    delay: message.delay || undefined,
    options: message.options?.map((option) => ({
      text: option.text,
      action: option.action,
    })),
  }));

  return (
    <div className={`${styles.container}`}>
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
          <ChatFeed messages={chatMessages} chatEnabled={false} />
        </div>
      </div>
    </div>
  );
}
