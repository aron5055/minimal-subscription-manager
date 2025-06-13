import { getFaviconUrl } from "@/lib/utils";
import debounce from "lodash.debounce";
import { useMemo, useState, useEffect } from "react";

export function useFavicon(url: string, delay = 500) {
    const [favicon, setFavicon] = useState("");

    const update = useMemo(() => {
        return debounce((u: string) => {
            setFavicon(getFaviconUrl(u))
        }, delay)
    }, [delay]);

    useEffect(() => {
        update(url)
        return () => update.cancel()
    }, [url, delay])

    return favicon;
}