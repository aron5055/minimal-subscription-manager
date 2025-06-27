import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/lang";
import { ChartPie } from "lucide-react";
import React, { Suspense, useState } from "react";

// 1. 使用 React.lazy 动态导入我们的内容组件
const LazyDrawerContent = React.lazy(() =>
  import("./AnalyticsDrawerContent").then((module) => ({
    default: module.AnalyticsDrawerContent,
  })),
);

export default function AnalyticsDrawer() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        aria-label={t.analyse.label}
        onClick={() => setIsOpen(true)} // 点击时打开抽屉
      >
        <ChartPie style={{ width: "24px", height: "24px" }} />
      </Button>

      {isOpen && (
        <Suspense fallback={null}>
          <LazyDrawerContent open={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      )}
    </>
  );
}
