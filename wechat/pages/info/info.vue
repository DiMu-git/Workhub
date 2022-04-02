<template>
	<view class="">
		<view class="container">
			<view class="">
				<image :src="gymnasium.images" class="img"></image>
				<view class="title">
					<view>{{gymnasium.gymnasium}} <span
							style="margin-left: 50rpx; color: red;">{{gymnasium.distance}}</span></view>
					<view style="margin-top: 20rpx;">
						<span style="color: red;">￥ {{gymnasium.price==null?"待定":gymnasium.price}}</span>
						<span>/小时/场</span>
					</view>

				</view>
				<view style="margin-top: 20rpx;" @click="openMap">
					<uni-icons name="map" type="map" size="20"></uni-icons>&nbsp;
					{{gymnasium.address}}
					<u-icon name="arrow-right" size="30"></u-icon>&nbsp;
				</view>
				<u-gap height="1" bg-color="#bbb" margin-top="50" margin-bottom="50"
					v-if="gymnasium.childrens.length>0"></u-gap>
				<h1 style="font-size: 38rpx;font-weight: bold;margin-bottom: 20rpx;"
					v-if="gymnasium.childrens.length>0">
					场馆列表</h1>
				<view class="">
					<u-row gutter="16">
						<u-col span="6" v-for="item in gymnasium.childrens">
							<u-card margin="25rpx 0" :head-border-bottom="false" padding="0" :border="false"
								@click="placeInfo(item.id)">
								<view slot="head" style="height: 200rpx">
									<image :src="item.images" style="height: 100px;width: 100%;"></image>
								</view>
								<view class="" slot="foot" style="background-color: #F1F8FA;">
									<view>{{item.name}}</view>
								</view>
							</u-card>
						</u-col>
					</u-row>
				</view>
				<u-gap height="1" bg-color="#bbb" margin-top="50" margin-bottom="50"></u-gap>
				<h1 style="font-size: 38rpx;font-weight: bold;margin-bottom: 20rpx;">
					场馆类型</h1>
				<u-grid :col="3">
					<u-grid-item v-for="type in gymnasium.list" :key="type.id" :index="type.id">
						<image :src="type.icon" style="width: 100px;height: 50rpx;"></image>
						<view class="grid-text">{{ type.type }}</view>
					</u-grid-item>
				</u-grid>
				<u-gap height="1" bg-color="#bbb" margin-top="50" margin-bottom="50"></u-gap>
				<h1 style="font-size: 38rpx;font-weight: bold;margin-bottom: 20rpx;">
					场馆介绍</h1>
				<view class="" style="padding-bottom: 200rpx;">
					{{gymnasium.description}}
				</view>

			</view>
		</view>
	<!-- 	<view>
			<view class="btn_class">
				<u-button type="success" @click="reserve">我要订场</u-button>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gymnasium: {}
			};
		},
		onLoad(options) {
			this.info(options.id)
		},
		methods: {
			placeInfo(id) {
				uni.navigateTo({
					url: '../placeInfo/placeInfo?id=' + id
				})
			},
			reserve() {
				uni.navigateTo({
					url: "../reserve/reserve?id=" +this.gymnasium.id
				})
			},
			openMap() {
				var arr = this.gymnasium.longitudeLatitude.split(",")
				uni.openLocation({
					latitude: parseFloat(arr[0]),
					longitude: parseFloat(arr[1]),
					success: function() {
						console.log('success');
					}
				});
			},
			info(id) {
				this.$req({
					url: `/bigtian/gymnasium/info/${id}`,
					method: "get"
				}).then(res => {
					this.getDistance(res.data.gymnasium)
				})
			},
			getDistance(gy) {
				var than = this
				uni.request({
					url: 'https://apis.map.qq.com/ws/distance/v1/matrix', //仅为示例，并非真实接口地址。
					method: 'GET',
					data: {
						mode: 'walking',
						from: getApp().globalData.latLon,
						to: gy.longitudeLatitude,
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
						gy.distance = hw
						this.gymnasium = gy
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.btn_class {
		padding: 50rpx 20rpx;
		border-radius: 20rpx;
		background-color: white;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.container {
		padding: 20rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.img {
			width: 100%;
		}
	}
</style>
