

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">会計アプリ</h1>
        <nav className="space-x-6 text-sm sm:text-base">
          <a href="/MenuPage" className="hover:text-blue-200 transition-colors">メニュー登録</a>
          <a href="/AccountPage" className="hover:text-blue-200 transition-colors">会計処理</a>
          <a href="/HistoryPage" className="hover:text-blue-200 transition-colors">会計履歴</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
