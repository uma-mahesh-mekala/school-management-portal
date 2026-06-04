import type { TableProps } from "../types/types";

export default function Table({columns, data, renderActions}: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50">
          <tr>
            {
            columns.map((column) => {
                return <th key = {column.key} className="px-6 py-4 text-sm font-semibold text-slate-700">
                    {column.label}
                </th>
            } )
            }
            {
              renderActions && (
                <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                </th>
              )
            }
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
            {
                data.map((row) => (
                        <tr key = {String(row.id)} className="hover:bg-slate-50 transition">
                            {
                                columns.map((column) => (
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                    {String(row[column.key])}
                                    </td>
                                ))
                            }
                            {
                              renderActions && (
                                <td className="px-6 py-4 font-medium text-slate-800">
                                    {renderActions(row)}
                                </td>
                              )
                            }
                        </tr>                  
                ))
            }
        </tbody>
      </table>
    </div>
  );
}