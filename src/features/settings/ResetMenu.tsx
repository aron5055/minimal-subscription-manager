import { AlertDialogWrapper } from "@/components/common/AlertDialogWrapper";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/lang";
import { useSubscription } from "@/contexts/subscription";
import { X } from "lucide-react";
import { forwardRef } from "react";

export const ResetMenu = forwardRef<HTMLButtonElement>(({}, ref) => {
  const { t } = useI18n();
  const { dispatch } = useSubscription();

  return (
    <AlertDialogWrapper
      title={t.settings.reset.label}
      description={t.settings.reset.description}
      action={() => {
        dispatch({ type: "RESET_SUB" });
        dispatch({ type: "RESET_CAT" });
      }}
      trigger={
        <Button
          variant="ghost"
          className="p-3 w-full hover:bg-red-500 hover:text-white justify-normal"
          ref={ref}
        >
          <X />
          {t.settings.reset.label}
        </Button>
      }
    />
  );
});
