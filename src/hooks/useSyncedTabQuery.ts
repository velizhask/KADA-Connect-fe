import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSyncedTabQuery = (
  defaultTab: string,
  validTabs: string[]
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    validTabs.includes(tabParam || "") ? tabParam : defaultTab
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    if (validTabs.includes(tabParam || "")) {
      setActiveTab(tabParam || defaultTab);
    }
  }, [tabParam, validTabs, defaultTab]);

  return { activeTab, handleTabChange };
};
