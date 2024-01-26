// components/ChatFeed.js
"use client";

import React, { FormEvent, use, useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useRouter } from "next/navigation";
import SendButton from "./SendButton";
import styles from "../../styles/Home.module.css";
import useMessages from "@/app/hooks/MessagesCallback";

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
  scrollToEnd = true,
}: {
  messages: Message[];
  chatEnabled: boolean;
  canType?: boolean;
  scrollToEnd?: boolean;
}) => {
  const [
    chatMessages,
    isLoading,
    _,
    bottomRef,
    resolveAction,
    handleSubmit,
    isChatEnabled,
  ] = useMessages({
    baseMessages: messages,
    isChatInteractive: chatEnabled,
    scrollToEnd,
  });

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
                    className="bg-[#43abe2] hover:scale-105 shadow-2xl text-white font-bold py-2 px-4 rounded"
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
        <form
          className={styles.inputContainer}
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="message"
            autoComplete="off"
            placeholder="Type your message..."
            className={styles.textInput}
            disabled={!canType || isLoading || !isChatEnabled}
          />
          <SendButton onClick={() => {}} />
        </form>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatFeed;
