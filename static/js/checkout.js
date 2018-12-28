export default {
  install(Vue) {
    Vue.prototype.Checkout = {
      // 手机号验证
      phone: (rule, value, callback) => {
        let regFormat = /^[1][3456789][0-9]{9}$/; //正确手机号
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (!regFormat.test(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          if (value < 18) {
            callback(new Error("必须大于18岁"));
          } else {
            callback();
          }
        }
      },
      //数字验证
      number: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须大于18岁"));
          } else if (value > 55) {
            callback(new Error("必须小于55岁"));
          } else {
            callback();
          }
        }
      },
      //0-200验证
      mark: (rule, value, callback) => {
        if (!value && value != 0) {
          return callback(new Error("不能为空"));
        }
        if (!/\d+/.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("必须大于0"));
          } else if (value > 200) {
            callback(new Error("必须小于200"));
          } else {
            callback();
          }
        }
      },
      //大于0的数
      number2: (rule, value, callback) => {
        if (!value && value != 0) {
          return callback(new Error("不能为空"));
        }
        if (!/\d+/.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      },
      //text不能为空
      text: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("不能为空"));
        } else {
          callback();
        }
      },
      //desc不能为空
      desc: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("不能为空"));
        } else {
          callback();
        }
      },
      //邮箱
      email: (rule, value, callback) => {
        let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!value) {
          callback();
        }
        if (!mal.test(value)) {
          callback(new Error("请输入正确邮箱"));
        } else {
          callback();
        }
      },
      //开始时间
      startTime: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择开始日期"));
        } else {
          callback();
        }
      },
      idCard: (rule, value, callback) => {
        let mal = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
        if (!value) {
          callback();
        }
        if (!mal.test(value)) {
          callback(new Error("请输入正确身份证号码"));
        } else {
          callback();
        }
      },
      //结束时间
      endTime: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择结束日期"));
        } else {
          callback();
        }
      },
      //时间
      time: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择日期"));
        } else {
          callback();
        }
      },
      //多选框
      checkbox: (rule, value, callback) => {
        if (value.length < 1) {
          return callback(new Error("请选择一个"));
        } else {
          callback();
        }
      },
      //单选框
      radio: (rule, value, callback) => {
        if (value.length < 1) {
          return callback(new Error("请选择一个"));
        } else {
          callback();
        }
      },
      //下拉框
      select: (rule, value, callback) => {
        console.log(value);
        if (value.length < 1) {
          return callback(new Error("请选择一个"));
        } else {
          callback();
        }
      },
      //数字
      money: (rule, value, callback) => {
        let mon = /^\d+/;
        if (!value) {
          callback();
        }
        if (!mon.test(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }
    };
  }
};
