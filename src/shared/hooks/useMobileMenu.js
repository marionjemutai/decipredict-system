import { useState } from "react";

export function useMobileMenu(initialState = false) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(initialState);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return { mobileMenuOpen, toggleMobileMenu };
}