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
  const [isLLMLoaded, setIsLLMLoaded] = useState(false);
  const [generator, setGenerator] = useState<LlmGeneration>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    setGenerator(new LlmGeneration(() => setIsLLMLoaded(true)));
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
        if (isLLMLoaded) {
          generator
            .generateResponse(message.message)
            .then((response) => {
              console.log(response);
              setIsLoading(false);
              setIsChatEnabled(
                isChatInteractive && indexMessage === baseMessages.length - 1
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setTimeout(() => {
            generator
              .generateResponse(message.message)
              .then((response) => {
                console.log(response);
                setIsLoading(false);
                setIsChatEnabled(
                  isChatInteractive && indexMessage === baseMessages.length - 1
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }, 2000);
        }
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
    generator
      .generateResponse(message)
      .then((response) => {
        console.log(response);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            message: response.data[0].split("</s>")[0],
            delay: 0,
          },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
