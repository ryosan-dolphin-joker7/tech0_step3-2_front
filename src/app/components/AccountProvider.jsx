import React, { createContext, useState } from "react";

// AccountContextを作成
export const AccountContext = createContext();

// AccountProviderコンポーネントを作成
export function AccountProvider({ children }) {
  // selectedAccount状態を管理
  const [selectedAccount, setSelectedAccount] = useState(null);

  // selectedUserAccount状態を管理
  const [selectedUserAccount, setSelectedUserAccount] = useState(null);

  return (
    // AccountContext.Providerでラップし、必要な状態と関数を提供
    <AccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
        selectedUserAccount,
        setSelectedUserAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
