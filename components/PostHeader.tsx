import { format } from "date-fns";

interface PostHeaderProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
}

export default function PostHeader({ title, category, date, readTime }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <div className="mb-6 flex items-center gap-3 text-sm">
        <span className="font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider text-xs">
          {category}
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-8">
        {title}
      </h1>
      
      <div className="flex items-center gap-4 py-6 border-y border-border">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
          <div className="font-medium text-foreground">Instabiogen.online Editorial</div>
          <span className="hidden sm:inline">&middot;</span>
          <div className="flex items-center gap-3">
            <time dateTime={date}>{format(new Date(date), "MMM d, yyyy")}</time>
            <span>&middot;</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

