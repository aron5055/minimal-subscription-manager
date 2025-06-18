import DialogWrapper from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/LangContext";
import { type Subscription } from "@/types/types";
import { IoAdd } from "react-icons/io5";
import SubsForm from "./SubsForm.tsx/SubsForm";

interface SubsDialogProps {
  sub?: Subscription;
}

export default function SubsDialog({ sub }: SubsDialogProps) {
  const { t } = useI18n();

  const Trigger = (
    <Button aria-label={t.subscription.label}>
      <IoAdd />
    </Button>
  );

  const Footer = <Button>{t.subscription.form.submit}</Button>;

  const onSubmit = (values: Subscription) => {
    console.log("Submitted values:", values);
    // TODO: 实现提交逻辑
  };

  return (
    <DialogWrapper
      title={t.subscription.label}
      description={t.subscription.description}
      trigger={Trigger}
      footer={Footer}
    >
      <SubsForm sub={sub} onSubmit={onSubmit} />
    </DialogWrapper>
  );
}
