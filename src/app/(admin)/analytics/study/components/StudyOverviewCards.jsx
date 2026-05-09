import {
  ClipboardCheck,
  CheckCircle2,
  ListTodo,
  TrendingUp,
} from "lucide-react";

export default function StudyOverviewCards({
  tasks,
  plans,
}) {

  const cards = [
    {
      title: "Total Tasks",
      value: tasks?.totalTasks || 0,
      icon: ListTodo,
      gradient:
        "from-blue-500 to-indigo-500",
    },

    {
      title: "Completed",
      value:
        tasks?.completedTasks || 0,
      icon: CheckCircle2,
      gradient:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Progress",
      value: `${
        tasks?.overallProgress || 0
      }%`,
      icon: TrendingUp,
      gradient:
        "from-purple-500 to-fuchsia-500",
    },

    {
      title: "Study Plans",
      value:plans?.totalPlans || 0,
      icon: ClipboardCheck,
      gradient:
        "from-orange-500 to-amber-500",
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