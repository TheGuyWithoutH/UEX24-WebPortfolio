"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Message } from "../components/messages/ChatFeed";
import { useRouter } from "next/navigation";
import { LlmGeneration } from "./LlmGeneration";

const useMessages = ({
  baseMessages,
  isChatInteractive,
  scrollToEnd = true,
}: {
  baseMessages: Message[];
  isChatInteractive: boolean;
  scrollToEnd?: boolean;
}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [indexMessage, setIndexMessage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(isChatInteractive);
  const [generator, setGenerator] = useState<LlmGeneration>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setGenerator(new LlmGeneration());
  }, []);

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
        setIndexMessage(indexMessage + 1);
        break;
      case "navigate":
        router.push(action[1]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsChatEnabled(false);
    if (indexMessage >= baseMessages.length) return;

    const message = baseMessages[indexMessage];

    switch (message.type) {
      case "instructions":
        setIsLoading(true);
        generator.generateResponse(message.message).then((response) => {
          setIsLoading(false);
          setIsChatEnabled(
            isChatInteractive && indexMessage === baseMessages.length - 1
          );
        });
        break;
      case "bot":
        setIsLoading(true);
        setTimeout(() => {
          setChatMessages((prevMessages) => [...prevMessages, message]);
          setIsLoading(false);
          if (!message.options) {
            setIndexMessage(indexMessage + 1);
          }
        }, message.delay);
        break;
      default:
        break;
    }
  }, [baseMessages, indexMessage]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    if (scrollToEnd) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the form data
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    // add the message to the chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        message,
        delay: 0,
      },
    ]);

    // clear the input field
    event.currentTarget.reset();

    // generate a response
    generator.generateResponse(message).then((response) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          message: response.generated_text,
          delay: 0,
        },
      ]);
      setIsLoading(false);
    });
    setIsLoading(true);
  }

  return [
    chatMessages,
    isLoading,
    setIsLoading,
    bottomRef,
    resolveAction,
    handleSubmit,
    isChatEnabled,
  ] as const;
};

export default useMessages;
