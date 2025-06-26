import { AlertDialogWrapper } from "@/components/common/AlertDialogWrapper";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/LangContext";
import { useSubscription } from "@/contexts/SubsContext";
import { Trash } from "lucide-react";
import { forwardRef } from "react";

interface DeleteDialogProps {
  subId: string;
  title: string;
}

export const DeleteDialog = forwardRef<HTMLButtonElement, DeleteDialogProps>(
  ({ subId, title }, ref) => {
    const { t } = useI18n();
    const [_, dispatch] = useSubscription();

    return (
      <AlertDialogWrapper
        title={t.card.delete.label}
        description={`${t.card.delete.description} ${title} ?`}
        action={() => {
          dispatch({ type: "DELETE_SUB", id: subId });
        }}
        trigger={
          <Button
            variant="outline"
            ref={ref}
            className="flex items-center gap-2 h-8"
            aria-label={t.card.delete.label}
          >
            <Trash />
          </Button>
        }
      />
    );
  },
);
