const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto flex min-h-dvh max-w-screen-sm flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
    </main>
  );
};

export default Layout;
