import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Icon } from "@/types/types";
import { GenericIcons } from "./genericIcons";

export function renderIcon(icon: Icon) {
  switch (icon.type) {
    case "favicon":
      return (
        <>
          <AvatarImage src={icon.url} alt="icon" />
          <AvatarFallback />
        </>
      );
    case "builtin": {
      const Builtin = GenericIcons[icon.name];
      return (
        <AvatarFallback className="flex justify-center items-center">
          <Builtin className="w-6 h-6" />
        </AvatarFallback>
      );
    }

    case "text":
      return (
        <AvatarFallback>{icon.text.slice(0, 2).toUpperCase()}</AvatarFallback>
      );

    case "empty":
    default:
      return <AvatarFallback />;
  }
}
