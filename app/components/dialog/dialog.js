// @ts-nocheck
Component({
	// 组件的属性 
	methods: {
		click() {
              this.triggerEvent("close", false); //(eventName, detail)和组件的triggerEvent一致
            }
	}
});