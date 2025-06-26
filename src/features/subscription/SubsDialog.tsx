import { DialogWrapper } from "@/components/common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/lang";
import { useSubscription } from "@/contexts/subscription";
import { type Subscription } from "@/types/types";
import { useState, type ReactElement } from "react";
import { SubsForm } from "./forms/SubsForm.tsx/SubsForm";

interface SubsDialogProps {
  trigger?: ReactElement;
  sub?: Subscription;
  mode?: "add" | "edit";
}

export default function SubsDialog({
  sub,
  trigger,
  mode = "add",
}: SubsDialogProps) {
  const { t } = useI18n();
  const { dispatch } = useSubscription();
  const [open, setOpen] = useState(false);
  const formId = "subscription-form";

  const footer = (
    <Button type="submit" form={formId} className="w-full">
      {t.subscription.form.submit}
    </Button>
  );

  const onSubmit = (values: Subscription) => {
    if (mode === "add") {
      dispatch({ type: "ADD_SUB", payload: values });
    } else if (mode === "edit") {
      dispatch({ type: "UPDATE_SUB", payload: values });
    }
    setOpen(false);
  };

  return (
    <DialogWrapper
      title={mode === "add" ? t.subscription.add : t.subscription.edit}
      description={t.subscription.description}
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      footer={footer}
    >
      <SubsForm sub={sub} onSubmit={onSubmit} formId={formId} />
    </DialogWrapper>
  );
}
