import type { Metadata } from "next";

const data = {
  title: "The Beginner's Guide to Be A Princess",
  description: `All the infant girls countrywide drift downstream from the beginning of the fosse. Whoever reaches the terminal point first will be adopted by the emperor.
  Excuse me??? Who think of such ridiculous idea?! Whoa! I want to go back to my original world!
  What an awful time travel!
  MangaToon got authorization from Xiaomingtaiji to publish this work, the content is the author's own point of view, and does not represent the stand of MangaToon.`,
  thumbnail: "/dummyContent/thumbnail.webp",
};

export const metadata: Metadata = {
  title: `${data.title} - Manga Reader`,
  description: data.description,
};

export default function TitlePage() {
  return <></>;
}
