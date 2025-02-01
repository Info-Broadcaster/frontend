export default function HistoryTable({ lines }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border border-white w-full min-w-[600px]">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">
              Url
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">
              Nombre de click
            </th>
          </tr>
        </thead>

        <tbody>
          {lines.map((line) => (
            <tr key={line?.id}>
              <td className="border border-gray-300 dark:border-gray-700 text-start px-2 py-1 break-all">
                <a
                  href={line?.full_url}
                  className="text-blue-500 hover:underline"
                >
                  {line?.url}
                </a>
              </td>
              <td className="border border-gray-300 dark:border-gray-700 text-center px-2 py-1">
                {line?.clicks_total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
