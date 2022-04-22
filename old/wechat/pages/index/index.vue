<template>
	<view class="content">
		<view style="width: 100%;line-height: 70rpx; margin-bottom: 20rpx;">
			<span class="city">
				<u-icon name="map" size="35"></u-icon>
				{{ city }}
			</span>
			<u-search @custom="search" v-model="keyword" bg-color="white" input-align="left"
				style="display:inline-block;width: 80%;" height="70"></u-search>
		</view>
		<u-swiper :list="imgs" height="400"></u-swiper>
		<view class="type">
			<u-grid :col="4" @click="searType">
				<u-grid-item>
					<image src="../../static/全部.svg" style="width: 100px;height: 50rpx;"></image>
					<view class="grid-text">全部</view>
				</u-grid-item>
				<u-grid-item v-for="type in types" :key="type.id" :index="type.id">
					<image :src="type.icon" style="width: 100px;height: 50rpx;"></image>
					<view class="grid-text">{{ type.type }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-popup v-model="show" mode="center" border-radius="40" :closeable="true" width="500" height="490">
			<view class="notes">
				<view style="font-size: 18px;margin-left: 20rpx;">公告</view>
				<u-divider>{{ notes.name }}</u-divider>

				<view style="font-size: 18px;padding-top: 20rpx;">{{ notes.content }}1</view>
			</view>
		</u-popup>
		<h1 style="font-size: 50upx;">热门场馆</h1>
		<view style="width: 100%;">
			<u-card margin="0rpx 0rpx 50rpx 0rpx" padding="0" v-for="item in list" :key="item.id"
				:head-border-bottom="false">
				<view style="text-align: center;" slot="head">
					<image :src="item.images" mode="heightFix" @click="appointment(item.id)"></image>
				</view>
				<view class="contents" slot="body">
					<view>
						<view class="name">
							{{ item.gymnasium }}
							<span style="margin-left: 50rpx;color: red;">{{ item.distance }}</span>
							<view class="">
								<span style="font-size: 36rpx;">
									<span style="color: red;">￥{{ item.price==null?"待定":item.price }}</span>
									/小时/场
								</span>
							</view>
						</view>
						<view class="types">
							<view style="display: inline-block" v-for="item in item.list" :key="item.id">
								<view class="">
									<image :src="item.icon" style="width: 50rpx;height: 32rpx;"></image>
									<span>{{ item.type }}</span>
								</view>
							</view>
						</view>
					</view>
					<u-icon name="map" size="35"></u-icon>
					{{ item.address }}
					<u-button type="primary" @click="appointment(item.id)">预约</u-button>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				list: [],
				types: [],
				page: 1,
				show: false,
				notes: {},
				keyword: '',
				city: '九江市',
				totalPage: 0,
				currPage: 0,
				imgs: [
					'http://pic.pc6.com/up/2016-12/201612211914477648647.jpg',
					'http://pic.pc6.com/up/2016-12/201612211914477648647.jpg',
					'http://pic.pc6.com/up/2016-12/201612211914477648647.jpg'
				]
			};
		},
		onLoad() {
			this.getLocation();
			this.getCity();
			this.getTypes();
			this.getNote();
		},
		computed: {
			...mapGetters(['isLogin']),
		},
		methods: {
			appointment(id) {
				console.log(this.isLogin);
				if (this.isLogin==false) {
					uni.showToast({
						title:"请先登录"
					})
					return
				}
				uni.navigateTo({
					url: '../info/info?id=' + id
				})
			},
			searType(e) {
				this.type = e;
				this.key = undefined;
				this.list = [];
				this.getList();
			},
			getLocation() {
				var than = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						than.latLon = res.latitude + ',' + res.longitude;
						getApp().globalData.latLon = than.latLon
						than.getList();
					}
				});
			},
			getDistance(froms, to, el) {
				uni.request({
					url: 'https://apis.map.qq.com/ws/distance/v1/matrix', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: {
						mode: 'walking',
						from: froms,
						to: to,
						key: 'PE5BZ-TNGWF-EJEJU-JQARQ-WJXOK-5UBXD' //获取key
					},
					success: res => {

						let hw = res.data.result.rows[0].elements[0].distance; //拿到距离(米)
						if (hw && hw !== -1) {
							if (hw < 1000) {
								hw = hw + 'm';
							}
							//转换成公里
							else {
								hw = (hw / 2 / 500).toFixed(2) + 'km';
							}
						} else {
							hw = '距离太近或请刷新重试';
						}
						console.log(hw);
						el.distance = hw;
						this.list.push(el);
					}
				});
			},
			openMap() {
				uni.openLocation({
					latitude: parseFloat(28.223492),
					longitude: parseFloat(112.961809),
					success: function() {
						console.log('success');
					}
				});
			},
			chooseMap() {
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			//获取场馆信息
			getList() {
				var url = '/bigtian/gymnasium/list?page=' + this.page;
				if (this.key != '' && this.key != undefined) {
					url += '&key=' + this.key;
				}
				if (this.type != '' && this.type != undefined) {
					url += '&type=' + this.type;
				}
				this.$req({
					url: url
				}).then(res => {
					var list = res.data.page.list;
					list.forEach(el => {
						this.getDistance(this.latLon, el.longitudeLatitude, el);
					});
					this.currPage = res.data.page.currPage;
					this.totalPage = res.data.page.totalPage;
				});
			},
			//获取公告
			getNote() {
				this.$req({
					url: '/bigtian/notice/list?limit=1'
				}).then(res => {
					this.notes = res.data.page.list[0];
					this.show = true;
				});
			},
			//获取分类
			getTypes() {
				this.$req({
					url: '/bigtian/gymnasiumtype/list'
				}).then(res => {
					this.types = res.data.page.list;
				});
			},
			search(key) {
				this.type = undefined;
				this.list = [];
				this.key = key;
				this.getList();
			},
			//获取当前城市
			getCity() {
				var than = this;
				uni.request({
					url: 'https://apis.map.qq.com/ws/location/v1/ip?key=PE5BZ-TNGWF-EJEJU-JQARQ-WJXOK-5UBXD',
					method: 'GET',
					data: {},
					success: res => {
						/* 	var location = res.data.result.location;
							than.latLon=location.lat+","+location.lng
							than.getList() */
						than.city = res.data.result.ad_info.city;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop;
			}
		},
		onReachBottom() {
			if (this.currPage < this.totalPage) {
				this.page = this.currPage++;
				this.getList();
			}
		}
	};
</script>

<style lang="scss">
	.content {
		overflow-y: hidden;

		.contents {
			padding: 0 20rpx;
		}

		.info {
			position: absolute;
			color: #ffffff;
			font-size: 50upx;
			bottom: 120rpx;
			left: 30rpx;
			margin: 0;
		}

		.name {
			font-size: 36rpx;
		}

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
		}

		padding: 22upx;

		.city {
			margin-right: 20upx;
		}

		.type {
			margin-top: 20rpx;
		}

		.notes {
			padding: 50rpx;
		}
	}
</style>
