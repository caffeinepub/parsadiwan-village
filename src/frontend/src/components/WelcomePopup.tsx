import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "parsadiwan_welcome_shown";

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setVisible(true);
    }
  }, []);

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative band */}
            <div
              className="h-2 w-full"
              style={{
                background:
                  "linear-gradient(90deg, #e07b00 0%, #f5a623 40%, #2d7a2d 100%)",
              }}
            />

            {/* Close button */}
            <button
              type="button"
              data-ocid="welcome.close_button"
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Icon / emblem area */}
            <div className="flex flex-col items-center pt-8 pb-2 px-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #e07b00, #f5a623)",
                }}
              >
                <span
                  className="text-4xl select-none"
                  role="img"
                  aria-label="panchayat"
                >
                  🏛️
                </span>
              </div>

              {/* Hindi title */}
              <h2
                className="text-center font-bold text-lg leading-snug"
                style={{ color: "#b35900" }}
              >
                परसा दीवान ग्राम पंचायत में
              </h2>
              <h2
                className="text-center font-bold text-lg leading-snug mb-1"
                style={{ color: "#b35900" }}
              >
                आपका स्वागत है! 🙏
              </h2>
              <p className="text-center text-sm font-medium text-gray-500 mb-4">
                Welcome to Parsa Diwan Gram Panchayat!
              </p>

              {/* Divider */}
              <div
                className="w-16 h-0.5 rounded-full mb-4"
                style={{ background: "#2d7a2d" }}
              />

              {/* Body message */}
              <p className="text-center text-sm text-gray-700 leading-relaxed mb-2">
                यह ग्राम पंचायत की आधिकारिक वेबसाइट है। यहाँ आप नवीनतम सूचनाएं, दस्तावेज
                और सेवाएं प्राप्त कर सकते हैं।
              </p>
              <p className="text-center text-xs text-gray-500 leading-relaxed mb-6">
                This is the official website of Gram Panchayat. Here you can
                find latest notifications, documents and services.
              </p>

              {/* CTA button */}
              <button
                type="button"
                data-ocid="welcome.primary_button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-bold text-white text-base tracking-wide transition-transform active:scale-95 mb-6 shadow-md"
                style={{
                  background: "linear-gradient(90deg, #e07b00, #2d7a2d)",
                }}
              >
                प्रवेश करें &nbsp;|&nbsp; Enter
              </button>
            </div>

            {/* Bottom band */}
            <div
              className="h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, #2d7a2d 0%, #f5a623 50%, #e07b00 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
