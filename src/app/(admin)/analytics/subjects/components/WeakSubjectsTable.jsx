export default function WeakSubjectsTable({
  subjects,
}) {

  const weakSubjects =
    subjects.filter(
      (s) => s.completionRate < 40
    );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 overflow-x-auto">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          Weak Subjects
        </h2>

        <span className="text-sm text-red-500 font-medium">
          Need Improvement
        </span>

      </div>

      <table className="w-full text-left">

        <thead>

          <tr className="border-b">

            <th className="pb-3">
              Subject
            </th>

            <th className="pb-3">
              Completion
            </th>

            <th className="pb-3">
              Tasks
            </th>

          </tr>

        </thead>

        <tbody>

          {weakSubjects.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                className="py-5 text-gray-500 text-center"
              >
                No weak subjects 🎉
              </td>

            </tr>

          ) : (

            weakSubjects.map(
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

                  <td className="py-4 text-red-500 font-semibold">
                    {
                      subject.completionRate
                    }%
                  </td>

                  <td className="py-4">
                    {
                      subject.totalTasks
                    }
                  </td>

                </tr>
              )
            )

          )}

        </tbody>

      </table>

    </div>
  );
}