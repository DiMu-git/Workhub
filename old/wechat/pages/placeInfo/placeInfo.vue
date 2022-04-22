<template>
	<view class="">
		<view class="container">
			<view class="">
				<image :src="gymnasium.images" class="img"></image>
				<view class="title">
					<view>{{gymnasium.name}} <span style="margin-left: 50rpx; color: red;">{{gymnasium.distance}}</span>
					</view>
				</view>
				<u-gap height="1" bg-color="#bbb" margin-top="50" margin-bottom="50"></u-gap>
				<h1 style="font-size: 38rpx;font-weight: bold;margin-bottom: 20rpx;">
					场地类型</h1>
				<u-grid :col="3">
					<u-grid-item>
						<image :src="gymnasium.type.icon" style="width: 100px;height: 50rpx;"></image>
						<view class="grid-text">{{ gymnasium.type.type }}</view>
					</u-grid-item>
				</u-grid>
				<u-gap height="1" bg-color="#bbb" margin-top="50" margin-bottom="50"></u-gap>
				<h1 style="font-size: 38rpx;font-weight: bold;margin-bottom: 20rpx;">
					场地介绍</h1>
				<view class="" style="padding-bottom: 200rpx;">
					{{gymnasium.description}}
				</view>

			</view>
		</view>
		<view>
			<view class="btn_class">
				<u-button type="success" @click="reserve">我要订场</u-button>
			</view>
		</view>
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
			reserve() {
				uni.navigateTo({
					url: "../reserve/reserve?placeId=" +this.gymnasium.id
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
					url: `/bigtian/place/info/${id}`,
					method: "get"
				}).then(res => {
					this.gymnasium = res.data.place
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
