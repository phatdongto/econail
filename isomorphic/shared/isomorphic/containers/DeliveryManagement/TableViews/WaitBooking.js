import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import invoiceActions from '@iso/redux/invoice/actions';
import TableWrapper from "../DeliveryManagement.style"
import { Button } from 'antd';
import { ViewWrapper } from '../DeliveryManagement.style';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import _ from 'lodash';
import CardWrapper, { Box, StatusTag } from '../../Invoice/Invoice.styles';
import Scrollbars from '@iso/components/utility/customScrollBar';
import IntlMessages from '../../../components/utility/intlMessages';

import { PageHeader } from 'antd';
const { initData, deleteInvoice } = invoiceActions;
export default function Invoices() {
  const [selected, setSelected] = React.useState([]);
  const { initialInvoices, invoices } = useSelector(state => state.Invoices);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    if (!initialInvoices) {
      dispatch(initData());
    }
  }, [dispatch, initialInvoices]);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'number',
      rowKey: 'number',
      width: '15%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Tên KH',
      dataIndex: 'billFrom',
      rowKey: 'billFrom',
      width: '15%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'billFrom',
      rowKey: 'billFrom',
      width: '15%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Tổng giá',
      dataIndex: 'billFrom',
      rowKey: 'billFrom',
      width: '10%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Nhân viên giao hàng',
      dataIndex: 'billFrom',
      rowKey: 'billFrom',
      width: '20%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      rowKey: 'orderStatus',
      width: '13%',
      render: (text, orderStatus) => {
        let className;
        if (text === 'shipped' || text === 'Shipped' || text === 'SHIPPED') {
          className = 'shipped';
        } else if (
          text === 'delivered' ||
          text === 'Delivered' ||
          text === 'DELIVERED'
        ) {
          className = 'delivered';
        } else if (
          text === 'pending' ||
          text === 'Pending' ||
          text === 'PENDING'
        ) {
          className = 'pending';
        }
        return <StatusTag className='pending'>Đang chờ</StatusTag>;
      },
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '20%',
      render: (text, invoice) => (
        <div className="isoInvoiceBtnView">
          <Link to={`/dashboard/delivery_management/confirm/${invoice.id}`}>
            <Button color="dashed" className="invoiceViewBtn">
              Xác nhận
            </Button>
          </Link>{' '}
          
          {' '}
          <Button
            className="invoiceDltBtn"
            // icon="delete"
            onClick={() => {
              notification('error', '1 invoice deleted');
              dispatch(deleteInvoice([invoice.key]));
              setSelected([]);
            }}
          >
            <i className="ion-android-delete" />
          </Button>
        </div>
      ),
    },
  ];
  
  // const { match, invoices, deleteInvoice } = this.props;
  
  return (
    <ViewWrapper>
       {invoices.length === 0 ? (
            <HelperText text="No Invoices" />
          ) : (
            <div className="isoInvoiceTable">
              
                <TableWrapper
                  
                  dataSource={invoices}
                  columns={columns}
                  pagination={false}
                  className="invoiceListTable"
                />
              
            </div>
          )}
       
    
    </ViewWrapper>
  );
}
