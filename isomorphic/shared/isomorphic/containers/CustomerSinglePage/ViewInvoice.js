import React from 'react';
import { Link } from 'react-router-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import fakeData from '../Tables/data';
import Box from '@iso/components/utility/box';
import * as TableViews from './AntTables/TableViews/TableViews';;
import Button from '@iso/components/uielements/button';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import InvoicePageWrapper from './SingleInvoice.styles';
import Invoice from '../Invoice/Invoice';
import { Avatar,Descriptions } from 'antd';
import { tableinfos } from './AntTables/configs';
import { Tabs } from 'antd';
import  { TabPane } from '@iso/components/uielements/tabs';
import AntTable from './AntTables/AntTables';
const dataList = new fakeData(10);
export default function(props) {
  let pdfExportComponent;
  const printDocument = () => {
    pdfExportComponent.save();
  };
  const { currentInvoice, toggleView, redirectPath } = props;
  console.log(props, 'props');
  function renderTable(tableInfo) {
    let Component;
    switch (tableInfo.value) {
    
      case 'booking_service':
        Component = TableViews.BookingView;
        break;
      default:
        Component = TableViews.OrderView;
        break;
      
    }
    return <Component tableInfo={tableInfo} dataList={dataList} />;
  }
  return (
    <LayoutWrapper>
      <Box style={{ padding: 20 }}>
        <InvoicePageWrapper className="InvoicePageWrapper">
          <div className="PageHeader" style={{ padding: '20px 20px 0' }}>
            <Link to={redirectPath}>
              <Button className="isoGoInvoBtn">
                <span>Về trang khách hàng</span>
              </Button>
            </Link>
          </div>
          {/* <div
              id="divToPrint"
              className="mt4"
              style={{
                backgroundColor: '#ffffff',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            > */}
            <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} size="large" size={64} >
              Q
            </Avatar>
            <Descriptions title="" style={{marginTop:"10px"}}>
             <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
             <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
             <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
             <Descriptions.Item label="Remark">empty</Descriptions.Item>
             <Descriptions.Item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
             </Descriptions.Item>
             </Descriptions>
             
             <Tabs defaultActiveKey="1">
               {tableinfos.map(tableinfo => (
               <TabPane tab={tableinfo.title} key={tableinfo.value}>
                 {renderTable(tableinfo)}
                 </TabPane>))}
              </Tabs>
        </InvoicePageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
