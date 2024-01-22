function combineStyles(...styles: any) {
    return styles.join(" ");
}
const proseStyleBase = "prose prose-sm md:prose-base dark:prose-dark max-w-full";
const proseStyleheadings = "prose-headings:text-foreground/80 prose-headings:tracking-[-0.025em] prose-h4:my-[10px] prose-h3:my-[20px] prose-h2:mb-[20px]";
const proseStyleP = "prose-p:text-foreground/70 prose-p:my-[10px]";
const proseStyleStrong = "prose-strong:text-foreground/80";
const proseStyleUl = "prose-ul:pl-3";
const proseStyleLi = "prose-li:text-foreground/70";
const proseStyleA = "prose-a:after:content-['_↗'] prose-a:text-ddy-400 hover:prose-a:text-ddy-600 dark:prose-a:text-ddy-600 dark:hover:prose-a:text-ddy-400 prose-a:underline prose-a:underline-offset-4";
const proseStylePre = "prose-pre:my-[1px] prose-pre:rounded-md";
const proseStyleImg = "prose-img:my-[1px] prose-img:rounded-md dark:prose-img:brightness-90";
export const proseStyle = combineStyles(proseStyleStrong, proseStyleBase, proseStyleheadings, proseStyleP, proseStyleA, proseStylePre, proseStyleImg, proseStyleLi, proseStyleUl);
