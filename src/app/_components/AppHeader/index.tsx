const AppHeader = ({ title }: { title: string }) => {
  return (
    <header className="sticky top-0 z-50 h-12 w-full max-w-screen-sm border-b border-gray-100 bg-white">
      <div className="flex h-full items-center justify-center">
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default AppHeader;
