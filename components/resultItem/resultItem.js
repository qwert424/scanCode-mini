// components/resultItem/resultItem.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        scanResult: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCopy() {
            wx.setClipboardData({
                data:this.properties.scanResult.result,
            })
        }
    }
})