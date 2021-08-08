import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
import invoiceActions from '@iso/redux/invoice/actions';
import CardWrapper, { Box, StatusTag } from '../../Invoice/Invoice.styles';
import TableWrapper from '../../Tables/AntTables/AntTables.styles';
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
      title: 'Tên',
      dataIndex: 'number',
      rowKey: 'number',
      width: '15%',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'billFrom',
      rowKey: 'billFrom',
      width: '25%',
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
        return <StatusTag className={className}>online</StatusTag>;
      },
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (text, invoice) => (
        <div className="isoInvoiceBtnView">
          <Link to={`/dashboard/customer_management/${invoice.id}`}>
            <Button color="primary" className="invoiceViewBtn">
              Xem
            </Button>
          </Link>{' '}
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
  const getnewInvoiceId = () => new Date().getTime();
  // const { match, invoices, deleteInvoice } = this.props;
  
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="Tài khoản khách hàng" />
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/${getnewInvoiceId()}`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              Thêm mới khách hàng
            </Button>
          </Link>
        </div>

        <CardWrapper title="Invoices">
          {invoices.length === 0 ? (
            <HelperText text="No Invoices" />
          ) : (
            <div className="isoInvoiceTable">
              <Scrollbars
                style={{ width: '100%', height: 'calc(100vh - 70px)' }}
              >
                <TableWrapper
                  
                  dataSource={invoices}
                  columns={columns}
                  pagination={false}
                  className="invoiceListTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}

