import React from "react";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import TableWrapper from "../AntTables.styles";
import { FormWrapper } from "../../AntTables/AntTables.styles";
import { Icon } from 'antd';
import { FilterDropdown } from '@iso/components/Tables/HelperCells';
import { Button } from "antd";
import DrawerDetailService from "./Drawer";
import { backgroundColor, color, marginRight } from "styled-system";
import { ViewWrapper } from "../../../CustomerSinglePage/AntTables/AntTables.styles";
import { Drawer, Descriptions, Badge, Modal,Form,Input,Radio} from "antd";
import DrawerProduct from "../DrawerDetailProduct/DrawerDetailProduct";
import products from "../../product";


//import AddEmployeeView from "../../EmployeeTable/TableView/ModalView/AddEmployeeView";
const { TextArea } = Input;
export default function(props) {
  let history = useHistory();
  const USER_TOKEN = localStorage.getItem("token");
  const AuthStr = "Bearer ".concat(USER_TOKEN);
  const [name, setName] = useState();
  const [price , setPrice] = useState();
  const [price_discount,setPriceDiscount]=useState();
  const [description,setDescription]=useState();
  const [picture,setPicture]=useState();
  const [stock,setStock]=useState();
  
  const [amount,setAmount]=useState();
 
  const [unit, setUnit] = React.useState();
  const [state, setState] = React.useState({
    dataList: products.data.data,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    product:{},
    product_id:null,
    product_name:null,
  });

  function onSearch() {
    let { searchText } = state;
    searchText = searchText.toUpperCase();
    const dataList = products.data.data
      .filter(data => data['name'].toUpperCase().includes(searchText));
    setState({
      dataList,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
    });
  }
  function onInputChange(event) {
    setState({ ...state, searchText: event.target.value });
  }
  let { searchText } = state;
  
  const filterDropdown = (
    <FilterDropdown
      searchText={searchText}
      onInputChange={onInputChange}
      onSearch={onSearch}
    />
  );
  const [visibleInfo, setVisibleInfo] = React.useState(false);
  let name1;
  const showDrawerInfo = (name) => {
    name1=name;
    setVisibleInfo(true);
    
  };
  const handleCancelDrwerInfo = () => {
    setVisibleInfo(false);
  };
  const [visibleDeleteModal, setVisibleDeleteModal] = React.useState(false);
  const showModalDelete = () => {
    setVisibleDeleteModal(true);
  };


  const handleCancelDeleteModal = () => {
    console.log("Clicked cancel button");
    setVisibleDeleteModal(false);
  };
  //
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "10%",
      filterDropdown,
    filterIcon: (
      <Icon
        type="search"
        style={{ color: state.filtered ? '#108ee9' : '#aaa' }}
      />
    ),
    filterDropdownVisible: state.filterDropdownVisible,
    onFilterDropdownVisibleChange: visible => {
      setState({ ...state, filterDropdownVisible: visible });
      document.getElementById('tableFilterInput').focus();
    }
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Giá ưu đãi",
      dataIndex: "price_discount",
      key: "price_discount",
      width: "7%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "20%",
      ellipsis: true,
    },
    

    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (text, record ) => (
        <>
          <Button
            key={`${record.id}`}
            
            onClick={() => {
              showDrawerInfo(record.name);
              state.product=record
            }}
            type="primary"
            shape="round"
            style={{marginRight: "10px",border:'none'}}
          >Chi tiết</Button>
        
        <Button onClick={() => {
              showModalDelete();
              state.product_id = record.id;
              state.product_name = record.name;
            }} shape="circle" type="danger">
            <i className="ion-android-delete" />
          </Button>
        
          
        </>
      ),
    },
  ];
  const myColTitleStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
  const [data,setData] = useState([]);
  function getProduct() {
    axios
      .get("http://econail.localhost/api/admin/product", {
        headers: {
          Authorization: AuthStr,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const product = response.data.data.data;
        setData(product);
      });
  }
  useEffect(()=>{
    getProduct();
  },[]);
  // Delete Product
  async function DeleteProduct(productID) {  
    return axios.get(`http://econail.localhost/api/admin/product/${productID}/delete`,
    { headers: { Authorization: AuthStr,'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS','Access-Control-Allow-Origin' : '*' }})
    .then(res=>res.data.status);

  }
  const handleOkDeleteModal = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    const statusDelete = await DeleteProduct(state.product_id);
    if(statusDelete==true){
    setTimeout(() => {
      
      setVisibleDeleteModal(false);
      setConfirmLoading(false);
      getProduct();
      
      
      
    }, 2000);
  }
  };
  async function AddProduct(){
    return axios.post('http://econail.localhost/api/admin/product',
    {
      "name" : name,
      "price" : parseInt(`${price}`),  
      "price_discount" : parseInt(`${price_discount}`),
      "description" : `${description}`, 
      "picture" : null,
      "stock" :parseInt(`${stock}`),
      "amount": parseInt(`${amount}`),
      "unit" : "gam",
      "products_categories_id" :1
  },{ headers: { Authorization: AuthStr,'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS','Access-Control-Allow-Origin' : '*' }}  
    ).then(res=>res.data.status);
    
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const statusAdd =  await AddProduct();
    console.log(statusAdd);
    if(statusAdd == true){
    setVisible(false);
    history.push('/dashboard/product_management');
    
    }
    else{
      history.push('/dashboard');
    }

  }
  return (
    <>
      <ViewWrapper>
        <Button
          shape="round"
          onClick={showModal}
          style={{ marginBottom: "3%" ,backgroundColor:"#22D3EE",color:"whitesmoke"  }}
        >
          Thêm sản phẩm mới +
        </Button>
        <TableWrapper dataSource={data} columns={columns} />
      </ViewWrapper>
      <Modal
            title="Xác nhận"
            visible={visibleDeleteModal}
            onOk={handleOkDeleteModal}
            onCancel={handleCancelDeleteModal}
            okText="Xác nhận"
            cancelText="Hủy"
            okType="danger"
          >
            Xóa sản phẩm {state.product_name}?
          </Modal>
      <Modal
        title="Thêm nhân viên"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        
      </Modal>
      <Drawer  
        closable={false}
        title="Thông tin  sản phẩm"
        width={720}
        visible={visibleInfo}
        onClose={handleCancelDrwerInfo}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <DrawerProduct service={state.product}/>
        
      </Drawer>
      <Modal
        title="Thêm sản phẩm"
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <FormWrapper>
          <Form name="basic" layout="vertical" hideRequiredMark>
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              
            >
              <Input onChange={(e) => {setName(e.target.value)}} />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              
            >
              <Input onChange={(e) => setPrice(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Giá ưu đãi"
              name="price_discount"
              
            >
              <Input onChange={(e) => setPriceDiscount(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              
            >
              <TextArea
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="picture"
              
              
            >
              <Input onChange={(e) => setPicture(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Stock"
              name="stock"
              
            >
              <Input onChange={(e) => setStock(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="amount"
              
            >
              <Input onChange={(e) => setAmount(e.target.value)}/>
            </Form.Item>
            
            
            <Form.Item
              label="Đơn vị"
              name="unit"
              
              
            >
              <Input onChange={(e) => setUnit(e.target.value)} />
            </Form.Item>
            
            
          </Form>
        </FormWrapper>
      </Modal>
    </>
  );
}
