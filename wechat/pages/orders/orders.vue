<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			<swiper :style="{ height: height + 'px' }" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y :style="{ height: height + 'px' }" @scrolltolower="onreachBottom">
						<u-card v-for="items in item.data">
							<view slot="head">
								<span style="position: absolute;right: 100rpx;top: 8rpx; color: red;" v-if="items.status == 0" @click="cancel(items.id,1)">去支付</span>
								<span style="position: absolute;right: 20rpx;top: 8rpx; color: blue; " v-if="items.status == 0" @click="cancel(items.id,2)">取消</span>
								<span style="position: absolute;right: 20rpx;top: 8rpx; color: blue;" v-if="items.status == 1">已支付</span>
								<span style="position: absolute;right: 20rpx;top: 8rpx;color: #919293;" v-if="items.status == 2">已取消</span>
							</view>
							<view class="" slot="body" style="position: relative;">
								<image
									:src="items.images"
									style="width: 200rpx;height: 100px;"
								></image>
								<view style="display: inline-block;top: 10rpx;left:280rpx;position:  absolute;">{{items.placeName}}</view>
							</view>
						</u-card>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			height: 800,
			title: '素胚勾勒出青花，笔锋浓转淡',
			subTitle: '2020-05-15',
			thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			list: [],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	onLoad(options) {
		this.getList();
	},
	methods: {
		cancel(id,status) {
			var than = this;
			uni.showModal({
				content: status==1?"确定支付吗":'确定取消吗？',
				success: val => {
					if (val.confirm) {
						this.$req({ url: '/bigtians/reserve/update', data: { id, status } }).then(res => {
							if (res.data.msg == 'success') {
								uni.showToast({
									title: status==1?"支付成功":'取消成功',
									icon: 'success',
									success() {
										var time = setInterval(() => {
											clearInterval(time);

											than.list = [];
											than.getList();
											than.current=undefined ;
										}, 200);
									}
								});
							} else {
								uni.showToast({
									title: '操作失败'
								});
							}
						});
					}
				}
			});
		},
		getList() {
			this.$req({ url: '/bigtians/reserve/listByUserId' }).then(res => {
				var { all, zero, one, two } = res.data.page;
				this.list.push({ name: '全部', data: all });
				this.list.push({ name: '未支付', data: zero });
				this.list.push({ name: '已支付', data: one });
				this.list.push({ name: '已取消', data: two });
			});
		},
		// tabs通知swiper切换
		tabsChange(index) {
			console.log(index);
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多
		onreachBottom() {
			// for (var i = 0; i < 10; i++) {
			// 	console.log(i);
			// 	this.tests.push(i)
			// }
		}
	}
};
</script>
<style lang="scss">
.u-card-wrap {
	background-color: $u-bg-color;
	padding: 1px;
}

.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}

.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
}
</style>
