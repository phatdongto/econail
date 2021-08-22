const options = [
  {
    key:'customer_management',
    label:'Khách hàng',
    leftIcon: 'ion-clipboard',

  },
  {
    key:'branch',
    label:'Chi nhánh',
    leftIcon: 'ion-home',

  },
  {
    key: 'table',
    label: 'Quản lý',
    leftIcon: 'ion-android-menu',
    children: [
      {
        key: 'table_ant',
        label: 'Quản lý dịch vụ',
      },
      {
        key: 'product_management',
        label: 'Quản lý sản phẩm',
      },
    ],
  },
  {
    key:'employee_management',
    label:'Quản lý Nhân viên',
    leftIcon: 'ion-person',

  },
  {
    key:'booking_management',
    label:'Danh sách đăt lịch',
    leftIcon: 'ion-clipboard',

  },
  {
    key:'delivery_management',
    label:'Danh sách đặt hàng',
    leftIcon: 'ion-clipboard',

  },
  

];
export default options;
