<template>
	<view class="container">
		<view class="intro"></view>
		<view class="bottom">
			<!-- #ifdef H5 -->
			<button type="primary" size="default" class="login-btn" @tap="login">登录</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" size="default" class="login-btn" @click="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">
				<image src="/static/images/mine/wechat.png"></image>
				微信一键登录
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
import Member from '@/api/member';
import { mapMutations } from 'vuex';
import { BASE_URL } from '../../api/request.js';
export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations(['SET_MEMBER']),
		getOpenId(){
				var _this = this;
			uni.getProvider({
				service: 'oauth',
				success(res) {
					if (res.provider.indexOf('weixin') >= 0) {
						uni.login({
							provider: 'weixin',
							success(result) {
								const code = result.code;
								_this.$req({ url: `/weChat/getOpenId`, method: 'get', data: { openId: code } }).then(res => {
									getApp().globalData.sessionKey = res.data.session_key;
									getApp().globalData.openId = res.data.openid;
									const data = { username: res.data.openid, password: _this.userInfo.nickName, sex: _this.userInfo.gender };
									_this.$req({ url: '/sys/user/save', data: data }).then(res => {
										getApp().globalData.token = res.data.token;
										getApp().globalData.id = res.data.id;
										uni.navigateBack();
									});
								});
							}
						});
					}
				}
			})
		},
		getUserInfo(e) {
			var _this = this;
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					_this.getOpenId()
					_this.userInfo=JSON.parse(res.rawData);
					const { avatarUrl, city, country, gender,nickName, province } =_this.userInfo;
					console.log(_this.userInfo['avatarUrl']);
					const member = Object.assign(Member, { avatarUrl, city, country, gender, nickName, province });
					console.log(member);
					_this.SET_MEMBER(member);
					getApp().globalData.url=avatarUrl;
					getApp().globalData.nickname = _this.userInfo.nickName;
					
				}
			});
		},
		
		login() {
			this.SET_MEMBER(Member);
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.intro {
	width: 100%;
	height: 60vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	font-size: $font-size-base;
	color: $text-color-assist;

	image {
		width: 165rpx;
		height: 165rpx;
	}

	.tips {
		line-height: 72rpx;
		text-align: center;
	}
}

.bottom {
	height: 40vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 40rpx;

	.login-btn {
		width: 100%;
		border-radius: 50rem !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0;

		image {
			width: 36rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.row {
		.grid {
			width: 20%;
			image {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 10rpx;
			}
		}
	}
}
</style>
