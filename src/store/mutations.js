import {
    ADD_GOODS,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_All_GOODS,
    CLEAR_CART,
    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO
} from "./mutationType"

import { setStore, getStore, removeStore } from "./../plugins/global"
import Vue from 'vue'
export default {
    //添加商品
    [ADD_GOODS](state, { goodsId, goodsName, smallImage, goodsPrice }) {
        let shopCart = state.shopCart;

        if (shopCart[goodsId]) {
            shopCart[goodsId]['num']++;
        } else {
            shopCart[goodsId] = {
                "num": 1,
                "id": goodsId,
                "name": goodsName,
                "small_image": smallImage,
                "price": goodsPrice,
                "checked": true
            };
        }
        state.shopCart = { ...shopCart };
        setStore('shopCart', state.shopCart)
    },
    //初始化购物车
    [INIT_SHOP_CART](state) {
        let initCart = getStore('shopCart');
        if (initCart) {
            state.shopCart = JSON.parse(initCart);
        }
    },
    //移出购物车
    [REDUCE_CART](state, { goodsId }) {
        let tempState = state.shopCart;
        let goods = tempState[goodsId];
        if (goods) {
            if (goods['num'] > 0) {
                goods['num']--;
                if (goods['num'] === 0) {
                    delete tempState[goodsId];
                }
            } else {
                goods = null;
            }

            state.shopCart = { ...tempState };
            setStore('shopCart', state.shopCart);
        }
    },
    //单个商品选中
    [SELECTED_SINGER_GOODS](state, { goodsId }) {
        let tempState = state.shopCart;
        let goods = tempState[goodsId];

        if (goods.checked) {
            goods.checked = !goods.checked;
        } else {
            Vue.set(goods, 'checked', true)
        }

        state.shopCart = { ...tempState };
        setStore('shopCart', state.shopCart);
    },
    [SELECTED_All_GOODS](state, { isSelected }) {
        let tempState = state.shopCart;
        Object.values(tempState).forEach((goods) => {
            if (goods.checked) { // 存在该属性
                goods.checked = !isSelected;
            } else {
                Vue.set(goods, 'checked', !isSelected);
            }
        });
        // Object.values(tempState).forEach((goods,index)=>{
        //     goods['checked'] = isSelected;
        // });
        //
        state.shopCart = { ...tempState };
        setStore('shopCart', state.shopCart);
    },
    //清空购物车
    [CLEAR_CART](state) {
        state.shopCart = {};
        setStore('shopCart', state.shopCart);
    },

    //保存用户信息到本地
    [USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo);
    },

    //获取用户信息
    [INIT_USER_INFO](state) {
        //获取用户信息
        let userInfo = getStore('userInfo');
        //判断
        if (userInfo) {
            state.userInfo = JSON.parse(userInfo);
        }//else 发起请求获取信息
    },

    [RESET_USER_INFO](state) {
        state.userInfo = {};
        removeStore('userInfo');
    }


}