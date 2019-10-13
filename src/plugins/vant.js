import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import { Loading } from 'vant';
import { Image } from 'vant';

Vue.use(Loading);

Vue.use(Tabbar).use(TabbarItem);

//图片懒加载
Vue.use(Image);

import { Lazyload } from 'vant';

// options 为可选参数，无则不传
Vue.use(Lazyload);

//提示
import { Toast } from 'vant';
Vue.use(Toast);

//弹出提示框
import { Dialog } from 'vant';
Vue.use(Dialog);

//navbar
import { NavBar } from 'vant';
Vue.use(NavBar);

// 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

//宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

//地址相关
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit);

import { AddressList } from 'vant';
Vue.use(AddressList);

import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

//submit
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);