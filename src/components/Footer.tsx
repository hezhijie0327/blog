"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface FooterProps {
  className?: string;
}

interface CFInfo {
  ip: string;
  kex: string;
  warp: string;
  loc: string;
}

const INITIAL_CF_INFO: CFInfo = {
  ip: "获取中...",
  kex: "loading",
  warp: "unknown",
  loc: "unknown",
};

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [cfInfo, setCfInfo] = useState<CFInfo>(() => {
    if (typeof window !== "undefined") {
      const cached = window.sessionStorage.getItem("cf-trace-info");

      if (cached) {
        try {
          return JSON.parse(cached) as CFInfo;
        } catch {
          window.sessionStorage.removeItem("cf-trace-info");
        }
      }
    }

    return INITIAL_CF_INFO;
  });

  useEffect(() => {
    const cacheKey = "cf-trace-info";
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort("timeout");
    }, 5000);

    const updateInfo = (next: CFInfo) => {
      setCfInfo(next);
      window.sessionStorage.setItem(cacheKey, JSON.stringify(next));
    };

    const fetchInfo = async () => {
      try {
        const cfTraceUrl = `${window.location.origin}/cdn-cgi/trace`;
        const response = await fetch(cfTraceUrl, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (response.ok) {
          const text = await response.text();
          const lines = text.split("\n");
          const parsedData: Partial<CFInfo> = {};

          lines.forEach((line) => {
            const [key, value] = line.split("=");
            if (key && value) {
              switch (key) {
                case "ip":
                  parsedData.ip = value;
                  break;
                case "kex":
                  parsedData.kex = value;
                  break;
                case "warp":
                  parsedData.warp = value;
                  break;
                case "loc":
                  parsedData.loc = value;
                  break;
              }
            }
          });

          const next: CFInfo = {
            ip: parsedData.ip || "无法获取",
            kex: parsedData.kex || "unavailable",
            warp: parsedData.warp || "unknown",
            loc: parsedData.loc || "unknown",
          };

          updateInfo(next);
        } else {
          updateInfo({
            ip: "无法获取",
            kex: "unavailable",
            warp: "unknown",
            loc: "unknown",
          });
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          updateInfo({
            ip: "无法获取",
            kex: "unavailable",
            warp: "unknown",
            loc: "unknown",
          });
          return;
        }

        console.error("Failed to fetch info from Cloudflare trace:", error);
        updateInfo({
          ip: "无法获取",
          kex: "unavailable",
          warp: "unknown",
          loc: "unknown",
        });
      }
    };

    void fetchInfo();

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const getPostQuantumInfo = () => {
    if (cfInfo.kex === "X25519MLKEM768") {
      return { text: "后量子加密保护", color: "text-green-500", icon: "🔒" };
    } else if (cfInfo.kex === "loading") {
      return { text: "检测中...", color: "text-yellow-500", icon: "⏳" };
    } else if (cfInfo.kex === "unavailable") {
      return { text: "环境不支持检测", color: "text-slate-500", icon: "ℹ️" };
    } else {
      return { text: "标准加密", color: "text-orange-500", icon: "🔓" };
    }
  };

  const encryptionInfo = getPostQuantumInfo();

  return (
    <footer
      className={cn(
        "border-t border-border/70 bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col items-center justify-center space-y-1 text-center text-xs text-foreground/60">
          {/* 版权信息 */}
          <span>© {currentYear} Zhijie Online</span>

          {/* 网络和安全信息 */}
          <div className="flex flex-col items-center space-y-1 rounded-full border border-border/60 bg-card/70 px-4 py-1">
            {/* IP 地址和位置信息 */}
            <div className="flex items-center space-x-4 text-xs">
              <span className={cfInfo.warp === "on" ? "text-blue-500" : ""}>
                🌐 {cfInfo.ip}
                {cfInfo.loc !== "unknown" && cfInfo.loc !== ""
                  ? ` (${cfInfo.loc})`
                  : ""}
              </span>
            </div>

            {/* 加密信息 */}
            <div className="flex items-center space-x-1 text-xs">
              <span>{encryptionInfo.icon}</span>
              <span className={encryptionInfo.color}>
                {encryptionInfo.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
