import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const { mutate: submit, isPending, isSuccess } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(form, {
      onSuccess: () => {
        toast.success("आपका संदेश भेज दिया गया | Message sent successfully!");
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      },
      onError: () => {
        toast.error("कुछ गलत हुआ | Something went wrong. Please try again.");
      },
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-devanagari mb-1">संपर्क करें</h1>
        <div className="text-muted-foreground mb-6">
          Contact Us — Gram Panchayat Parsa Diwan
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <Card className="shadow-card">
            <div className="bg-nav-green px-4 py-2 rounded-t-lg">
              <h2 className="text-white font-bold">
                संपर्क जानकारी | Contact Info
              </h2>
            </div>
            <CardContent className="pt-4 pb-4 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-nav-orange mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-sm">पता | Address</div>
                  <div className="text-sm text-muted-foreground font-devanagari">
                    पंचायत भवन, ग्राम परसा दीवान, पोस्ट ढेबरुआ
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Panchayat Bhawan, Gram Parsa Diwan, Post Dhebarua
                  </div>
                  <div className="text-sm text-muted-foreground">
                    जिला सिद्धार्थनगर, उत्तर प्रदेश — 272201
                  </div>
                  <div className="text-sm text-muted-foreground">
                    District Siddharthnagar, Uttar Pradesh — 272201
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-nav-orange flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">फोन | Phone</div>
                  <div className="text-sm text-muted-foreground">
                    +91 9876543210
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-nav-orange flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">ईमेल | Email</div>
                  <div className="text-sm text-muted-foreground">
                    panchayat.parsadiwan@up.gov.in
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  size={20}
                  className="text-nav-orange flex-shrink-0 mt-0.5"
                />
                <div>
                  <div className="font-semibold text-sm">
                    कार्यालय समय | Office Hours
                  </div>
                  <div className="text-sm text-muted-foreground">
                    सोमवार – शनिवार: 10:00 AM – 5:00 PM
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mon – Sat: 10:00 AM – 5:00 PM
                  </div>
                  <div className="text-sm font-semibold text-red-600 mt-1">
                    रविवार: अवकाश | Sunday: Holiday
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map placeholder */}
          <Card className="shadow-card overflow-hidden">
            <div className="bg-muted h-48 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin size={40} className="mx-auto mb-2 text-nav-orange" />
                <div className="font-devanagari font-semibold">
                  परसा दीवान, सिद्धार्थनगर, उत्तर प्रदेश
                </div>
                <div className="text-sm">
                  Parsa Diwan, Siddharthnagar, UP — 272201
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="shadow-card" data-ocid="contact.modal">
            <div className="bg-nav-blue px-4 py-2 rounded-t-lg">
              <h2 className="text-white font-bold">संदेश भेजें | Send Message</h2>
            </div>
            <CardContent className="pt-5 pb-5">
              {isSuccess && (
                <div
                  className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded"
                  data-ocid="contact.success_state"
                >
                  ✅ संदेश सफलतापूर्वक भेजा गया | Message sent successfully!
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">नाम | Name *</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="आपका नाम"
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">फोन | Phone *</Label>
                    <Input
                      id="phone"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="मोबाइल नंबर"
                      data-ocid="contact.phone.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">ईमेल | Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="example@email.com"
                    data-ocid="contact.email.input"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">विषय | Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subject: e.target.value }))
                    }
                    placeholder="संदेश का विषय"
                    data-ocid="contact.subject.input"
                  />
                </div>
                <div>
                  <Label htmlFor="message">संदेश | Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="अपना संदेश यहाँ लिखें..."
                    rows={4}
                    data-ocid="contact.message.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-nav-orange text-white hover:bg-nav-orange/90"
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : null}
                  {isPending
                    ? "भेजा जा रहा है... | Sending..."
                    : "संदेश भेजें | Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
