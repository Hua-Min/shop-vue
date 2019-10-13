<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item) in sowingList" :key="item.public_id">
            <img :src="item.icon_url" :alt="item.public_name">
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: 'Sowing-basic',
        data() {
            return {
                swiperOption: {
                    //数据之前渲染
                    notNextTick: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    autoplay: {
                        delay: 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                        speed: 500,
                    },
                    loop:true,
                    on: {
                        slideChangeTransitionEnd: function () {
                            // alert(this.activeIndex);
                        },
                    }
                }
            }
        },
        props:{
          sowingList:Array,
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            // this.swiper.slideTo(5, 1000, false);
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>
<style scoped>
    #swiper {
        width: 100%;
        height: 14rem;
        padding-top: 3.125rem;
        background-color: red;
    }
    #swiper img{
        width: 100%;
        height: 100%;
    }

</style>