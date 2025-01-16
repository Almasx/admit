export default function EssayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-neutral-100 -z-10" />
      {children}
    </>
  );
}
