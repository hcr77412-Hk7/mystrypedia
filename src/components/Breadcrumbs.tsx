import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  articleTitle: string;
  onNavigate: (path: string) => void;
}

export function Breadcrumbs({ category, articleTitle, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center text-xs text-[#B8C0CC] py-3 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center gap-1 text-[#B8C0CC] hover:text-[#D6A84F] transition-colors"
          >
            <Home className="h-3 w-3 text-[#D6A84F]" />
            <span>Archive</span>
          </a>
        </li>
        <li className="flex items-center text-[#52647D]" aria-hidden="true">
          <ChevronRight className="h-3 w-3" />
        </li>
        <li className="inline-flex items-center">
          <span className="text-[#38B7A5] font-semibold">{category}</span>
        </li>
        <li className="flex items-center text-[#52647D]" aria-hidden="true">
          <ChevronRight className="h-3 w-3" />
        </li>
        <li className="inline-flex items-center text-[#F4EBDD] truncate max-w-[200px] sm:max-w-xs md:max-w-md">
          <span aria-current="page" className="truncate">{articleTitle}</span>
        </li>
      </ol>
    </nav>
  );
}
