import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Bell, CalendarDays, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNotifications } from "../hooks/useQueries";

const FALLBACK = [
  {
    title: "ग्राम पंचायत बैठक 25 मार्च को",
    message:
      "सभी पंच एवं वार्ड सदस्यों को सूचित किया जाता है कि 25 मार्च को बैठक आयोजित होगी।",
    category: "Alert",
    date: BigInt(Date.now() * 1_000_000),
  },
  {
    title: "PM आवास योजना आवेदन शुरू",
    message:
      "प्रधानमंत्री आवास योजना ग्रामीण के लिए आवेदन प्रारंभ हो गए हैं। पात्र परिवार 31 मार्च तक आवेदन करें।",
    category: "General",
    date: BigInt((Date.now() - 86400000) * 1_000_000),
  },
  {
    title: "होली उत्सव 14 मार्च को",
    message:
      "ग्राम पंचायत भवन में होली मिलन समारोह का आयोजन किया जाएगा। सभी ग्रामवासी आमंत्रित हैं।",
    category: "Event",
    date: BigInt((Date.now() - 172800000) * 1_000_000),
  },
  {
    title: "नल जल योजना अपडेट",
    message: "जल जीवन मिशन के अंतर्गत 200 घरों में नल कनेक्शन पूर्ण हो गया है।",
    category: "General",
    date: BigInt((Date.now() - 259200000) * 1_000_000),
  },
  {
    title: "वार्ड सभा सूचना",
    message:
      "वार्ड नं. 3 एवं 4 की सभा 20 मार्च को प्रातः 10 बजे होगी। सभी निवासी उपस्थित रहें।",
    category: "Alert",
    date: BigInt((Date.now() - 345600000) * 1_000_000),
  },
  {
    title: "स्वास्थ्य शिविर 22 मार्च",
    message: "निःशुल्क स्वास्थ्य जांच शिविर का आयोजन ग्राम पंचायत भवन में होगा।",
    category: "Event",
    date: BigInt((Date.now() - 432000000) * 1_000_000),
  },
];

const CATEGORIES = ["All", "Alert", "Event", "General"];

const CATEGORY_META: Record<
  string,
  {
    icon: React.ElementType;
    border: string;
    bg: string;
    badge: string;
    dot: string;
    label: string;
  }
> = {
  Alert: {
    icon: AlertTriangle,
    border: "border-l-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700 border-red-300",
    dot: "bg-red-500",
    label: "⚠ Alert",
  },
  Event: {
    icon: CalendarDays,
    border: "border-l-green-500",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-700 border-green-300",
    dot: "bg-green-500",
    label: "📅 Event",
  },
  General: {
    icon: Info,
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700 border-blue-300",
    dot: "bg-blue-500",
    label: "ℹ General",
  },
};

const FILTER_ACTIVE_STYLES: Record<string, string> = {
  All: "bg-gradient-to-r from-nav-orange to-orange-500 text-white shadow-md shadow-orange-200",
  Alert:
    "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md shadow-red-200",
  Event:
    "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200",
  General:
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200",
};

function formatDate(date: bigint): string {
  const ms = Number(date) / 1_000_000;
  return new Date(ms).toLocaleDateString("hi-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Notifications() {
  const [filter, setFilter] = useState("All");
  const { data: notifications, isLoading } = useNotifications();
  const items =
    notifications && notifications.length > 0 ? notifications : FALLBACK;
  const filtered =
    filter === "All" ? items : items.filter((n) => n.category === filter);

  return (
    <main>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nav-blue via-blue-700 to-indigo-800 py-10 px-4">
        {/* decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-white/5" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4"
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                duration: 0.8,
              }}
              className="bg-white/15 backdrop-blur p-3 rounded-2xl"
            >
              <Bell size={32} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-devanagari leading-tight">
                सूचनाएं
              </h1>
              <p className="text-blue-200 text-sm mt-0.5">
                Notifications — Alerts, Events &amp; Announcements
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {["Alert", "Event", "General"].map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1"
              >
                <span
                  className={`w-2 h-2 rounded-full ${CATEGORY_META[cat].dot}`}
                />
                <span className="text-white/80 text-xs font-medium">{cat}</span>
                <span className="text-white/60 text-xs">
                  ({items.filter((n) => n.category === cat).length})
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-7 flex-wrap"
          data-ocid="notifications.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              data-ocid={`notifications.filter.${cat.toLowerCase()}.button`}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === cat
                  ? FILTER_ACTIVE_STYLES[cat]
                  : "bg-white border border-border text-muted-foreground hover:border-nav-blue hover:text-nav-blue"
              }`}
            >
              {cat === "All" ? "सभी | All" : cat}
              {filter === cat && (
                <motion.span
                  layoutId="filter-pill-indicator"
                  className="absolute inset-0 rounded-full ring-2 ring-white/40"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-4" data-ocid="notifications.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="notifications.empty_state"
          >
            <Card className="border-dashed border-2">
              <CardContent className="py-16 text-center text-muted-foreground">
                <Bell size={44} className="mx-auto mb-3 opacity-20" />
                <p className="font-devanagari text-sm">कोई सूचना नहीं</p>
                <p className="text-xs mt-1">No notifications found</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div className="space-y-4" data-ocid="notifications.list">
            <AnimatePresence mode="popLayout">
              {filtered.map((n, i) => {
                const meta = CATEGORY_META[n.category] ?? CATEGORY_META.General;
                const CatIcon = meta.icon;
                return (
                  <motion.div
                    key={n.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    data-ocid={`notifications.item.${i + 1}`}
                  >
                    <div
                      className={`rounded-2xl border border-border border-l-4 ${meta.border} ${meta.bg} shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Icon bubble */}
                          <div
                            className={`rounded-xl p-2.5 flex-shrink-0 ${
                              n.category === "Alert"
                                ? "bg-red-100"
                                : n.category === "Event"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            <CatIcon
                              size={20}
                              className={
                                n.category === "Alert"
                                  ? "text-red-600"
                                  : n.category === "Event"
                                    ? "text-green-700"
                                    : "text-blue-600"
                              }
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Title row */}
                            <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                              <h3 className="font-bold text-sm md:text-base font-devanagari text-foreground leading-snug">
                                {n.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`text-xs flex-shrink-0 ${meta.badge}`}
                              >
                                {n.category}
                              </Badge>
                            </div>

                            {/* Message */}
                            <p className="text-sm text-muted-foreground font-devanagari leading-relaxed">
                              {n.message}
                            </p>

                            {/* Date chip */}
                            <div className="mt-3 flex items-center gap-1.5">
                              <CalendarDays
                                size={12}
                                className="text-muted-foreground flex-shrink-0"
                              />
                              <span
                                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                  n.category === "Alert"
                                    ? "bg-red-100 text-red-700"
                                    : n.category === "Event"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {formatDate(n.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
}
