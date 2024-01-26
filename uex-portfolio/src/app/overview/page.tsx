// Default page Next.js
import Image from "next/image";
import ProjectCard from "../components/projects/ProjectCard";
import styles from "../styles/Overview.module.css";
import ChatFeed from "../components/messages/ChatFeed";
import messages from "../texts/overview.json";
import ProjectsSlider from "../components/projects/ProjectsSlider";
import GoBackButton from "../components/GoBackButton";

export default function Page() {
  return (
    <div className={styles.page}>
      <GoBackButton />
      <h1 className="text-8xl font-bold mt-10">Projects</h1>
      <div className={styles.content}>
        <ProjectsSlider />
        <div className={styles.right}>
          <ChatFeed messages={messages} chatEnabled={true} />
        </div>
      </div>
    </div>
  );
}
