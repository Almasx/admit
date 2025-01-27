import { UserButton } from "@clerk/nextjs";
import { EssayCard } from "./(components)/essay-card";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { CreateEssay } from "~/app/[locale]/essay/(components)/create-essay";
import { cn } from "~/lib/utils";
import Link from "next/link";

const SUPPORT_LINK = "https://t.me/admitcom";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      essays: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const hasEssays = user?.essays && user?.essays.length > 0;

  return (
    <div className="w-full px-4 md:w-[640px] md:px-0">
      <div className="flex mb-12 gap-3">
        <UserButton />
        <h1 className="text-neutral-500 mr-auto bg-[#EFEFEF] rounded-full tracking-tighter leading-4 flex items-center px-2 h-8 w-fit font-medium">
          Home for essays
        </h1>

        <Link
          href={SUPPORT_LINK}
          className="text-neutral-500 bg-[#EFEFEF] rounded-full tracking-tighter leading-4 flex items-center px-2 h-8 w-fit font-medium"
        >
          Join Private Community
        </Link>
      </div>

      <div
        className={cn(
          "grid md:grid-cols-2 gap-2 grid-cols-1",
          !hasEssays && "grid-cols-1"
        )}
      >
        <CreateEssay onBoarding={!hasEssays} />
        {user?.essays.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>
    </div>
  );
}
