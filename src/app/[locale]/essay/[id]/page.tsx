import { Undo2 } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import { TopicCard } from "~/components/topic-card";
import { db } from "~/server/db";

export default async function EssayPage({
  params,
}: {
  params: { id: string };
}) {
  const essay = await db.essay.findUnique({
    where: { id: params.id },
  });

  return (
    <div className="flex flex-col gap-3 max-w-[448px] w-full px-4 md:px-0">
      <Link
        href="/essay"
        className="flex gap-2.5 mb-4 text-neutral-500 bg-[#EFEFEF] rounded-full px-3 py-2 items-center h-8 mr-auto tracking-tighter font-medium"
      >
        <Undo2 className="w-4 h-4" />
        Back to essays
      </Link>
      <TopicCard
        topic={essay?.topic || ""}
        generated={essay?.type === "PERSONAL_STATEMENT"}
      />

      {essay && (
        <div className="bg-white rounded-2xl p-4">
          <article className="prose  font-medium tracking-tight leading-normal text-neutral-600">
            <Markdown>{essay.content}</Markdown>
          </article>
        </div>
      )}
    </div>
  );
}
