const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="mx-auto flex min-h-dvh max-w-screen-sm flex-col">{children}</main>;
};

export default Layout;
