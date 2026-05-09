export default function RecentActivityTable({
  usages,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 overflow-x-auto">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          Recent Activities
        </h2>

        <span className="text-sm text-gray-500">
          Latest system events
        </span>

      </div>

      <table className="w-full text-left">

        <thead>

          <tr className="border-b">

            <th className="pb-3">
              Event
            </th>

            <th className="pb-3">
              User
            </th>

            <th className="pb-3">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {usages.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                className="py-5 text-center text-gray-500"
              >
                No recent activity
              </td>

            </tr>

          ) : (

            usages.map((item, index) => (

              <tr
                key={index}
                className="border-b last:border-none"
              >

                <td className="py-4 font-medium">
                  {item.event}
                </td>

                <td className="py-4">

                  {item.user?.email
                    ?.slice(0, 15) || "N/A"}

                </td>

                <td className="py-4 text-gray-500">

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}