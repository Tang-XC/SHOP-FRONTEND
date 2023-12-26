import { FC, useEffect, useState } from 'react';
import { Table as BsTable } from 'react-bootstrap';
interface columnsItem {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => JSX.Element;
}
interface dataSourceItem {
  [key: string]: any;
}
interface Props {
  columns: columnsItem[];
  request: () => { data: dataSourceItem[] };
}

const Table: FC<Props> = (props) => {
  const { columns = [], request } = props;
  const [dataSource, setDataSource] = useState<dataSourceItem[]>([]);
  const getData = () => {
    const { data } = request();
    console.log(data);
    setDataSource(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <BsTable>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data) => (
          <tr key={data.key}>
            {columns.map((column) => (
              <td key={column.key} className="align-middle">
                {column.render
                  ? column.render(data[column.dataIndex], data)
                  : data[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </BsTable>
  );
};
export default Table;
