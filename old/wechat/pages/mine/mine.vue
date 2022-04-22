<template>
	<view class="container">
		<view style="padding: 80px 30rpx;">
			<!-- user box begin -->
			<view class="d-flex flex-column bg-white user-box">
				<view class="d-flex align-items-center"  style="margin-bottom: 20rpx;">
					<view class="avatar">
						<image :src="isLogin ? member.avatarUrl : '/static/images/mine/default.png'"></image>
					</view>
					<view class="d-flex flex-column flex-fill overflow-hidden" style="margin-top: 20rpx;">
						<view v-if="isLogin" class="font-size-lg font-weight-bold d-flex justify-content-start align-items-center">
							<view class="text-truncate">{{ member.nickName }}</view>
							<view class="iconfont iconarrow-right line-height-100"></view>
						</view>
						<view v-else class="font-size-lg font-weight-bold" @tap="login">请点击授权登录</view>
						
					</view>
				</view>
				<u-cell-group>
					<u-cell-item icon="account-fill" title="个人信息"  v-if="isLogin" @tap="userinfo"></u-cell-item>
					<u-cell-item icon="bag-fill" title="我的订单"  v-if="isLogin" @tap="orders()"></u-cell-item>
				</u-cell-group>
			</view>
		
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import common from '@/apis/common.js';
export default {
	data() {
		return {
			newIcon: 'https://img-shop.qmimg.cn/s16/images/2020/05/12/ffb0613dded704b6.png',
			phoneInfo: {
				iv: '',
				data: '',
				key: ''
			}
		};
	},
	computed: {
		...mapState(['member']),
		...mapGetters(['isLogin']),
		growthValue() {
			if (!this.isLogin) return 0;
			const { currentValue, needValue } = this.member;
			return (currentValue / (currentValue + needValue)) * 100;
		}
	},
	onLoad() {
	},
	methods: {
		login() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		orders() {
			if (!this.isLogin) {
				this.login();
				return;
			}
			uni.navigateTo({
				url: '/pages/orders/orders'
			});
		},
		
		userinfo() {
			if (!this.isLogin) {
				this.login();
				return;
			}
			uni.navigateTo({
				url: '/pages/mine/userinfo'
			});
		},
	}
};
</script>

<style lang="scss" scoped>
page {
	height: auto;
	min-height: 100%;
}

.bg {
	width: 100%;
	height: calc(410 / 594 * 750rpx);
}

.hym-btn {
	position: absolute;
	top: 40rpx;
	right: 40rpx;
	color: $color-primary;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50rem;
	font-size: $font-size-sm;
	box-shadow: 0 0 20rpx rgba(66, 66, 66, 0.1);
	&::after {
		border: 0;
	}

	image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
}

.user-box {
	position: relative;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	margin-top: -115rpx;
	box-shadow: $box-shadow;
}

.avatar {
	position: relative;
	margin-top: -35rpx;
	margin-left: 35rpx;
	margin-right: 35rpx;
	width: 160rpx;
	height: 160rpx;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.2);

	image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
	}

	.badge {
		position: absolute;
		right: -10rpx;
		bottom: -10rpx;
		background-color: #ffffff;
		border-radius: 50rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $color-warning;
		font-size: 24rpx;
		padding: 8rpx 16rpx;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.2);

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
}

.level-benefit {
	margin-left: 35rpx;
	padding: 10rpx 0 10rpx 30rpx;
	border-radius: 50rem 0 0 50rem;
}

.user-grid {
	width: 25%;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.value {
		margin-bottom: 20rpx;
	}
}

.level-benefit-box {
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 10rpx 8rpx rgba($color: #878889, $alpha: 0.1);
	width: 100%;
	display: flex;
	padding: 30rpx;
	flex-direction: column;
	background-color: #ffffff;

	.row {
		display: flex;
		padding: 30rpx 0 20rpx;
		justify-content: space-around;
		align-items: center;

		.grid {
			width: 20%;
			display: flex;
			flex-direction: column;
			font-size: $font-size-sm;
			color: $text-color-assist;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
			}
		}
	}
}

.banner {
	width: 100%;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
}

.service-box {
	width: 100%;
	background-color: #ffffff;
	padding: 32rpx 30rpx 10rpx;
	box-shadow: $box-shadow;

	.row {
		display: flex;
		flex-wrap: wrap;
		color: $text-color-assist;
		font-size: $font-size-sm;
		padding-bottom: -40rpx;

		.grid {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 40rpx;
			width: 25%;
			position: relative;

			.image {
				image {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 20rpx;
				}
			}

			.new-badage {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 0;
				right: 30rpx;
			}
		}
	}
}
</style>
