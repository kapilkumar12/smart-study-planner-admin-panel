import {
  Activity,
  Brain,
  MousePointerClick,
  BarChart3,
} from "lucide-react";

export default function UsageOverviewCards({ usages = [] }) {

  // =========================
  // TOTAL EVENTS
  // =========================
  const totalEvents = usages.length;

  // =========================
  // AI USAGE (FIXED)
  // =========================
  const aiUsage = usages.filter(
    (u) => u.event === "AI_USED"
  ).length;

  // =========================
  // EVENT MAP (FIXED SAFE)
  // =========================
  const eventMap = {};

  usages.forEach((u) => {
    if (!u?.event) return;

    eventMap[u.event] =
      (eventMap[u.event] || 0) + 1;
  });

  // =========================
  // MOST USED FEATURE (FIXED)
  // =========================
  const mostUsedRaw =
    Object.entries(eventMap)
      .sort((a, b) => b[1] - a[1])[0]?.[0];

  const mostUsed = mostUsedRaw || "N/A";

  // =========================
  // TOTAL UNIQUE FEATURES
  // =========================
  const trackedFeatures =
    Object.keys(eventMap).length;

  const cards = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Activity,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "AI Usage",
      value: aiUsage,
      icon: Brain,
      gradient: "from-purple-500 to-fuchsia-500",
    },
    {
      title: "Most Used",
      value: mostUsed,
      icon: MousePointerClick,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Tracked Features",
      value: trackedFeatures,
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 relative overflow-hidden hover:shadow-xl transition"
          >
            <div
              className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl`}
            />

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold mt-2 text-gray-800 break-words">
                  {card.value}
                </h2>
              </div>

              <div
                className={`bg-gradient-to-br ${card.gradient} p-3 rounded-2xl text-white shadow-lg`}
              >
                <Icon size={24} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}