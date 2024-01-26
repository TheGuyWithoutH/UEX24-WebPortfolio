"use client";

import { LegacyRef, Ref, useEffect, useRef } from "react";
import styles from "../../styles/Overview.module.css";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Decomposition",
    subtitle: "The Green Keyboard",
    image:
      "https://cdn.discordapp.com/attachments/1159555429785936024/1159881377571930182/stef_a_journalist_1a129a49-1914-4c7b-804d-cb12c11e07e2.png?ex=65bd1035&is=65aa9b35&hm=78c142a7ef981c1719f14a2ba2220c4814e00f7695465bb0121b1842ae9c29a0&",
  },
  {
    title: "Context",
    subtitle: "Helping Mexican Stray Dogs",
    image:
      "https://cdn.discordapp.com/attachments/1175063501027430470/1199341847370268734/michellehedemann_10934_realistic_bird_eye_view_of_tijuana_subur_d58bede4-c5b6-4cdc-a33c-3693bf12c98a.png?ex=65c23123&is=65afbc23&hm=01052f735ca24e4eb2184af78ce291fea32af1ce5ece70136148f26c198ef286&",
  },
  {
    title: "Style",
    subtitle: "Paraski",
    image:
      "https://cdn.discordapp.com/attachments/1169212814028709930/1172487590671302676/lerageux.png?ex=65bcc829&is=65aa5329&hm=efb639a6e027d2ffb771e33ce84e488cc5045bf5dca339cdf4732c79c4a475aa&",
  },
  {
    title: "Empathy",
    subtitle: "Bike Immobility",
    image:
      "https://cdn.discordapp.com/attachments/1154765966799020063/1159800078454767668/12nora121212_a_slice_of_an_architectural_project_of_an_undergro_0d75d6bb-84ec-4b49-a8bb-891eaa4ac08c.png?ex=65bcc47e&is=65aa4f7e&hm=e53837962523ef22e0c37e373dcdd92be1b8f4846dfccf8aa1e02f564f7adeb0&",
  },
  {
    title: "Blending",
    subtitle: "The Microwave Theorem",
    image:
      "https://cdn.discordapp.com/attachments/1180119653473861714/1186756396700668034/carolea._64819_students_eating_outside_change_weather_to_a_snow_88a33d44-a6c0-45d8-84c8-ed45b6ff7cd7.png?ex=65c28c85&is=65b01785&hm=2b99a9a9be224262fcf4826bf8395ec4c4dac48489bd6f41e2c1c70a961cbf45&",
  },
  {
    title: "Analogy",
    subtitle: "Inside The Matrix",
    image:
      "https://cdn.discordapp.com/attachments/1163469090631991406/1167145523527045190/0_1_2.png?ex=65c50879&is=65b29379&hm=a8d8b4a5e2fb3f18770042d6fbcd6a38da25beba66f69de6837b81059618ba6e&",
  },
];

export function useHorizontalScroll() {
  const elRef: LegacyRef<HTMLDivElement> = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export default function ProjectSlider() {
  const scrollRef = useHorizontalScroll();

  return (
    <div className={styles.slider} ref={scrollRef}>
      {projects.map((project, index) => (
        <ProjectCard key={index} index={index} {...project} />
      ))}
    </div>
  );
}
