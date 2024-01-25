// components/ChatFeed.js
"use client";

import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

type Message = {
  type: "bot" | "instructions" | "user";
  message: string;
  delay: number;
  options?: string[];
};

const ChatFeed = ({ messages }: { messages: Message[] }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const displayMessages = async () => {
      for (const message of messages) {
        await new Promise((resolve) => setTimeout(resolve, message.delay));

        setChatMessages((prevMessages) => [...prevMessages, message]);
        setIsLoading(true);

        if (message.options) {
          // Simulate user response after a delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const userResponse: Message = {
            type: "user",
            message: "Yes", // You can customize the user response here
            delay: 500,
          };

          setChatMessages((prevMessages) => [...prevMessages, userResponse]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };

    displayMessages();
  }, [messages]);

  return (
    <div className="w-full flex flex-col">
      {chatMessages.map((message, index) => (
        <MessageBubble
          key={index}
          sender={message.type === "bot" ? "receiver" : "sender"}
          message={message.message}
        />
      ))}

      {isLoading && <MessageBubble sender="receiver" message="" isLoading />}
    </div>
  );
};

export default ChatFeed;
