import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useI18n } from "@/contexts/LangContext";
import { SortDesc } from "lucide-react";

export function SortFilterMenu() {
  const { t } = useI18n();

  return (
    <Drawer>
      <DrawerTrigger className="focus:outline-none">
        <SortDesc size={24} />
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader>
            <DrawerTitle className="text-center">{`${t.sort.label}&${t.filter.label}`}</DrawerTitle>
            <DrawerDescription className="sr-only">{`${t.sort.label}&${t.filter.label}`}</DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
              <div>
                <Label>{t.sort.label}</Label>
                <RadioGroup>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-title" />
                    <Label htmlFor="option-title">{t.sort.by.title}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-five" id="option-date" />
                    <Label htmlFor="option-date">{t.sort.by.date}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-price-max" />
                    <Label htmlFor="option-price-max">
                      {t.sort.by.priceMax}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="option-three"
                      id="option-price-min"
                    />
                    <Label htmlFor="option-price-min">
                      {t.sort.by.priceMin}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-four" id="option-category" />
                    <Label htmlFor="option-category">
                      {t.sort.by.category}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>{t.filter.label}</Label>
                <div>
                  <Checkbox id="filter-active" />
                  <Label htmlFor="filter-active">{t.filter.by.active}</Label>
                </div>
                <div>
                  <Checkbox id="filter-paused" />
                  <Label htmlFor="filter-paused">{t.filter.by.paused}</Label>
                </div>
                <div>
                  <Label>{t.filter.by.category}</Label>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{t.common.close}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
