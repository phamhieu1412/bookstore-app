export default {
  categories: {
    '01': {
      term: 'thịt',
      icon: 'turkey',
      homeBackground: '#FFDFDF',
      color: '#FF8A8A',
      palatte: ['#FFDFDF', '#DC7D7D', '#E98848', '#FFEBA4'],
    },
    '02': {
      term: 'thủy',
      icon: 'fish',
      homeBackground: '#DCEBFF',
      color: '#88D3FF',
      palatte: ['#CAEEF4', '#3AA0DD', '#AD8244'],
    },
    '03': {
      term: 'rau',
      icon: 'carrot',
      homeBackground: '#ECFFDB',
      color: '#95D45A',
      palatte: ['#C4DD7A', '#E3BB88', '#FF492C', '#848B28'],
    },
    '05': {
      term: 'đồ khô',
      icon: 'mushroom',
      homeBackground: '#EFE0DA',
      color: '#BA9E88',
      palatte: ['#FFE8D9', '#BA9E88', '#FF7C00', '#AE5105'],
    },
    '04': {
      term: 'trái',
      icon: 'orange',
      homeBackground: '#FFF3D5',
      color: '#FFC635',
      palatte: ['#FFB414', '#D92538'],
    },
    all: {
      term: 'all',
      name: 'Xem danh mục',
      icon: 'stew',
      homeColor: '#4CD964',
      homeBorder: '#C3C3C3',
    },
    '06': {
      term: 'gia vị',
      icon: 'mushroom',
      homeBackground: '#EFE0DA',
      color: '#BA9E88',
      palatte: ['#FFE8D9', '#BA9E88', '#FF7C00', '#AE5105'],
    },

    allColors: [
      '#FFDFDF',
      '#DC7D7D',
      '#FFEBA4',
      '#E98848',
      '#CAEEF4',
      '#3AA0DD',
      '#AD8244',
      '#C4DD7A',
      '#E3BB88',
      '#FF492C',
      '#848B28',
      '#FFB414',
      '#D92538',
      '#FFE8D9',
      '#BA9E88',
      '#FF7C00',
      '#AE5105',
      '#FFE8D9',
      '#BA9E88',
      '#FF7C00',
      '#AE5105',
    ],
  },

  HomeCategories: [
    {
      categoryTerm: 'thịt',
      icon: 'turkey',
      background: '#FFDFDF',
    },
    {
      categoryTerm: 'rau',
      icon: 'carrot',
      background: '#ECFFDB',
    },
    {
      categoryTerm: 'thủy',
      icon: 'fish',
      background: '#DCEBFF',
    },
    {
      categoryTerm: 'trái',
      icon: 'orange',
      background: '#FFF3D5',
    },
    {
      categoryTerm: 'đồ khô',
      icon: 'mushroom',
      background: '#EFE0DA',
    },
    {
      categoryTerm: 'all',
      name: 'Xem danh mục',
      icon: 'stew',
      color: '#4CD964',
      border: '#C3C3C3',
    },
    // {
    //   categoryTerm: 'món',
    //   icon: 'stew',
    //   color: '#4CD964',
    // },
  ],

  showStatusBar: true,
  LogoLoading: '',
  // LogoLoading: require('@images/logo.png'),

  appFacebookId: '1788796174511520',

  intro: [
    {
      key: 'page1',
      title: 'Thực phẩm chất lượng',
      text:
        'Nguồn thực phẩm được tuyển chọn phong phú, tươi ngon có nguồn gốc xuất xứ rõ ràng và thông tin đầy đủ',
      icon: 'ios-basket',
      colors: ['#FB931B', '#FF0025'],
    },
    {
      key: 'page2',
      title: 'Công nghệ thông minh',
      text:
        'Công nghệ là nền tảng sức mạnh được áp dụng toàn diện trong các khâu giám sát, xử lý và vận hành',
      icon: 'md-checkbox-outline',
      colors: ['#FB931B', '#FF0025'],
    },
    {
      key: 'page3',
      title: 'Am hiểu tận tình',
      text:
        'Kinh nghiệm, sự am hiểu và tinh thần lắng nghe để phục vụ tạo nên sự gắn kết như tình thân',
      icon: 'ios-card',
      colors: ['#FB931B', '#FF0025'],
    },
  ],

  // define menu for profile tab
  ProfileSettings: [
    {
      label: 'MyOrder',
      routeName: 'MyOrdersScreen',
    },
    {
      label: 'WishList',
      routeName: 'WishListScreen',
    },
    {
      label: 'Notifications',
      routeName: 'MyMessagesScreen',
    },
    // {
    //   label: 'Development',
    //   routeName: 'DevSettingsScreen',
    // },
    // only support mstore pro
    // {
    //   label: 'PushNotification',
    // },
  ],
};
