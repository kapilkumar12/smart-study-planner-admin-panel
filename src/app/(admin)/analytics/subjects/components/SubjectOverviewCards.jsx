import {
  BookOpen,
  AlertTriangle,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

export default function SubjectOverviewCards({
  subjects,
}) {

  const totalSubjects =
    subjects.length;

  const weakSubjects =
    subjects.filter(
      (s) => s.completionRate < 40
    ).length;

  const avgCompletion =
    subjects.length === 0
      ? 0
      : Math.round(
          subjects.reduce(
            (acc, item) =>
              acc + item.completionRate,
            0
          ) / subjects.length
        );

  const totalTasks =
    subjects.reduce(
      (acc, item) =>
        acc + item.totalTasks,
      0
    );

  const cards = [
    {
      title: "Total Subjects",
      value: totalSubjects,
      icon: BookOpen,
      gradient:
        "from-blue-500 to-indigo-500",
    },

    {
      title: "Weak Subjects",
      value: weakSubjects,
      icon: AlertTriangle,
      gradient:
        "from-red-500 to-orange-500",
    },

    {
      title: "Avg Completion",
      value: `${avgCompletion}%`,
      icon: TrendingUp,
      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      gradient:
        "from-purple-500 to-fuchsia-500",
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