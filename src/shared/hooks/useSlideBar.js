
import { useState } from "react";

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return {
    collapsed,
    toggleSidebar,
  };
}