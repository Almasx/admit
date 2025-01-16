"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { motion } from "framer-motion";
import { formatDate } from "~/lib/utils";
import type { Essay } from "@prisma/client";
import Link from "next/link";

const cardVariants = {
  hover: { rotate: 0, y: 10 },
  initial: { rotate: 1, y: 32 },
};

interface EssayCardProps {
  essay: Essay;
}

export const EssayCard = ({ essay }: EssayCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/essay/${essay.id}`}>
      <Card
        className="shadow-sm group bg-[#F9F9F9] hover:scale-100 hover:!bg-neutral-50 p-2 rounded-3xl h-80 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex pl-2 justify-between py-3">
          <h2 className="text-xl leading-6 tracking-tighter font-semibold text-neutral-500 group-hover:text-neutral-900 duration-200 ease-out">
            {essay.title}
          </h2>
          <div className="bg-neutral-100 whitespace-nowrap mb-auto rounded-full px-2 py-1 text-xm text-neutral-400 group-hover:text-neutral-500 group-hover:bg-white duration-200 ease-out">
            {formatDate(essay.createdAt)}
          </div>
        </div>
        <div className="grow">
          <motion.div
            className="text-sm text-neutral-500 duration-200 ease-out group-hover:text-neutral-900 leading-5 !bg-white relative p-4 rounded-xl"
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            variants={cardVariants}
            transition={{ duration: 0.2 }}
          >
            {/* clean md special chars like * or # */}
            {essay.content.slice(0, 500).replace(/[*#]/g, "")}
            <div className="absolute bottom-0 whitespace-pre-wrap left-0 w-full h-full bg-gradient-to-t from-white to-transparent" />
          </motion.div>
        </div>
      </Card>
    </Link>
  );
};
