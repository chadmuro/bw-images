import Head from "next/head";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

import Hero from "../components/Hero";
import ImageCard from "../components/ImageCard";
import { images } from "../images";
import Modal from "../components/Modal";
import { ImageCardType } from "../types";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageCardType | null>(
    null
  );

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleImageClick = (image: ImageCardType) => {
    setOpen(true);
    setSelectedImage(image);
  };

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-black bg-white dark:text-white text-black px-4 items-center">
      <Head>
        <title>Black and White Images</title>
        <meta
          name="description"
          content="Black and white images for newborns"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full h-16 flex justify-between items-center">
        <h1 className="text-lg">Black and White Images</h1>

        <button
          className="w-12 h-12 rounded-lg :bg-slate-800 flex items-center justify-center hover:ring-2 ring-yellow-400 transition-all duration-300 focus:outline-none p-2"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? (
            <FontAwesomeIcon
              icon={faMoon}
              className="h-full w-full text-yellow-600"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSun}
              className="h-full w-full text-yellow-200"
            />
          )}
        </button>
      </header>

      <main className="flex-1 max-w-screen-xl w-full">
        <Hero />
        <section className="grid grid-cols-3 sm:grid-cols-4 gap-4 auto-cols-max">
          {images.map((image) => (
            <ImageCard
              image={image}
              key={image.id}
              handleImageClick={handleImageClick}
            />
          ))}
        </section>
        <Modal open={open} setOpen={setOpen} selectedImage={selectedImage} />
      </main>

      <footer className="mt-16 h-16 flex items-center">
        Created by
        <a
          href="https://www.chadmuro.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="ml-1 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 hover:bg-clip-text hover:text-transparent"
        >
          Chad Murobayashi
        </a>
      </footer>
    </div>
  );
}
