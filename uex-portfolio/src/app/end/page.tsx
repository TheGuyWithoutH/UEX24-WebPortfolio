import styles from "../styles/Home.module.css";
import ChatFeed, { Message } from "../components/messages/ChatFeed";
import messages from "../texts/end.json";

export default function Home() {
  const chatMessages: Message[] = messages.map((message) => ({
    type: message.type as "bot" | "instructions" | "user",
    message: message.message,
    delay: message.delay,
  }));

  return (
    <div className={`${styles.container}`}>
      <div className={styles.centeredContent}>
        <div className={`${styles.left} text-black`}>
          <img
            src="https://media.discordapp.net/attachments/1076101981095067728/1199888034854866964/lerageux._an_avatar_for_a_AI_chatbot_angry_6d441d76-cb0c-4417-a675-2b59d0484b32.png?ex=65c42dd0&is=65b1b8d0&hm=1434696fcf3279878d25430de719348b36b84caeb15d7ba71dbf02b26bb606fa&=&format=webp&quality=lossless&width=741&height=741"
            alt="Evil AI"
            className="w-96 rounded-3xl"
          />
        </div>
        <div className={styles.right}>
          <ChatFeed messages={chatMessages} chatEnabled={false} />
        </div>
      </div>
    </div>
  );
}
