// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemDetails: {},
    },
    handleDelete() {
        wx.showModal({
            title: '确认删除',
            content: '是否删除此条记录？',
            complete: (res) => {
                if (res.cancel) {
                    wx.showToast({
                        title: '取消操作',
                        icon: 'error'
                    })
                }
                if (res.confirm) {
                    const arr = wx.getStorageSync('QrcodeList');
                    arr.splice(+this.data.itemDetails.index,1)
                    wx.setStorage({
                        key:"QrcodeList",
                        data:arr,
                        success(){
                            wx.showToast({
                                title: '取消操作',
                                icon: 'success'
                            })
                            wx.navigateBack()
                        }
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            itemDetails: options,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})