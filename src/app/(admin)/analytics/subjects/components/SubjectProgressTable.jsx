export default function SubjectProgressTable({
  subjects,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 overflow-x-auto">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          Subject Progress
        </h2>

        <span className="text-sm text-green-500 font-medium">
          Overall Performance
        </span>

      </div>

      <table className="w-full text-left">

        <thead>

          <tr className="border-b">

            <th className="pb-3">
              Subject
            </th>

            <th className="pb-3">
              Completed
            </th>

            <th className="pb-3">
              Total
            </th>

            <th className="pb-3">
              Progress
            </th>

          </tr>

        </thead>

        <tbody>

          {subjects.map(
            (subject, index) => (

              <tr
                key={index}
                className="border-b last:border-none"
              >

                <td className="py-4 font-medium">
                  {
                    subject.subject
                  }
                </td>

                <td className="py-4">
                  {
                    subject.completedTasks
                  }
                </td>

                <td className="py-4">
                  {
                    subject.totalTasks
                  }
                </td>

                <td className="py-4 w-[200px]">

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                      style={{
                        width: `${subject.completionRate}%`,
                      }}
                      className="h-full bg-green-500 rounded-full"
                    />

                  </div>

                  <span className="text-sm text-gray-600 mt-1 inline-block">

                    {
                      subject.completionRate
                    }%

                  </span>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}