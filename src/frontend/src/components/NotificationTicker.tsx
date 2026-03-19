import { X } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../hooks/useQueries";

const FALLBACK_NOTIFICATIONS = [
  "ग्राम पंचायत बैठक 25 मार्च 2026 को आयोजित होगी | Gram Panchayat meeting on March 25, 2026",
  "प्रधानमंत्री आवास योजना के लिए आवेदन शुरू | Applications open for PM Awas Yojana",
  "होली उत्सव कार्यक्रम 14 मार्च को ग्राम पंचायत भवन में | Holi celebration on March 14 at Panchayat Bhavan",
  "जल जीवन मिशन — नल कनेक्शन के लिए संपर्क करें | Jal Jeevan Mission — contact for tap connection",
];

export function NotificationTicker() {
  const [visible, setVisible] = useState(true);
  const { data: notifications } = useNotifications();

  if (!visible) return null;

  const items =
    notifications && notifications.length > 0
      ? notifications.map((n) => n.title)
      : FALLBACK_NOTIFICATIONS;
  const tickerText = items.join("   •   ");

  return (
    <div
      className="bg-nav-orange text-white text-sm flex items-center gap-3 overflow-hidden"
      style={{ minHeight: "36px" }}
    >
      <div className="flex-shrink-0 bg-black/20 px-3 py-2 font-semibold text-xs whitespace-nowrap">
        🔔 ताज़ा सूचनाएं | Latest Notifications:
      </div>
      <div className="flex-1 overflow-hidden relative py-2">
        <span className="ticker-scroll">{tickerText}</span>
      </div>
      <button
        type="button"
        data-ocid="ticker.close_button"
        onClick={() => setVisible(false)}
        className="flex-shrink-0 mr-2 hover:opacity-70 transition-opacity"
        aria-label="Close notifications ticker"
      >
        <X size={16} />
      </button>
    </div>
  );
}
