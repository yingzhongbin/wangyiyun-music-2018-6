window.eventHub = {
    events:{
        // "xxx":[fn,],
        // "yyy":[]
    },
    //初始化
    init(){
        
    },
    //发布 
    emit(eventName,data){
        for(let key in this.events){
            if(eventName === key){
                let fnList = this.events[key];
                fnList.map((fn) => {
                    fn.call(undefined,data);
                });
            }
        }
    },
    //订阅 (设定一个事件名和响应函数，如果其他地方发布了这个事件，就触发函数)
    on(eventName,fn){
        if(this.events[eventName] === undefined){
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    },
    off(){}
}