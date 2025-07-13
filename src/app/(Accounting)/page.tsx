'use client';

import { MenuScreen } from '../../components/Accounting/MenuScreen';
import { CartPreview } from '../../components/Accounting/CartPreview';

const AccountingPage = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-4">
      {/* 左側：メニュー */}
      <div className="flex-1 min-h-[300px] overflow-visible">
        <MenuScreen />
      </div>

      {/* 右側：カート */}
      <div className="w-full lg:w-[400px] shrink-0 overflow-visible">
        <CartPreview />
      </div>
    </div>
  );
};

export default AccountingPage;
