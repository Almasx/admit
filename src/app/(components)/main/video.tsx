"use client";

import { Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export const VideoSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.02], [15, 0]);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div
        style={{ perspective: 1000 }}
        className="bg-neutral-50 border shadow-[0_0_24px_rgba(250,250,250,0.7)_inset] pt-12 p-5 rounded-3xl w-full max-w-screen-md mx-auto relative overflow-hidden"
      >
        <motion.div
          style={{ rotateX, transformStyle: "preserve-3d" }}
          className="h-[50vh] rounded-3xl"
          onClick={() => setShowVideo(true)}
        >
          <img
            src="/cover.svg"
            alt="admit.ai intro"
            className="w-full h-full object-cover rounded-2xl mx-auto"
          />
          <button className="group z-10 shadow-sm gap-3 absolute bg-white p-3 flex items-center justify-center rounded-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-neutral-100 group-hover:bg-neutral-200 duration-150 ease-out  text-neutral-500 size-8 rounded-full flex items-center justify-center">
              <Play size={16} fill="#737373 rounded-xl" />
            </div>
            <p className="text-neutral-500 whitespace-nowrap font-medium group-hover:text-neutral-800 duration-150 ease-out">
              Демо-видео{" "}
              <span className="text-neutral-400 group-hover:text-neutral-500 duration-150 ease-out">
                15 мин
              </span>
            </p>
          </button>
        </motion.div>
      </div>

      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoId="AMpAIb9XGfw"
      />
    </>
  );
};

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId,
}) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 z-[99] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="w-full h-full max-w-7xl max-h-[80vh] p-4">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
