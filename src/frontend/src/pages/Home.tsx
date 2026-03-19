import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Download,
  FileText,
  Home as HomeIcon,
  LayoutGrid,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useNotifications, useVillageInfo } from "../hooks/useQueries";

const SERVICES = [
  {
    icon: FileText,
    label: "जन्म प्रमाण पत्र\nBirth Certificate",
    color: "bg-nav-orange",
    path: "/downloads",
  },
  {
    icon: HomeIcon,
    label: "आवास योजना\nPM Awas Yojana",
    color: "bg-nav-green",
    path: "/downloads",
  },
  {
    icon: Download,
    label: "फॉर्म डाउनलोड\nForm Downloads",
    color: "bg-nav-blue",
    path: "/downloads",
  },
  {
    icon: Bell,
    label: "सूचनाएं\nNotifications",
    color: "bg-nav-orange",
    path: "/notifications",
  },
  {
    icon: Phone,
    label: "संपर्क\nContact Us",
    color: "bg-nav-green",
    path: "/contact",
  },
  {
    icon: LayoutGrid,
    label: "वार्ड जानकारी\nWard Info",
    color: "bg-nav-blue",
    path: "/about",
  },
];

const LATEST_NEWS = [
  {
    title: "ग्राम पंचायत बजट 2025-26 स्वीकृत",
    subtitle: "Gram Panchayat Budget 2025-26 approved",
    date: "15 मार्च 2026",
    tag: "बजट",
  },
  {
    title: "होली उत्सव समारोह की घोषणा",
    subtitle: "Holi festival celebration announced",
    date: "10 मार्च 2026",
    tag: "त्योहार",
  },
  {
    title: "नल जल योजना — 200 घरों में कनेक्शन",
    subtitle: "Nal Jal Scheme — 200 households connected",
    date: "5 मार्च 2026",
    tag: "योजना",
  },
];

export function Home() {
  const { data: notifications, isLoading: notifLoading } = useNotifications();
  const { data: villageInfo, isLoading: infoLoading } = useVillageInfo();

  const stats = [
    {
      label: "जनसंख्या | Population",
      value: villageInfo
        ? Number(villageInfo.population).toLocaleString("hi-IN")
        : "3,420",
      icon: Users,
      color: "text-nav-orange",
    },
    {
      label: "क्षेत्रफल | Area (km²)",
      value: villageInfo ? villageInfo.area.toFixed(2) : "12.5",
      icon: MapPin,
      color: "text-nav-green",
    },
    {
      label: "घर | Households",
      value: villageInfo
        ? Number(villageInfo.households).toLocaleString("hi-IN")
        : "680",
      icon: HomeIcon,
      color: "text-nav-blue",
    },
    {
      label: "वार्ड | Wards",
      value: villageInfo ? Number(villageInfo.wards).toString() : "9",
      icon: LayoutGrid,
      color: "text-nav-orange",
    },
  ];

  return (
    <main>
      <section className="relative h-80 md:h-96 overflow-hidden">
        <img
          src="/assets/generated/village-hero.dim_1200x600.jpg"
          alt="Gram Panchayat Parsa Diwan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="px-6 md:px-12 text-white max-w-lg"
          >
            <div className="text-2xl md:text-4xl font-bold font-devanagari leading-tight mb-2">
              ग्राम पंचायत परसा दीवान में आपका स्वागत है
            </div>
            <div className="text-base md:text-lg opacity-90">
              Welcome to Gram Panchayat Parsa Diwan
            </div>
            <div className="text-sm opacity-75 mt-1">
              जिला, उत्तर प्रदेश | District, Uttar Pradesh
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              data-ocid="home.stats.panel"
            >
              <h2 className="text-lg font-bold mb-3 text-foreground border-l-4 border-nav-orange pl-3">
                ग्राम सांख्यिकी | Village Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <Card key={s.label} className="shadow-card text-center">
                    <CardContent className="pt-4 pb-3">
                      <s.icon size={28} className={`mx-auto mb-1 ${s.color}`} />
                      {infoLoading ? (
                        <Skeleton className="h-6 w-12 mx-auto mb-1" />
                      ) : (
                        <div className={`text-xl font-bold ${s.color}`}>
                          {s.value}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground leading-tight">
                        {s.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              data-ocid="home.services.panel"
            >
              <h2 className="text-lg font-bold mb-3 text-foreground border-l-4 border-nav-green pl-3">
                त्वरित सेवाएं | Quick Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICES.map((svc, i) => (
                  <Link
                    key={svc.label}
                    to={svc.path}
                    data-ocid={`home.service.item.${i + 1}`}
                  >
                    <Card className="shadow-card hover:shadow-card-hover transition-all cursor-pointer hover:-translate-y-0.5">
                      <CardContent className="pt-4 pb-3 flex flex-col items-center text-center gap-2">
                        <div
                          className={`${svc.color} text-white p-2 rounded-lg`}
                        >
                          <svc.icon size={22} />
                        </div>
                        <div className="text-xs font-medium leading-tight whitespace-pre-line">
                          {svc.label}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              data-ocid="home.news.panel"
            >
              <h2 className="text-lg font-bold mb-3 text-foreground border-l-4 border-nav-blue pl-3">
                ताज़ा समाचार | Latest News
              </h2>
              <div className="space-y-3">
                {LATEST_NEWS.map((news, i) => (
                  <Card
                    key={news.title}
                    className="shadow-card"
                    data-ocid={`home.news.item.${i + 1}`}
                  >
                    <CardContent className="py-3 flex items-start gap-3">
                      <div className="bg-nav-orange text-white text-xs px-2 py-0.5 rounded font-semibold flex-shrink-0 mt-0.5">
                        {news.tag}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm font-devanagari">
                          {news.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {news.subtitle}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {news.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card
                className="shadow-card overflow-hidden"
                data-ocid="home.sarpanch.card"
              >
                <div className="bg-nav-orange px-4 py-2">
                  <h3 className="text-white font-bold text-sm">
                    सरपंच | Sarpanch
                  </h3>
                </div>
                <CardContent className="pt-4 pb-4 text-center">
                  <img
                    src="/assets/generated/sarpanch-female.dim_400x400.jpg"
                    alt="Sarpanch Sushila"
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-nav-orange"
                  />
                  <div className="font-bold text-base font-devanagari">
                    सुशीला
                  </div>
                  <div className="text-sm text-muted-foreground">Sushila</div>
                  <Badge className="bg-nav-green text-white mt-2 text-xs">
                    सरपंच | Gram Panchayat
                  </Badge>
                  <div className="mt-3 text-xs text-muted-foreground">
                    कार्यकाल: 2021 – 2026
                    <br />
                    Tenure: 2021 – 2026
                  </div>
                  <div className="mt-2 text-xs">📞 +91 9876543210</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card
                className="shadow-card"
                data-ocid="home.notifications.panel"
              >
                <div className="bg-nav-blue px-4 py-2">
                  <h3 className="text-white font-bold text-sm">
                    सूचनाएं | Notifications
                  </h3>
                </div>
                <CardContent className="pt-3 pb-3">
                  {notifLoading ? (
                    <div
                      className="space-y-2"
                      data-ocid="home.notifications.loading_state"
                    >
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-10" />
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {(
                        notifications?.slice(0, 4) ?? [
                          { title: "बैठक सूचना — 25 मार्च", category: "Alert" },
                          { title: "PM आवास आवेदन खुले", category: "General" },
                          { title: "होली उत्सव — 14 मार्च", category: "Event" },
                        ]
                      ).map((n, i) => (
                        <li
                          key={n.title}
                          className="flex items-start gap-2 text-xs"
                          data-ocid={`home.notification.item.${i + 1}`}
                        >
                          <span className="bg-nav-orange/10 text-nav-orange font-bold px-1.5 py-0.5 rounded text-xs flex-shrink-0">
                            {n.category}
                          </span>
                          <span className="font-devanagari">{n.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to="/notifications"
                    className="block text-center text-xs text-nav-blue mt-3 font-semibold hover:underline"
                    data-ocid="home.notifications.link"
                  >
                    सभी देखें | View All →
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
