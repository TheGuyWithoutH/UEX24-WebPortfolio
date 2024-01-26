// components/ProjectCard.tsx
"use client";

import React from "react";
import styles from "../../styles/ProjectCard.module.css";
import { useRouter } from "next/navigation";

const ProjectCard = ({
  index,
  title,
  subtitle,
  image,
}: {
  index: number;
  title: string;
  subtitle: string;
  image: string;
}) => {
  const router = useRouter();
  return (
    <div
      key={index}
      className={styles.projectCard}
      onClick={() => router.push("/project/" + index)}
    >
      <img src={image} alt={title} className={styles.background} />
      <h2 className={`text-4xl font-bold ${styles.txt}`}>{title}</h2>
      <p className={`text-2xl font-light ${styles.txt}`}>{subtitle}</p>
    </div>
  );
};

export default ProjectCard;
