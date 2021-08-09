import React from 'react';
import Input from '../../components/uielements/input';
import Button  from '../../components/uielements/button';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';
import Table from './TableStyle';

const viewColumns = [
  {
    title: '#',
    dataIndex: 'key',
    width: '10%',
    rowKey: 'key',
  },
  {
    title: 'Tên dịch vụ',
    dataIndex: 'itemName',
    width: '40%',
    rowKey: 'itemName',
  },
  {
    title: 'Giá',
    dataIndex: 'costs',
    width: '15%',
    rowKey: 'costs',
  },
  {
    title: 'Nhân viên',
    dataIndex: 'qty',
    width: '15%',
    rowKey: 'qty',
  },
      
];

const ViewTable = ({ invoiceList }) => (
  <Table columns={viewColumns} dataSource={invoiceList} pagination={false} />
);

const EditTable = ({ editableInvoice, editInvoice, updateValues }) => {
  const { invoiceList } = editableInvoice;
  const editColumns = [
    {
      title: '#',
      dataIndex: 'key',
      rowKey: 'key',
      width: '10%',
      render: (text, singleInvoice) => <span>{singleInvoice.key}</span>,
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'itemName',
      rowKey: 'itemName',
      width: '40%',
      render: (text, singleInvoice) => (
        <Input
          placeholder="Item Name"
          value={singleInvoice.itemName}
          onChange={event => {
            editableInvoice.invoiceList[singleInvoice.key - 1].itemName =
              event.target.value;
            editInvoice(editableInvoice);
          }}
        />
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'costs',
      rowKey: 'costs',
      width: '20%',
      render: (text, singleInvoice) => (
        <Input
          placeholder="Unit Cost"
          value={singleInvoice.costs}
          onChange={event => {
            editableInvoice.invoiceList[
              singleInvoice.key - 1
            ].costs = stringToPosetiveInt(
              event.target.value,
              singleInvoice.costs
            );
            editInvoice(updateValues(editableInvoice));
          }}
        />
      ),
    },
    
    {
      title: 'Price',
      dataIndex: 'price',
      rowKey: 'price',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      width: '10%',
      render: (text, singleInvoice) =>
        invoiceList.length === 1 ? (
          ''
        ) : (
          <Button
            onClick={() => {
              const newInvoiceList = [];
              invoiceList.forEach((invoice, i) => {
                if (i !== singleInvoice.key - 1) {
                  newInvoiceList.push(invoice);
                }
              });
              editableInvoice.invoiceList = newInvoiceList;
              editInvoice(updateValues(editableInvoice));
            }}
          >
            Delete
          </Button>
        ),
    },
  ];
  return (
    <Table columns={editColumns} dataSource={invoiceList} pagination={false} />
  );
};
export { ViewTable, EditTable };