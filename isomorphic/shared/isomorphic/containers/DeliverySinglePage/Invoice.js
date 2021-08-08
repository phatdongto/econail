import React from 'react';
import moment from 'moment';
import InvoiceAddress from '@iso/components/Invoice/Address';
import { ViewTable } from './InvoiceTable';
import PageHeader from '../../components/utility/pageHeader';
export default function Invoice({ currentInvoice }) {
  return (
    <div className="PageContent" style={{ padding: '20' }}>
      <div className="OrderInfo">
        <div className="LeftSideContent">
          <h3 className="Title">Mã đơn hàng</h3>
          <span className="InvoiceNumber">{currentInvoice.number}</span>
        </div>
        <div className="RightSideContent">
          <p>
            <span className="orderStatusSpan">Tình trạng đơn hàng: </span>
            <span className="orderStatus">Đang chờ</span>
          </p>
          <p>
            <span className="orderDateSpan">Ngày đặt: </span>
            <span className="orderDate">
              {moment(new Date(currentInvoice.orderDate)).format(
                'MMMM Do YYYY'
              )}
            </span>
          </p>
          <p>
            <span className="orderDateSpan">Ngày hẹn: </span>
            <span className="orderDate">
              {moment(new Date(currentInvoice.orderDate)).format(
                'MMMM Do YYYY'
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="BillingInformation">
        <div className="LeftSideContent">
          <h3 className="Title">Người đặt</h3>

          <InvoiceAddress
            companyName={currentInvoice.billFrom}
            companyAddress={currentInvoice.billFromAddress}
          />
        </div>
        <div className="RightSideContent">
          <h3 className="Title">Chi nhánh</h3>

          <InvoiceAddress
            
            companyAddress={currentInvoice.billToAddress}
          />
          <h3 className="Title" style={{marginTop:"10px"}}>Người giao</h3>
          <InvoiceAddress
            companyName={currentInvoice.billTo}
            
          />
        </div>
        
      </div>
      <div className="InvoiceTable">
        <PageHeader>Chi tiết đơn hàng</PageHeader>
        <ViewTable invoiceList={currentInvoice.invoiceList} />
        <div className="TotalBill">
          <p>
            Giá :{' '}
            <span>{`${currentInvoice.currency}${currentInvoice.subTotal}`}</span>
          </p>
          <p>
            Vat :{' '}
            <span>{`${currentInvoice.currency}${currentInvoice.vatPrice}`}</span>
          </p>
          <h3>
            Tổng giá :{' '}
            <span>{`${currentInvoice.currency}${currentInvoice.totalCost}`}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}