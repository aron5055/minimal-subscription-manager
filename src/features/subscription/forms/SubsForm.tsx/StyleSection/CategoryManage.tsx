import { AlertDialogWrapper } from "@/components/common/AlertDialogWrapper";
import { DialogWrapper } from "@/components/common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/contexts/LangContext";
import { useAllCats, useSubscription } from "@/contexts/SubsContext";
import type { Category } from "@/types/types";
import { Pencil, Plus, Settings, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";

export function CategoryManage() {
  const { t } = useI18n();
  const [_, dispatch] = useSubscription();
  const categories = useAllCats();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: nanoid(10),
        name: newCategoryName.trim(),
      };
      dispatch({ type: "ADD_CAT", cat: newCategory });
      setNewCategoryName("");
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      dispatch({
        type: "RENAME_CAT",
        id: editingId,
        name: editingName.trim(),
      });
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDeleteCategory = (id: string) => {
    dispatch({ type: "DELETE_CAT", id });
    setDeleteId(null);
  };

  return (
    <>
      <DialogWrapper
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={() => setOpen(true)}
          >
            <Settings className="size-4" />
            {t.subscription.form.category.manage}
          </Button>
        }
        title={t.subscription.form.category.manage}
        description={t.subscription.form.category.description}
        open={open}
        onOpenChange={setOpen}
        footer={
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            {t.subscription.form.category.cancel}
          </Button>
        }
      >
        <div className="w-full max-w-md space-y-4 py-4">
          {/* Add new category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t.subscription.form.category.add}
            </label>
            <div className="flex gap-2">
              <Input
                placeholder={t.subscription.form.category.name}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory();
                  }
                }}
              />
              <Button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                size="sm"
              >
                <Plus className="size-4" />
                {t.subscription.form.category.create}
              </Button>
            </div>
          </div>

          {/* Categories list */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.subscription.form.category.manage}
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-2 p-2 border rounded-md"
                  >
                    {editingId === category.id ? (
                      <>
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button
                          onClick={handleSaveEdit}
                          disabled={!editingName.trim()}
                          size="sm"
                          variant="outline"
                        >
                          {t.subscription.form.category.save}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          size="sm"
                          variant="ghost"
                        >
                          {t.subscription.form.category.cancel}
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm">{category.name}</span>
                        <Button
                          onClick={() => handleEditCategory(category)}
                          size="sm"
                          variant="ghost"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          onClick={() => setDeleteId(category.id)}
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogWrapper>

      {/* Delete confirmation dialog */}
      <AlertDialogWrapper
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
        title={t.subscription.form.category.delete}
        description={t.subscription.form.category.deleteConfirm}
        action={() => deleteId && handleDeleteCategory(deleteId)}
      />
    </>
  );
}
