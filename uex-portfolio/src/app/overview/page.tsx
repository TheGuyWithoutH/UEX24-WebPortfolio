// Default page Next.js
import styles from "../styles/Overview.module.css";
import ChatFeed, { Message } from "../components/messages/ChatFeed";
import messages from "../texts/overview.json";
import ProjectsSlider from "../components/projects/ProjectsSlider";
import GoBackButton from "../components/GoBackButton";

export default function Page() {
  const overviewMessages: Message[] = messages.map((message) => ({
    type: message.type as "bot" | "instructions" | "user",
    message: message.message,
    delay: message.delay || undefined,
  }));

  return (
    <div className={styles.page}>
      <GoBackButton />
      <h1 className="text-8xl leading-normal z-2 font-bold mt-10">Projects</h1>
      <div className={styles.content}>
        <ProjectsSlider />
        <div className={styles.right}>
          <ChatFeed messages={overviewMessages} chatEnabled={true} />
        </div>
      </div>
    </div>
  );
}
