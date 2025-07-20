export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto gird items-center gap-10 py-8">
      {children}
    </div>
  );
}
