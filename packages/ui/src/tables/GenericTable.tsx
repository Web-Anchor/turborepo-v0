import { classNames } from '../../lib/utils';

export interface TableHeader {
  /** Unique key corresponding to a field in the data row */
  key?: string;
  /** Display label or React node for the header */
  name: string | React.ReactNode;
  /** Additional classes for the header cell */
  className?: string;
  /** Additional classes for the data cell in this column */
  cellClassName?: string;
}

export type TableCell = {
  /** A row is an object with keys matching the header keys */
  [key: string]: string | React.ReactNode;
};

export interface GenericTableProps {
  headers: TableHeader[];
  data: TableCell[];
}

export function GenericTable({ headers, data }: GenericTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            {headers.map((header, key: number) => (
              <th
                key={key}
                scope="col"
                className={classNames(
                  'py-3.5 px-3 text-left text-sm font-semibold text-white',
                  header.className
                )}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data?.map((row, rowIndex) => {
            console.log('🚀 row', row);

            return (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => {
                  return (
                    <td
                      key={cellIndex}
                      className={classNames(
                        'py-4 px-3 text-sm whitespace-nowrap',
                        header.cellClassName
                      )}
                    >
                      {getCellValue({ header, row, cellIndex })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getCellValue(props: {
  header: TableHeader;
  row: TableCell;
  cellIndex: number;
}) {
  if (props.header.key) {
    return props.row[props.header.key];
  }

  const keys = Object.keys(props.row);
  const key = keys[props.cellIndex];

  return key ? props.row[key] : null;
}
