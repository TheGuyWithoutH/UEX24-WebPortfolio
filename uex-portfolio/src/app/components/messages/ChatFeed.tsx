// components/ChatFeed.js
"use client";

import React, { use, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useRouter } from "next/navigation";
import SendButton from "./SendButton";
import styles from "../../styles/Home.module.css";

export type Message = {
  type: "bot" | "instructions" | "user";
  message: string;
  delay: number;
  options?: {
    text: string;
    action: string[];
  }[];
};

const ChatFeed = ({
  messages,
  chatEnabled,
  canType = true,
}: {
  messages: Message[];
  chatEnabled: boolean;
  canType?: boolean;
}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const resolveAction = (action: string[]) => {
    switch (action[0]) {
      case "send":
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "user",
            message: action[1],
            delay: 0,
          },
        ]);
        break;
      case "navigate":
        router.push(action[1]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const displayMessages = async () => {
      for (const message of messages) {
        await new Promise((resolve) => setTimeout(resolve, message.delay));

        if (message.type === "instructions") {
          setIsLoading(false);
          continue;
        }

        setChatMessages((prevMessages) => [...prevMessages, message]);
        setIsLoading(true);
      }
    };

    displayMessages();
  }, [messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="w-full flex flex-col">
      {chatMessages.map((message, index) => {
        if (message.options) {
          return (
            <React.Fragment key={index}>
              <MessageBubble
                sender={message.type === "bot" ? "receiver" : "sender"}
                message={message.message}
              />
              <div className="flex flex-row space-x-2 mb-10">
                {message.options.map((option, index) => (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    key={index + 2000}
                    onClick={() => resolveAction(option.action)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <MessageBubble
              key={index}
              sender={message.type === "bot" ? "receiver" : "sender"}
              message={message.message}
            />
          );
        }
      })}

      {isLoading && <MessageBubble sender="receiver" message="" isLoading />}

      {chatEnabled && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.textInput}
            disabled={!canType}
          />
          <SendButton />
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatFeed;
