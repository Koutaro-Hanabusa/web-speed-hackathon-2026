import { useEffect, useRef, useState } from "react";

export function useSearchParams(): [URLSearchParams] {
  const [searchParams, setSearchParams] = useState(
    () => new URLSearchParams(window.location.search),
  );
  const lastSearchRef = useRef(window.location.search);

  useEffect(() => {
    const handleChange = () => {
      const currentSearch = window.location.search;
      if (currentSearch !== lastSearchRef.current) {
        lastSearchRef.current = currentSearch;
        setSearchParams(new URLSearchParams(currentSearch));
      }
    };

    window.addEventListener("popstate", handleChange);
    return () => {
      window.removeEventListener("popstate", handleChange);
    };
  }, []);

  return [searchParams];
}
