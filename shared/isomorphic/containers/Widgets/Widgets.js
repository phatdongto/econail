import React from "react";
import clone from "clone";
import { Row, Col } from "antd";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import basicStyle, { colors } from "@iso/assets/styles/constants";
import IsoWidgetsWrapper from "./WidgetsWrapper";
import IsoWidgetBox from "./WidgetBox";
import CardWidget from "./Card/CardWidget";
import ProgressWidget from "./Progress/ProgressWidget";
import SingleProgressWidget from "./Progress/ProgressSingle";
import ReportsWidget from "./Report/ReportWidget";
import StickerWidget from "./Sticker/StickerWidget";
import SaleWidget from "./Sale/SaleWidget";
import VCardWidget from "./vCard/vCardWidget";
import SocialWidget from "./SocialWidget/SocialWidget";
import SocialProfile from "./SocialWidget/SocialProfileIcon";
import userpic from "@iso/assets/images/user1.png";
import { isServer } from "@iso/lib/helpers/isServer";
import { DatePicker } from "antd";

import {
  TableViews,
  tableinfos,
  dataList,
} from "../Tables/AntTables/AntTables";
import * as rechartConfigs from "../Charts/Recharts/config";
import StackedAreaChart from "../Charts/Recharts/Charts/StackedAreaChart";
import GoogleChart from "react-google-charts";
import * as googleChartConfigs from "../Charts/GoogleChart/config";
import IntlMessages from "@iso/components/utility/intlMessages";
import { StickerWidgetWrapper } from "./Sticker/StickerWidget.styles";

const tableDataList = clone(dataList);
tableDataList.size = 5;
const styles = {
  wisgetPageStyle: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    overflow: "hidden",
  },
};
const SIGNLE_PROGRESS_WIDGET = [
  {
    label: "widget.singleprogresswidget1.label",
    percent: 70,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget2.label",
    percent: 80,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget3.label",
    percent: 40,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget4.label",
    percent: 60,
    barHeight: 7,
    status: "active",
    info: true,
  },
];

const STICKER_WIDGET = [
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget4.text",
    icon: "ion-android-cart",
    fontColor: "#ffffff",
    bgColor: "#F75D81",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "Customer",
    icon: "ion-android-people",
    fontColor: "#ffffff",
    bgColor: "#7266BA",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "Revenue",
    icon: "ion-android-camera",
    fontColor: "#ffffff",
    bgColor: "#42A5F6",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget3.text",
    icon: "ion-chatbubbles",
    fontColor: "#ffffff",
    bgColor: "#7ED320",
  },
];

const SALE_WIDGET = [
  {
    label: "widget.salewidget1.label",
    price: "widget.salewidget1.price",
    details: "widget.salewidget1.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget2.label",
    price: "widget.salewidget2.price",
    details: "widget.salewidget2.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget3.label",
    price: "widget.salewidget3.price",
    details: "widget.salewidget3.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget4.label",
    price: "widget.salewidget4.price",
    details: "widget.salewidget4.details",
    fontColor: "#F75D81",
  },
];

const CARD_WIDGET = [
  {
    icon: "ion-android-chat",
    iconcolor: "#42A5F5",
    number: "widget.cardwidget1.number",
    text: "widget.cardwidget1.text",
  },
  {
    icon: "ion-music-note",
    iconcolor: "#F75D81",
    number: "widget.cardwidget2.number",
    text: "widget.cardwidget2.text",
  },
  {
    icon: "ion-trophy",
    iconcolor: "#FEAC01",
    number: "widget.cardwidget3.number",
    text: "widget.cardwidget3.text",
  },
];

const PROGRESS_WIDGET = [
  {
    label: "widget.progresswidget1.label",
    details: "widget.progresswidget1.details",
    icon: "ion-archive",
    iconcolor: "#4482FF",
    percent: 50,
    barHeight: 7,
    status: "active",
  },
  {
    label: "widget.progresswidget2.label",
    details: "widget.progresswidget2.details",
    icon: "ion-pie-graph",
    iconcolor: "#F75D81",
    percent: 80,
    barHeight: 7,
    status: "active",
  },
  {
    label: "widget.progresswidget3.label",
    details: "widget.progresswidget3.details",
    icon: "ion-android-download",
    iconcolor: "#494982",
    percent: 65,
    barHeight: 7,
    status: "active",
  },
];

const SOCIAL_PROFILE = [
  {
    url: "#",
    icon: "ion-social-facebook",
    iconcolor: "#3b5998",
  },
  {
    url: "#",
    icon: "ion-social-twitter",
    iconcolor: "#00aced",
  },
  {
    url: "#",
    icon: "ion-social-googleplus",
    iconcolor: "#dd4b39",
  },
  {
    url: "#",
    icon: "ion-social-linkedin-outline",
    iconcolor: "#007bb6",
  },
  {
    url: "#",
    icon: "ion-social-dribbble-outline",
    iconcolor: "#ea4c89",
  },
];
export default function() {
  const { rowStyle, colStyle } = basicStyle;

  const chartEvents = [
    {
      eventName: "select",
      callback(Chart) {},
    },
  ];

  const stackConfig = {
    ...rechartConfigs.StackedAreaChart,
    width: !isServer && window.innerWidth < 450 ? 300 : 500,
  };
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const widgetStyle = {
    backgroundColor: '#808080',
    width: '400px',
    margin:'10px'
  };
  return (
    <LayoutWrapper>
      <div style={styles.wisgetPageStyle}>
        <StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
          {/* Sticker Widget */}
          <div className="isoIconWrapper">
            <i className="ion-android-calendar" style={{ color: "#FFFFFF" }} />
          </div>

          <div className="isoContentWrapper">
            <h3
              className="isoStatNumber"
              style={{ color:'white',paddingLeft:"10px" }}
            >
              Ch???n th??ng
            </h3>
            <span className="isoLabel" style={{ color: "#ffffff" }}>
              <DatePicker
                mode="month"
                style={{ margin: "15px" }}
                placeholder="Ch???n th??ng"
              />
            </span>
          </div>
        </StickerWidgetWrapper>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="210" />}
                text={<IntlMessages id="Order Sale" />}
                icon="ion-android-cart"
                fontColor="#ffffff"
                bgColor="#F75D81"
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="100" />}
                text={<IntlMessages id="Service Sale" />}
                icon="ion-android-cart"
                fontColor="#ffffff"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="2101" />}
                text={<IntlMessages id="Customer" />}
                icon="ion-android-people"
                fontColor="#ffffff"
                bgColor="#7266BA"
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="10000000" />}
                text={<IntlMessages id="Total Revenue" />}
                icon="ion-cash"
                fontColor="#ffffff"
                bgColor="#7ED320"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={0} justify="start">
          {SALE_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label={<IntlMessages id={widget.label} />}
                  price={<IntlMessages id={widget.price} />}
                  details={<IntlMessages id={widget.details} />}
                  fontColor={widget.fontColor}
                />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470} style={{ overflow: "hidden" }}>
                <GoogleChart
                  {...googleChartConfigs.ServiceBarChart}
                  chartEvents={chartEvents}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470} style={{ overflow: "hidden" }}>
                <GoogleChart
                  {...googleChartConfigs.BarChart}
                  chartEvents={chartEvents}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Report Widget */}
              <ReportsWidget
                label={<IntlMessages id="widget.reportswidget.label" />}
                details={<IntlMessages id="widget.reportswidget.details" />}
              >
                {SIGNLE_PROGRESS_WIDGET.map((widget, idx) => (
                  <SingleProgressWidget
                    key={idx}
                    label={<IntlMessages id={widget.label} />}
                    percent={widget.percent}
                    barHeight={widget.barHeight}
                    status={widget.status}
                    info={widget.info} // Boolean: true, false
                  />
                ))}
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* VCard Widget */}
              <VCardWidget
                style={{ height: "450px" }}
                src={userpic}
                alt="Jhon"
                name={<IntlMessages id="widget.vcardwidget.name" />}
                title={<IntlMessages id="widget.vcardwidget.title" />}
                description={
                  <IntlMessages id="widget.vcardwidget.description" />
                }
              >
                <SocialWidget>
                  {SOCIAL_PROFILE.map((profile, idx) => (
                    <SocialProfile
                      key={idx}
                      url={profile.url}
                      icon={profile.icon}
                      iconcolor={profile.iconcolor}
                    />
                  ))}
                </SocialWidget>
              </VCardWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </div>
    </LayoutWrapper>
  );
}
