import { TableColumn, TableData } from "@/util/types";
import Image from "next/image";

const Table = ({
  columns,
  data,
  actions,
  edit,
  del
} : {
  columns: TableColumn[];
  data: TableData[];
  actions: boolean;
  edit?: (id: number) => void;
  del?: (id: number) => Promise<void>;
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
        cellSpacing={0}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                key={index}
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td
                  className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500"
                  key={`${index}-${colIndex}`}
                >
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 flex items-center">
                  <Image
                    src="/img/pencil.png"
                    alt="Edit"
                    className="mr-2 cursor-pointer"
                    width={20}
                    height={20}
                    onClick={() => edit && edit(parseInt(row["id"]))}
                  />
                  <Image
                    src="/img/bin.png"
                    alt="Delete"
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    onClick={async () => {
                      if(confirm("Are you sure you want to delete this record?") && del) {
                        await del(parseInt(row["id"]));
                      }
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
