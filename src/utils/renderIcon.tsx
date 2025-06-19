import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFaviconUrl } from "@/lib/utils";
import type { Icon } from "@/types/types";
import { GenericIcons } from "../utils/genericIcons";

export function renderIcon(icon: Icon) {
  switch (icon.type) {
    case "favicon":
      return (
        <>
          <AvatarImage src={getFaviconUrl(icon.url)} alt="icon" />
          <AvatarFallback />
        </>
      );
    case "builtin": {
      const Builtin = GenericIcons[icon.name];
      return (
        <AvatarFallback>
          <Builtin style={{ width: "30px", height: "30px" }} />
        </AvatarFallback>
      );
    }

    case "text":
      return (
        <AvatarFallback className="text-xl">
          {icon.text.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      );

    case "empty":
    default:
      return <AvatarFallback />;
  }
}
