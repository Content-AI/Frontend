import React, { useState } from "react";
import clsx from "clsx";

const buttonTags = [
  "All",
  "Blog",
  "Business",
  "Ecommerce",
  "Email",
  "Frameworks",
  "Freemium",
  "Google",
  "Marketing",
  "New",
  "SEO",
  "Social Media",
];

const cardData = [
  {
    title: "Documents",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: true,
  },
  {
    title: "Content Summarizer",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: true,
  },
  {
    title: "AIDA Framework",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Commands",
    description: "Tell Jasper excatly what to write with a command",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Company Bio",
    description: "Tell your company’s story with a captivating bio",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Content Improver",
    description:
      "Take a piece of content and rewrite it to make it more interesting, creative, and engaging.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Email Subject Lines",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "One Shot Blog Post",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Paragraph Generator",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "PAS Framework",
    description:
      "Let Jasper help you write longer articles from start to finish.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Photo Post Captions",
    description: "Get the key bullet points from a piece of content.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
  {
    title: "Product Description",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    icon: "FileDoc.svg",
    isPremium: false,
  },
];

const Chat = () => {
  const [activeCat, setActiveCat] = useState();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      <div>coming soon...</div>
    </div>
  );
};

export default Chat;
