function combineStyles(...styles: any) {
    return styles.join(" ");
}
const proseStyleBase = "prose prose-sm md:prose-base dark:prose-dark max-w-full";
const proseStyleheadings = "prose-headings:text-foreground/80 prose-headings:tracking-[-0.015em] prose-h4:my-[10px] prose-h3:my-[20px] prose-h2:mb-[20px]";
const proseStyleP = "prose-p:text-foreground/60 prose-p:my-[10px]";
const proseStyleA = "prose-a:text-sky-400 hover:prose-a:text-sky-500 dark:prose-a:text-sky-500 dark:hover:prose-a:text-sky-400 prose-a:underline prose-a:underline-offset-4";
const proseStylePre = "prose-pre:my-[1px] prose-pre:rounded-md";
const proseStyleImg = "prose-img:my-[1px] prose-img:rounded-md";
export const proseStyle = combineStyles(proseStyleBase, proseStyleheadings, proseStyleP, proseStyleA, proseStylePre, proseStyleImg);
