import ajax from './ajax'


// http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
// lk001 - lk006

const BASE_URL = 'http://demo.itlike.com/web/xlmc';

export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);

//  用户中心接口
//  http://localhost:3000/web/xlmc/api/send_code
// 'http://demo.itlike.com/web/xlmc';


//  获取短信验证码(GET)
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', { phone });
// 手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', { phone, code }, 'POST');
//账号密码登陆
export const pwdLogin = (userName, userPwd, cap) => ajax(BASE_URL + '/api/login_pwd', { userName, userPwd, cap }, 'POST');
//自动登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo');
//退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout');

//添加到购物车
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(BASE_URL + '/api/cart/add', { user_id, goods_id, goods_name, goods_price, small_image }, 'POST');

//获取当前用户购物车中的商品
export const getGoodsCart = (user_id) => ajax(BASE_URL + '/api/cart/search/' + user_id);

//修改购物车商品数量
export const changeCartNum = (user_id, goods_id, type) => ajax(BASE_URL + '/api/cart/num', { user_id, goods_id, type }, 'POST');

//删除当前用户购物车中所有的商品
export const clearAllCart = (user_id) => ajax(BASE_URL + '/api/cart/clear/' + user_id);


// 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(BASE_URL + '/api/address/search/' + user_id);

// 添加新的地址
export const addUserAddress = (user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/add', { user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');

//编辑用户的地址
export const changeUserAddress = (address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/add', { address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');

// 删除用户的地址
export const delUserAddress = (address_id) => ajax(BASE_URL + '/api/address/del/' + address_id);

// 获取单条地址
export const getCurrentUserAddress = (user_id, address_id) => ajax(BASE_URL + '/api/address/one', { user_id, address_id }, 'POST');

