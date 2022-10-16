import { ECharts } from '@/components';

//通用方法集合
const utils = {
    //时间戳转换成自定义字符串
    dateFormat: (date: any, fmt: string) => {
        if(!date) {
            return '';
        }
        if(!(date instanceof Date)) {
            date = new Date(date);
        }
        let dateList: any = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateList) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
            }
        }
        return fmt;
    },
    deepCopy: (obj: any) => {
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key]) {
                    if (typeof obj[key] === 'object') {
                        // @ts-ignore
                        result[key] = utils.deepCopy(obj[key]); //递归复制
                    } else {
                        // @ts-ignore
                        result[key] = obj[key];
                    }
                }else{
                    // @ts-ignore
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
}

export default {
    install: (Vue: any, options: any) => {
        //时间转换过滤器
        Vue.filter('dateFormat', utils.dateFormat);

        //echarts的vue组件
        Vue.component('v-chart', ECharts);

        //将方法集添加到Vue实例上面去
        Vue.prototype.$utils = utils;
    }
}
