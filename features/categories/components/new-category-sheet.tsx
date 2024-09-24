import { z } from "zod";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { insertCategorySchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

    const mutation = useCreateCategory();

    const formSchema = insertCategorySchema.pick({
        name: true,
    });

    type FormValues = z.input<typeof formSchema>;

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>
                        Creat a new category to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{ name: "" }}
                />
            </SheetContent>
        </Sheet>
    );
};
