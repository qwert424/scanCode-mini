// pages/ScanCode/ScanCode.js
const keyVal = {
    'WX_CODE': '微信小程序',
    'QR_CODE': '二维码',
    'EAN_8': '条形码（EAN_8）',
    'EAN_13': '条形码（EAN_13）',
    'UPC_A': '条形码（UPC_A）',
    'UPC_E': '条形码（UPC_E）',
    'CODE_25': '条形码（CODE_25）',
    'CODE_39': '条形码（CODE_39）',
    'CODE_128': '条形码（CODE_128）',
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        ifhidden: false,
        QrCode: {
            result: "",//内容
            scanCode: ""//类型
        },
    },
    handleTap() {
        wx.scanCode({
            success: ({ result, scanType }) => {
                this.setData({
                    "QrCode.result": result,
                    "QrCode.scanCode": keyVal[scanType],
                    "QrCode.date": new Date().getTime().toString(),
                    "ifhidden": true
                })
                try {
                    const logsList = wx.getStorageSync('QrcodeList') || []
                    logsList.unshift(this.data.QrCode)
                    wx.setStorage({
                        key: "QrcodeList",
                        data: logsList
                    })
                } catch (e) {
                    throw new Error(e)
                }
            },
            fail() {
                wx.showModal({
                    title: '识别 失败',
                    content: '检查上传图片格式',
                    confirmText: "我已知晓",
                    showCancel: false
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: "二维码 小工具",
            imageUrl:"/assets/790.jpg"
        }
    }
})