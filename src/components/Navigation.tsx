"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Code, PenTool, Heart, GitBranch } from "lucide-react";

const navigation = [
  { name: "首页", href: "/", icon: Home },
  { name: "项目", href: "/projects", icon: Code },
  { name: "博客", href: "/blogs", icon: PenTool },
  { name: "支持", href: "/donation", icon: Heart },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isPathActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/70 text-foreground backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-xl object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              治杰 Online
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 rounded-full border border-border/80 bg-card/70 px-2 py-1 shadow-sm">
            {navigation.map((item) => {
              const isActive = isPathActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center space-x-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/12 text-primary"
                      : "text-foreground/70 hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* GitHub link */}
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/hezhijie0327"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="访问 GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden border-t border-border transition-all duration-300",
            isMenuOpen ? "max-h-80 py-4 opacity-100" : "max-h-0 py-0 opacity-0",
          )}
        >
          <div className="flex flex-col space-y-2">
            {navigation.map((item) => {
              const isActive = isPathActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/75 hover:bg-accent/70 hover:text-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
