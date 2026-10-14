import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -60% 0%',
        threshold: 0
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav aria-label="Table of Contents" className="rounded-xl border border-[#52647D]/30 bg-[#171C28] p-5 text-xs shadow-md">
      <div className="flex items-center justify-between pb-3.5 border-b border-[#52647D]/25">
        <div className="flex items-center gap-2 font-semibold text-[#F4EBDD] uppercase tracking-wider text-[11px] font-sans">
          <List className="h-3.5 w-3.5 text-[#D6A84F]" />
          <span>Investigation Index</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#B8C0CC] hover:text-[#F4EBDD] p-1 rounded md:hidden"
          aria-label="Toggle Table of Contents"
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      <div className={`mt-3.5 space-y-1.5 transition-all ${isCollapsed ? 'hidden md:block' : 'block'}`}>
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToHeading(e, item.id)}
              className={`block py-1.5 px-2.5 rounded transition-all duration-150 leading-snug ${
                isActive
                  ? 'bg-[#D6A84F]/15 text-[#D6A84F] font-semibold border-l-2 border-[#D6A84F]'
                  : 'text-[#B8C0CC] hover:text-[#F4EBDD] hover:bg-[#101827]/60'
              }`}
            >
              <span className="font-mono text-[#52647D] mr-2 text-[10px]">{String(idx + 1).padStart(2, '0')}.</span>
              <span>{item.title}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
