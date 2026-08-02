"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-neutral-200 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.label} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-neutral-500 transition hover:text-neutral-900"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-neutral-900">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  size={16}
                  className="mx-2 text-neutral-400"
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}