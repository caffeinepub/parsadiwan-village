import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useVillageInfo } from "../hooks/useQueries";

const WARD_MEMBERS = [
  {
    name: "श्रीमती सुनीता देवी | Smt. Sunita Devi",
    ward: "1",
    role: "पंच | Panch",
    phone: "9876543211",
  },
  {
    name: "श्री मोहन लाल | Shri Mohan Lal",
    ward: "2",
    role: "पंच | Panch",
    phone: "9876543212",
  },
  {
    name: "सुशीला | Sushila",
    ward: "3",
    role: "पंच | Panch",
    phone: "9876543213",
  },
  {
    name: "श्रीमती गीता देवी | Smt. Geeta Devi",
    ward: "4",
    role: "पंच | Panch",
    phone: "9876543214",
  },
  {
    name: "श्री विनोद कुमार | Shri Vinod Kumar",
    ward: "5",
    role: "पंच | Panch",
    phone: "9876543215",
  },
  {
    name: "श्री राजेश सिंह | Shri Rajesh Singh",
    ward: "6",
    role: "पंच | Panch",
    phone: "9876543216",
  },
  {
    name: "श्रीमती कमला देवी | Smt. Kamla Devi",
    ward: "6",
    role: "पंच | Panch",
    phone: "9876543217",
  },
  {
    name: "श्री सुरेश कुमार | Shri Suresh Kumar",
    ward: "7",
    role: "पंच | Panch",
    phone: "9876543218",
  },
  {
    name: "श्रीमती रेखा देवी | Smt. Rekha Devi",
    ward: "7",
    role: "पंच | Panch",
    phone: "9876543219",
  },
  {
    name: "श्री अजय कुमार | Shri Ajay Kumar",
    ward: "8",
    role: "पंच | Panch",
    phone: "9876543220",
  },
  {
    name: "श्रीमती प्रीति देवी | Smt. Preeti Devi",
    ward: "8",
    role: "पंच | Panch",
    phone: "9876543221",
  },
  {
    name: "श्री दिनेश यादव | Shri Dinesh Yadav",
    ward: "9",
    role: "पंच | Panch",
    phone: "9876543222",
  },
  {
    name: "श्री रमेश वर्मा | Shri Ramesh Verma",
    ward: "9",
    role: "पंच | Panch",
    phone: "9876543223",
  },
  {
    name: "श्रीमती अनीता देवी | Smt. Anita Devi",
    ward: "10",
    role: "पंच | Panch",
    phone: "9876543224",
  },
];

export function About() {
  const { data: villageInfo } = useVillageInfo();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-devanagari mb-1"
      >
        हमारे बारे में
      </motion.h1>
      <div className="text-muted-foreground mb-6">
        About Gram Panchayat Parsadiwan
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card h-full">
            <div className="bg-nav-orange px-4 py-2 rounded-t-lg">
              <h2 className="text-white font-bold">
                ग्राम इतिहास | Village History
              </h2>
            </div>
            <CardContent className="pt-4 pb-4 space-y-3 text-sm leading-relaxed">
              <p className="font-devanagari text-base">
                पारसाडीवान एक प्राचीन गाँव है जो उत्तर प्रदेश के हृदय में स्थित है। यह गाँव
                अपनी समृद्ध सांस्कृतिक विरासत और कृषि परंपराओं के लिए जाना जाता है।
              </p>
              <p className="text-muted-foreground">
                Parsadiwan is an ancient village situated in the heart of Uttar
                Pradesh, known for its rich cultural heritage and agricultural
                traditions. The village has been inhabited for centuries and
                maintains strong community bonds.
              </p>
              <p className="text-muted-foreground">
                The Gram Panchayat was established to serve the administrative
                and developmental needs of the village. It works towards
                providing basic amenities and implementing government schemes
                for the welfare of its residents.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="shadow-card h-full">
            <div className="bg-nav-green px-4 py-2 rounded-t-lg">
              <h2 className="text-white font-bold">
                पंचायत जानकारी | Panchayat Info
              </h2>
            </div>
            <CardContent className="pt-4 pb-4">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {[
                    {
                      label: "ग्राम पंचायत | Village",
                      value: villageInfo?.villageName ?? "Parsadiwan",
                    },
                    {
                      label: "जिला | District",
                      value: villageInfo?.district ?? "Lucknow",
                    },
                    {
                      label: "राज्य | State",
                      value: villageInfo?.state ?? "Uttar Pradesh",
                    },
                    {
                      label: "जनसंख्या | Population",
                      value: villageInfo
                        ? Number(villageInfo.population).toLocaleString("hi-IN")
                        : "3,420",
                    },
                    {
                      label: "घर | Households",
                      value: villageInfo
                        ? Number(villageInfo.households).toString()
                        : "680",
                    },
                    {
                      label: "क्षेत्र | Area",
                      value: villageInfo
                        ? `${villageInfo.area} km²`
                        : "12.5 km²",
                    },
                    {
                      label: "वार्ड | Wards",
                      value: villageInfo
                        ? Number(villageInfo.wards).toString()
                        : "9",
                    },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-2 font-medium text-muted-foreground pr-4">
                        {row.label}
                      </td>
                      <td className="py-2 font-semibold">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
        data-ocid="about.ward_members.panel"
      >
        <h2 className="text-lg font-bold mb-3 border-l-4 border-nav-blue pl-3">
          वार्ड सदस्य | Ward Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WARD_MEMBERS.map((member, i) => (
            <Card
              key={member.phone}
              className="shadow-card"
              data-ocid={`about.ward_member.item.${i + 1}`}
            >
              <CardContent className="py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-nav-orange/10 text-nav-orange font-bold flex items-center justify-center flex-shrink-0">
                  {member.ward}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm font-devanagari truncate">
                    {member.name}
                  </div>
                  <Badge
                    className="bg-nav-green/10 text-nav-green border-nav-green/20 text-xs mt-0.5"
                    variant="outline"
                  >
                    {member.role}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    📞 {member.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
