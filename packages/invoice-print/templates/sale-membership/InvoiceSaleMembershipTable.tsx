import { FC, Fragment, useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  /* padding: 1rem; */
  table {
    width: 100%;
    border: 0px solid black;
    border-spacing: 0;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      /* padding: 0.5rem; */
      border-right: 0px solid black;
      border-bottom: 0px solid black;
      :last-child {
        text-align: right;
      }
    }
  }
`;

interface InvoiceProductServicesTableProps {
  columns: any;
  data: any;
}

const InvoiceSaleMembershipTable: FC<InvoiceProductServicesTableProps> = (
  props
) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: props.columns ?? [],
    data: props.data ?? [],
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups?.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => {
              // @ts-ignore
              return column.hideHeader === true ? null : (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows?.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                return (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// * Main
const InvoiceTableSaleMembershipMain: FC<{
  tableHeader: string;
  data: Array<any> | undefined;
  hideHeader: boolean;
}> = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: props?.tableHeader,
        hideHeader: props.hideHeader ?? true,
        columns: [
          {
            Header: "N.O",
            accessor: "no",
          },
          {
            Header: "Type",
            accessor: "membership_type",
          },
          {
            Header: "Qty",
            accessor: "quantity",
          },
          {
            Header: "Price($)",
            accessor: "price",
          },

          {
            Header: "Total($)",
            accessor: "total_price",
          },
        ],
      },
    ],
    [props.hideHeader, props?.tableHeader]
  );

  return (
    <Fragment>
      <Styles>
        <InvoiceSaleMembershipTable
          columns={columns ?? []}
          data={props?.data ?? []}
        />
      </Styles>
    </Fragment>
  );
};

export { InvoiceTableSaleMembershipMain };
