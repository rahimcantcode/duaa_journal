"use client";

import { useState, useTransition } from "react";
import { Heart, PencilLine, Plus, Trash2 } from "lucide-react";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { CategoryReadingView } from "@/components/journal/category-reading-view";
import { DuaaEntryCard } from "@/components/ui/duaa-entry-card";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { JournalCategoryCard } from "@/components/ui/journal-category-card";
import { JourneyScrollPath } from "@/components/ui/journey-scroll-path";
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { SoftButton } from "@/components/ui/soft-button";
import { SoftInput } from "@/components/ui/soft-input";
import { createCategory, deleteCategory, updateCategory } from "@/lib/data/categories";
import { createDua, deleteDua, toggleFavorite, updateDua } from "@/lib/data/duas";
import { getJournalCategoryPresentation } from "@/lib/data/journal-categories";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Category, Dua, FeedbackState, FriendDuaRequest } from "@/lib/types/app";

type JournalPageClientProps = {
  userId: string;
  initialCategories: Category[];
  initialDuas: Dua[];
  initialFriendRequests: FriendDuaRequest[];
  userName: string;
};

type ComposerDraft = {
  categoryId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  newCategoryName: string;
};

type SheetView = "category" | "composer" | "rename" | "delete";
type JournalTab = "mine" | "friends";

const emptyDraft: ComposerDraft = {
  categoryId: "",
  title: "",
  content: "",
  isFavorite: false,
  newCategoryName: "",
};

function formatRequestDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function JournalPageClient({
  userId,
  initialCategories,
  initialDuas,
  initialFriendRequests,
  userName,
}: JournalPageClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [duas, setDuas] = useState(initialDuas);
  const [friendRequests] = useState(initialFriendRequests);
  const [activeTab, setActiveTab] = useState<JournalTab>("mine");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [readingCategoryId, setReadingCategoryId] = useState<string | null>(null);
  const [sheetView, setSheetView] = useState<SheetView | null>(null);
  const [editingDuaId, setEditingDuaId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ComposerDraft>(emptyDraft);
  const [renameValue, setRenameValue] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isPending, startTransition] = useTransition();

  const categoryCards = categories.map((category, index) => {
    const presentation = getJournalCategoryPresentation(category.name, index);
    const entries = duas.filter(
      (dua) => dua.category_id === category.id || (!dua.category_id && dua.category === category.name),
    );
    const recentEntry = entries[0];

    return {
      id: category.id,
      title: category.name,
      description: presentation.description,
      accent: presentation.accent,
      countLabel: `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`,
      quote: recentEntry?.content ?? presentation.emptyQuote,
      entries,
    };
  });

  const activeCategory = categoryCards.find((category) => category.id === activeCategoryId) ?? null;
  const activeEntries = activeCategory?.entries ?? [];
  const readingCategory = categoryCards.find((category) => category.id === readingCategoryId) ?? null;
  const categorySelectOptions = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  function openCategory(categoryId: string) {
    setActiveCategoryId(categoryId);
    setSheetView("category");
    resetEditor();
  }

  function beginCreate(categoryId?: string) {
    setActiveCategoryId(categoryId ?? null);
    setSheetView("composer");
    setEditingDuaId(null);
    setDraft({
      ...emptyDraft,
      categoryId: categoryId ?? "",
    });
    setShowNewCategoryInput(false);
    setFeedback(null);
  }

  function beginEdit(dua: Dua) {
    setReadingCategoryId(null);
    setActiveCategoryId(dua.category_id ?? categories.find((item) => item.name === dua.category)?.id ?? null);
    setSheetView("composer");
    setEditingDuaId(dua.id);
    setDraft({
      categoryId: dua.category_id ?? categories.find((item) => item.name === dua.category)?.id ?? "",
      title: dua.title ?? "",
      content: dua.content,
      isFavorite: dua.is_favorite,
      newCategoryName: "",
    });
    setShowNewCategoryInput(false);
    setFeedback(null);
  }

  function beginRenameCategory() {
    if (!activeCategory) return;
    setRenameValue(activeCategory.title);
    setSheetView("rename");
    setFeedback(null);
  }

  function beginDeleteCategory() {
    if (!activeCategory) return;
    setSheetView("delete");
    setFeedback(null);
  }

  function resetEditor() {
    setEditingDuaId(null);
    setDraft(emptyDraft);
    setRenameValue("");
    setShowNewCategoryInput(false);
  }

  function closeSheet() {
    setSheetView(null);
    resetEditor();
    setFeedback(null);
  }

  function openCategoryReader(categoryId: string) {
    setReadingCategoryId(categoryId);
    setSheetView(null);
    resetEditor();
    setFeedback(null);
  }

  async function ensureChosenCategory() {
    const supabase = getSupabaseBrowserClient();
    const selectedCategory = categories.find((category) => category.id === draft.categoryId);

    if (selectedCategory) {
      return selectedCategory;
    }

    if (!draft.newCategoryName.trim()) {
      throw new Error("Choose a category or create a new one first.");
    }

    const createdCategory = await createCategory(supabase, {
      user_id: userId,
      name: draft.newCategoryName.trim(),
    });

    setCategories((current) => [...current, createdCategory]);
    setDraft((current) => ({
      ...current,
      categoryId: createdCategory.id,
      newCategoryName: "",
    }));
    setShowNewCategoryInput(false);

    return createdCategory;
  }

  function handleSaveDua() {
    if (!draft.content.trim()) {
      setFeedback({ type: "error", message: "Write a little duaa before saving." });
      return;
    }

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const chosenCategory = await ensureChosenCategory();

        if (editingDuaId) {
          const updated = await updateDua(supabase, editingDuaId, {
            category_id: chosenCategory.id,
            category: chosenCategory.name,
            title: draft.title.trim() || null,
            content: draft.content.trim(),
            is_favorite: draft.isFavorite,
          });

          setDuas((current) => current.map((dua) => (dua.id === updated.id ? updated : dua)));
          setFeedback({ type: "success", message: "Duaa updated." });
          setSheetView("category");
          setActiveCategoryId(chosenCategory.id);
          resetEditor();
          return;
        }

        const created = await createDua(supabase, {
          user_id: userId,
          category_id: chosenCategory.id,
          category: chosenCategory.name,
          title: draft.title.trim() || null,
          content: draft.content.trim(),
          is_favorite: draft.isFavorite,
        });

        setDuas((current) => [created, ...current]);
        setFeedback({ type: "success", message: "Duaa saved." });
        setSheetView("category");
        setActiveCategoryId(chosenCategory.id);
        resetEditor();
      } catch (error) {
        setFeedback({
          type: "error",
          message: error instanceof Error ? error.message : "Something went wrong while saving.",
        });
      }
    });
  }

  function handleDelete(duaId: string) {
    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        await deleteDua(supabase, duaId);
        setDuas((current) => current.filter((dua) => dua.id !== duaId));
        setFeedback({ type: "success", message: "Duaa deleted." });
      } catch {
        setFeedback({ type: "error", message: "Unable to delete this entry right now." });
      }
    });
  }

  function handleFavorite(dua: Dua) {
    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const updated = await toggleFavorite(supabase, dua.id, dua.is_favorite);
        setDuas((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      } catch {
        setFeedback({ type: "error", message: "Unable to update favorites right now." });
      }
    });
  }

  function handleRenameCategory() {
    if (!activeCategory || !renameValue.trim()) {
      setFeedback({ type: "error", message: "Give the category a name first." });
      return;
    }

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const updatedCategory = await updateCategory(supabase, activeCategory.id, renameValue.trim());

        setCategories((current) =>
          current.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)),
        );
        setDuas((current) =>
          current.map((dua) =>
            dua.category_id === updatedCategory.id
              ? { ...dua, category: updatedCategory.name }
              : dua,
          ),
        );
        setSheetView("category");
        setFeedback({ type: "success", message: "Category renamed." });
      } catch (error) {
        setFeedback({
          type: "error",
          message: error instanceof Error ? error.message : "Unable to rename this category right now.",
        });
      }
    });
  }

  function handleDeleteCategory() {
    if (!activeCategory) return;

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        await deleteCategory(supabase, activeCategory.id);
        setCategories((current) => current.filter((category) => category.id !== activeCategory.id));
        setActiveCategoryId(null);
        closeSheet();
      } catch (error) {
        setFeedback({
          type: "error",
          message: error instanceof Error ? error.message : "Unable to delete this category right now.",
        });
      }
    });
  }

  const sheetTitle =
    sheetView === "composer"
      ? editingDuaId
        ? "Edit duaa"
        : "Add a duaa"
      : sheetView === "rename"
        ? "Rename category"
        : sheetView === "delete"
          ? "Delete category"
          : activeCategory?.title ?? "";

  const sheetDescription =
    sheetView === "composer"
      ? "Choose the right chapter for this duaa, or create a new one softly."
      : sheetView === "rename"
        ? "Give this chapter a name that still feels calm and clear."
        : sheetView === "delete"
          ? "This only works when the category is empty, so no duaas are lost."
          : activeCategory?.description ?? "";

  return (
    <>
      <PageShell className="relative gap-10 overflow-hidden pb-32 pt-6">
        <JourneyScrollPath />

        <SectionHeader
          eyebrow="Your journal"
          title={`The duaas ${userName.split(" ")[0]} is carrying, held with softness.`}
          description="Move slowly through each category. Every card opens into a more private layer of reflection."
          className="relative z-10"
        />

        <section className="relative z-10 rounded-full border border-white/70 bg-white/68 p-1.5 shadow-[0_18px_42px_rgba(96,111,93,0.09)] backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "mine" as const, label: "My duas", count: duas.length },
              { id: "friends" as const, label: "Friends' duas", count: friendRequests.length },
            ].map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    closeSheet();
                  }}
                  className={`rounded-full px-4 py-3 text-sm font-medium transition-[background-color,box-shadow,color,transform] duration-300 active:scale-[0.985] ${
                    isActive
                      ? "bg-[rgba(237,243,235,0.96)] text-[var(--sage-deep)] shadow-[0_12px_30px_rgba(106,118,99,0.12)]"
                      : "text-[rgba(122,122,122,0.86)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="ml-2 rounded-full bg-white/72 px-2 py-0.5 text-[11px]">{tab.count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {activeTab === "mine" ? (
          <>
            <section className="relative z-10 rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.96))] p-6 shadow-[0_28px_78px_rgba(110,126,107,0.15)] backdrop-blur-sm sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.8)]">
                    Today&apos;s intention
                  </p>
                  <p className="font-display text-[2.2rem] leading-[0.95] text-[var(--foreground)] sm:text-[2.45rem]">
                    May what is meant for me arrive with ease.
                  </p>
                </div>
                <div className="rounded-[24px] bg-[rgba(237,243,235,0.82)] px-3 py-2 text-[10px] font-medium tracking-[0.12em] text-[rgba(93,115,89,0.74)] uppercase">
                  {duas.length} entries
                </div>
              </div>
            </section>

            <section className="relative z-10 space-y-6">
              {categoryCards.map((category, index) => (
                <JournalCategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  onOpen={() => openCategory(category.id)}
                  onOpenFullView={() => openCategoryReader(category.id)}
                />
              ))}
            </section>

            <FloatingActionButton label="Add duaa" onClick={() => beginCreate()}>
              <Plus className="h-5 w-5" />
            </FloatingActionButton>
          </>
        ) : (
          <section className="relative z-10 space-y-4">
            <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,252,250,0.96))] p-6 shadow-[0_28px_78px_rgba(110,126,107,0.13)] backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(122,122,122,0.8)]">
                    From loved ones
                  </p>
                  <h2 className="font-display text-[2.1rem] leading-none text-[var(--foreground)]">
                    Prayers entrusted to you
                  </h2>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                    Requests friends left for you to carry with you during Hajj.
                  </p>
                </div>
                <div className="rounded-full bg-[var(--accent-soft)] p-3 text-[var(--sage-deep)]">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
            </div>

            {friendRequests.length ? (
              friendRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(251,252,250,0.95))] p-5 shadow-[0_18px_42px_rgba(96,111,93,0.09)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-medium text-[var(--foreground)]">{request.name}</p>
                    <p className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-medium text-[var(--sage-deep)]">
                      {formatRequestDate(request.created_at)}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                    &ldquo;{request.dua_request}&rdquo;
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-[28px] border border-white/70 bg-white/82 p-5 text-center shadow-[0_18px_42px_rgba(96,111,93,0.08)]">
                <p className="font-display text-3xl leading-none text-[var(--foreground)]">
                  Nothing has been left here yet.
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  When loved ones leave duaa requests, they&apos;ll appear here softly.
                </p>
              </article>
            )}
          </section>
        )}

        <MobileBottomNav />
      </PageShell>

      <BottomSheet
        isOpen={Boolean(sheetView && (sheetView !== "category" || activeCategory))}
        onClose={closeSheet}
        title={sheetTitle}
        description={sheetDescription}
      >
        {feedback ? (
          <p className="mb-4 rounded-[20px] bg-white/75 px-4 py-3 text-sm leading-6 text-[var(--muted-foreground)]">
            {feedback.message}
          </p>
        ) : null}

        {sheetView === "composer" ? (
          <div className="mb-5 space-y-4 rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_14px_30px_rgba(95,108,92,0.08)]">
            <div className="space-y-3 rounded-[22px] bg-white/65 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--foreground)]">Category</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {showNewCategoryInput
                      ? "Create a fresh category for this duaa."
                      : "Choose one of your existing categories."}
                  </p>
                </div>
                {showNewCategoryInput ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setDraft((current) => ({
                        ...current,
                        newCategoryName: "",
                      }));
                    }}
                    className="text-sm text-[var(--sage-deep)]"
                  >
                    Use existing instead
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(true);
                      setDraft((current) => ({
                        ...current,
                        categoryId: "",
                        newCategoryName: "",
                      }));
                    }}
                    className="text-sm text-[var(--sage-deep)]"
                  >
                    + New category
                  </button>
                )}
              </div>

              {showNewCategoryInput ? (
                <div className="space-y-3 rounded-[20px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.96))] p-3">
                  <SoftInput
                    label="New category name"
                    placeholder="For My Health"
                    value={draft.newCategoryName}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        newCategoryName: event.target.value,
                        categoryId: "",
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setDraft((current) => ({
                        ...current,
                        newCategoryName: "",
                      }));
                    }}
                    className="text-sm text-[var(--muted-foreground)]"
                  >
                    Cancel new category
                  </button>
                </div>
              ) : (
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">Choose category</span>
                  <select
                    value={draft.categoryId}
                    onChange={(event) => setDraft((current) => ({ ...current, categoryId: event.target.value }))}
                    className="h-14 w-full rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.95))] px-4 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-[rgba(146,174,141,0.78)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(168,191,163,0.16)]"
                  >
                    <option value="">Choose a category</option>
                    {categorySelectOptions.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <SoftInput
              label="Title"
              placeholder="A short title"
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Duaa</span>
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
                rows={5}
                className="w-full rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(251,252,250,0.95))] px-4 py-3 text-[15px] text-[var(--foreground)] outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-[rgba(146,174,141,0.78)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(168,191,163,0.16)]"
                placeholder="Write what is in your heart."
              />
            </label>
            <button
              type="button"
              onClick={() => setDraft((current) => ({ ...current, isFavorite: !current.isFavorite }))}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm text-[var(--sage-deep)]"
            >
              <Heart className={`h-4 w-4 ${draft.isFavorite ? "fill-current" : ""}`} />
              Mark as favorite
            </button>
            <div className="flex gap-3">
              <SoftButton className="flex-1 justify-center" onClick={handleSaveDua} disabled={isPending}>
                {isPending ? "Saving" : "Save duaa"}
              </SoftButton>
              <SoftButton className="flex-1 justify-center" variant="ghost" onClick={closeSheet} disabled={isPending}>
                Cancel
              </SoftButton>
            </div>
          </div>
        ) : sheetView === "rename" ? (
          <div className="space-y-4 rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_14px_30px_rgba(95,108,92,0.08)]">
            <SoftInput
              label="Category name"
              placeholder="For My Family"
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
            />
            <div className="flex gap-3">
              <SoftButton className="flex-1 justify-center" onClick={handleRenameCategory} disabled={isPending}>
                {isPending ? "Saving" : "Save name"}
              </SoftButton>
              <SoftButton className="flex-1 justify-center" variant="ghost" onClick={() => setSheetView("category")}>
                Cancel
              </SoftButton>
            </div>
          </div>
        ) : sheetView === "delete" ? (
          <div className="space-y-4 rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_14px_30px_rgba(95,108,92,0.08)]">
            <p className="text-sm leading-7 text-[var(--muted-foreground)]">
              {activeEntries.length
                ? "This category still has duaas inside it. Move or delete them first, then return here."
                : "This category is empty, so it can be removed safely."}
            </p>
            <div className="flex gap-3">
              <SoftButton
                className="flex-1 justify-center"
                variant="secondary"
                onClick={() => setSheetView("category")}
              >
                Go back
              </SoftButton>
              <SoftButton
                className="flex-1 justify-center"
                onClick={handleDeleteCategory}
                disabled={isPending || activeEntries.length > 0}
              >
                {isPending ? "Deleting" : "Delete category"}
              </SoftButton>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
          {activeEntries.length ? (
            activeEntries.map((entry) => (
              <DuaaEntryCard
                key={entry.id}
                entry={entry}
                onDelete={() => handleDelete(entry.id)}
                onEdit={() => beginEdit(entry)}
                onToggleFavorite={() => handleFavorite(entry)}
              />
            ))
          ) : (
            <article className="rounded-[24px] border border-white/70 bg-white/85 p-4 text-sm leading-7 text-[var(--muted-foreground)] shadow-[0_14px_30px_rgba(95,108,92,0.08)]">
              This category is still quiet. Add the first duaa when you&apos;re ready.
            </article>
          )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
          <SoftButton className="justify-center" onClick={() => activeCategory && beginCreate(activeCategory.id)}>
            Add entry
          </SoftButton>
          <SoftButton className="justify-center" variant="secondary" onClick={beginRenameCategory}>
            <PencilLine className="h-4 w-4" />
            Rename
          </SoftButton>
          <SoftButton className="justify-center" variant="ghost" onClick={beginDeleteCategory}>
            <Trash2 className="h-4 w-4" />
            Delete
          </SoftButton>
          <SoftButton className="justify-center" variant="secondary" onClick={closeSheet}>
            Close
          </SoftButton>
            </div>
          </>
        )}
      </BottomSheet>

      <CategoryReadingView
        isOpen={Boolean(readingCategory)}
        title={readingCategory?.title ?? ""}
        description={readingCategory?.description ?? ""}
        entries={readingCategory?.entries ?? []}
        onClose={() => setReadingCategoryId(null)}
        onEdit={beginEdit}
      />
    </>
  );
}
