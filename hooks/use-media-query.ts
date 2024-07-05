import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateMatch);
    window.addEventListener("resize", updateMatch);

    setMatches(mediaQueryList.matches);

    // Hủy bỏ lắng nghe khi component unmount
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
      window.removeEventListener("resize", updateMatch);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
