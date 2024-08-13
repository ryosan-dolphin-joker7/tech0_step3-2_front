import React, { createContext, useState } from "react";

// AccountContextを作成
export const AccountContext = createContext();

// AccountProviderコンポーネントを作成
export function AccountProvider({ children }) {
  // selectedAccount状態を管理
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    // AccountContext.Providerでラップし、selectedAccountとsetSelectedAccountを提供
    <AccountContext.Provider value={{ selectedAccount, setSelectedAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
