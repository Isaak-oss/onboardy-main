import { usePathname } from "next/navigation";
import { languagesList } from "../configs/locales/languagesList.ts";

export function useCleanPathname() {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) || [""];

  if (languagesList.includes(segments[0])) {
    segments.shift();
  }

  return "/" + segments.join("/");
}
