import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortDesc } from "lucide-react";

export function SortMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <SortDesc size={24} />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
