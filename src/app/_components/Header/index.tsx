const Header = ({ title }: { title: string }) => {
  return (
    <header className="sticky top-0 h-12 w-full border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-center">
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
