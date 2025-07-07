'use client';

import Split from 'react-split';
import { MenuScreen } from '../../components/Accounting/MenuScreen';
import { CartPreview } from '../../components/Accounting/CartPreview';

const AccountingPage = () => {
  return (
    <div className="h-[calc(100vh-64px)] p-4">
      <Split
        className="flex h-full"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
      >
        <div className="overflow-auto pr-2">
          <MenuScreen />
        </div>
        <div className="overflow-auto pl-2">
          <CartPreview />
        </div>
        
      </Split>
    </div>
  );
};

export default AccountingPage;
