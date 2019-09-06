var app = new Vue({
  el: "#app",
  data: {
    list: [
      {
        id: 1,
        name: "iPhone 7",
        price: 6188,
        count: 1,
        isBuy: false
      },
      {
        id: 2,
        name: "iPad Pro",
        price: 5888,
        count: 1,
        isBuy: false
      },
      {
        id: 3,
        name: "MacBook Pro",
        price: 21488,
        count: 1,
        isBuy: false
      }
    ],
    checkBoxModel: [],
    allp: false
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].isBuy) {
          var item = this.list[i];
          total += item.price * item.count;
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, "", "");
    }
  },
  methods: {
    handleReduce: function(index) {
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    handleAdd: function(index) {
      this.list[index].count++;
    },
    handleRemove: function(index) {
      this.list.splice(index, 1);
    },
    allPick: function() {
      var _this = this;
      if (_this.allp) {
        _this.checkBoxModel = [];
        _this.allp = false;
      } else {
        _this.checkBoxModel = [];
        _this.list.forEach(function(item) {
          _this.checkBoxModel.push(item.id);
        });
        console.log("_this.checkBoxModel", _this.checkBoxModel);
        _this.allp = true;
      }
      // 默认是false
      // 全选的实现通过checkBoxModel的状态
    },
    pickOne: function(index) {
      if (this.list[index].isBuy) {
        this.list[index].isBuy = false;
      } else {
        this.list[index].isBuy = true;
      }
      //单选的实现依靠的是isBuy通过click的切换实现,列表里的isBuy默认为false,如果是false,则让它变为true
    },
    checkPick: function() {
      _this = this;
      var sumPic = 0;
      for (var i = 0; i < _this.list.length; i++) {
        if (_this.list[i].isBuy) {
          sumPic++;
        }
      }
      // 看单项的勾选了几个
      if (sumPic == _this.list.length) {
        _this.allp = true;
      } else {
        _this.allp = false;
      }
      // 如果都勾选了，则把allp设置为true,否则设置为false
    },
    checkModel: function() {
      _this = this;
      if (_this.checkBoxModel.length) {
        newArr = _this.checkBoxModel.concat();
        console.log("newArr1", newArr);
        for (var i = 0; i < _this.checkBoxModel.length; i++) {
          newone = newArr.shift().toString();
          // console.log(newone);
          _this.list[newone - 1].isBuy = true;
          // console.log(newone);
          // console.log(_this.list[newone - 1]);
        }
      } else {
        newArr = _this.checkBoxModel.concat();
        console.log("newArr2", newArr);
        for (var i = 0; i < _this.list.length; i++) {
          _this.list[i].isBuy = false;
        }
      }
      // 利用checkBoxModel的绑定的状态来分别给每个物品确认isBuy的状态，避免与pickOne的冲突
    }
  }
});
