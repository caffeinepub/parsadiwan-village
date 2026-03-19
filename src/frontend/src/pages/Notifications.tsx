import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from "lucide-react";
import { motion } from "motion/react";
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
const CATEGORY_COLORS: Record<string, string> = {
  Alert: "bg-red-100 text-red-700 border-red-200",
  Event: "bg-green-100 text-green-700 border-green-200",
  General: "bg-blue-100 text-blue-700 border-blue-200",
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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-devanagari mb-1">सूचनाएं</h1>
        <div className="text-muted-foreground mb-4">
          Notifications — Alerts, Events &amp; Announcements
        </div>
      </motion.div>

      <div
        className="flex gap-2 mb-6 flex-wrap"
        data-ocid="notifications.filter.tab"
      >
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
            data-ocid={`notifications.filter.${cat.toLowerCase()}.button`}
            className={
              filter === cat ? "bg-nav-orange text-white border-nav-orange" : ""
            }
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="notifications.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card data-ocid="notifications.empty_state">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Bell size={40} className="mx-auto mb-3 opacity-30" />
            कोई सूचना नहीं | No notifications found
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
          data-ocid="notifications.list"
        >
          {filtered.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="shadow-card"
                data-ocid={`notifications.item.${i + 1}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <Bell
                      size={18}
                      className="text-nav-orange mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-sm font-devanagari">
                          {n.title}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${CATEGORY_COLORS[n.category] ?? ""}`}
                        >
                          {n.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-devanagari">
                        {n.message}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(n.date)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
