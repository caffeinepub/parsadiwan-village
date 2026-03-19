import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, FileCheck, FileCog, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useDownloads } from "../hooks/useQueries";

const FALLBACK_DOWNLOADS = [
  {
    title: "जन्म प्रमाण पत्र आवेदन",
    description: "Birth Certificate Application Form",
    category: "Certificate",
    fileUrl: "#",
  },
  {
    title: "मृत्यु प्रमाण पत्र आवेदन",
    description: "Death Certificate Application Form",
    category: "Certificate",
    fileUrl: "#",
  },
  {
    title: "आवासीय प्रमाण पत्र",
    description: "Domicile / Residence Certificate Form",
    category: "Certificate",
    fileUrl: "#",
  },
  {
    title: "PM आवास योजना आवेदन",
    description: "PM Awas Yojana Application Form",
    category: "Scheme",
    fileUrl: "#",
  },
  {
    title: "मनरेगा जॉब कार्ड आवेदन",
    description: "MGNREGA Job Card Application",
    category: "Scheme",
    fileUrl: "#",
  },
  {
    title: "वार्ड सभा सूचना",
    description: "Ward Sabha Notice Template",
    category: "Notice",
    fileUrl: "#",
  },
  {
    title: "सामाजिक अंकेक्षण रिपोर्ट",
    description: "Social Audit Report 2024-25",
    category: "Report",
    fileUrl: "#",
  },
  {
    title: "वार्षिक बजट रिपोर्ट",
    description: "Annual Budget Report 2025-26",
    category: "Report",
    fileUrl: "#",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Certificate: "bg-nav-orange",
  Scheme: "bg-nav-green",
  Notice: "bg-nav-blue",
  Report: "bg-purple-600",
};

const CATEGORY_ICONS: Record<string, typeof FileText> = {
  Certificate: FileCheck,
  Scheme: FileCog,
  Notice: FileText,
  Report: FileText,
};

export function Downloads() {
  const { data: downloads, isLoading } = useDownloads();
  const items =
    downloads && downloads.length > 0 ? downloads : FALLBACK_DOWNLOADS;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-devanagari mb-1">डाउनलोड</h1>
        <div className="text-muted-foreground mb-6">
          Downloads — Forms, Certificates &amp; Reports
        </div>
      </motion.div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="downloads.loading_state"
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="downloads.list"
        >
          {items.map((doc, i) => {
            const Icon = CATEGORY_ICONS[doc.category] ?? FileText;
            const colorClass = CATEGORY_COLORS[doc.category] ?? "bg-muted";
            return (
              <Card
                key={doc.title}
                className="shadow-card hover:shadow-card-hover transition-all"
                data-ocid={`downloads.item.${i + 1}`}
              >
                <CardContent className="pt-5 pb-4 flex flex-col items-center text-center gap-3">
                  <div className={`${colorClass} text-white p-3 rounded-xl`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-sm font-devanagari leading-snug">
                      {doc.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {doc.description}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {doc.category}
                  </Badge>
                  <a
                    href={doc.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-nav-blue text-white hover:bg-nav-blue/90"
                      data-ocid={`downloads.download_button.${i + 1}`}
                    >
                      <Download size={14} className="mr-1" /> डाउनलोड | Download
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      )}
    </main>
  );
}
