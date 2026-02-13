export default function ComponentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative left-1/2 -mt-10 w-dvw max-w-none -translate-x-1/2 overflow-x-hidden pb-20 pt-10">
      {children}
    </div>
  )
}
