export default function TopUsersTable({
  users,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          Top Users
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left text-gray-500 text-sm border-b">

              <th className="pb-3">
                User
              </th>

              <th className="pb-3">
                Progress
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >

                <td className="py-4">

                  <div>

                    <p className="font-medium text-gray-700">
                      {user.name}
                    </p>

                    <p
                      className="text-sm text-gray-400 truncate max-w-[160px]"
                      title={user.email}
                    >
                      {user.email}
                    </p>

                  </div>

                </td>

                <td className="py-4">

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">

                    {user.progress || 0}%

                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}