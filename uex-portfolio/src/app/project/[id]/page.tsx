// Default page Next.js

import GoBackButton from "../../components/GoBackButton";
import ChatFeed, { Message } from "../../components/messages/ChatFeed";
import styles from "../../styles/ProjectPage.module.css";
import project1 from "../../texts/project1.json";
import project2 from "../../texts/project2.json";
import project3 from "../../texts/project3.json";
import project4 from "../../texts/project4.json";
import project5 from "../../texts/project5.json";
import project6 from "../../texts/project6.json";

const projects = [project1, project2, project3, project4, project5, project6];

export default function Page({ params }: { params: { id: number } }) {
  const project = projects[params.id];
  const chatMessages: Message[] = project.messages.map((message) => ({
    type: message.type as "bot" | "instructions" | "user",
    message: message.message,
    delay: 0,
  }));

  return (
    <div className={`w-full flex flex-col items-center px-20 pb-20`}>
      <GoBackButton />
      <div className="w-full max-w-[1000px] mt-10 flex flex-col items-start pl-20">
        <h1 className={`text-8xl leading-normal  font-bold ${styles.txt}`}>
          {project.title}
        </h1>
        <h2 className={`text-5xl font-extralight ${styles.txt}`}>
          {project.subTitle}
        </h2>
      </div>

      <div
        className={`max-w-[1000px] grid aspect-square grid-cols-3 mt-20 gap-4 min-h-[50%] ${styles.grid}`}
      >
        {project.images.map((image, index) => (
          <div
            key={index}
            className={`row-span-1 rounded-xl overflow-hidden hover:scale-105 transition-all  ${
              index === 4 ? "col-span-2" : ""
            } ${index === 0 ? "col-span-2 row-span-2" : ""} ${
              index === 3 ? "row-span-2" : ""
            }`}
          >
            <img
              key={index}
              src={image}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <ChatFeed
          messages={chatMessages}
          chatEnabled={true}
          scrollToEnd={false}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const ids = [0, 1, 2, 3, 4, 5];

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export const dynamicParams = true;
