import {
  Activity,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function ActivityOverviewCards({
  activity,
  usages,
}) {

  const totalActivity =
    activity.reduce(
      (acc, item) =>
        acc + item.count,
      0
    );

  const activeDays =
    activity.length;

  const totalEvents =
    usages.length;

  const completedEvents =
    usages.filter(
      (u) =>
        u.event ===
        "TASK_COMPLETED"
    ).length;

  const cards = [
    {
      title: "Total Activity",
      value: totalActivity,
      icon: Activity,
      gradient:
        "from-blue-500 to-indigo-500",
    },

    {
      title: "Active Days",
      value: activeDays,
      icon: Clock3,
      gradient:
        "from-orange-500 to-amber-500",
    },

    {
      title: "Usage Events",
      value: totalEvents,
      icon: Users,
      gradient:
        "from-purple-500 to-fuchsia-500",
    },

    {
      title: "Completed Tasks",
      value: completedEvents,
      icon: CheckCircle2,
      gradient:
        "from-green-500 to-emerald-500",
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

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
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