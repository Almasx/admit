import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Image src="/logo.svg" alt="admit.kz logo" width={24} height={24} />
      <p className="tracking-tighter font-medium pt-[1px]">admitium</p>
    </div>
  );
};
