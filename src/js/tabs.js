{
    let view = {
        el:"#tabs",
        init(){
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init()
            this.bindEvent()
        },
        bindEvent(){
            this.view.$el.on("click","li",(e)=>{
                let $target = $(e.currentTarget)
                $target.find("span").addClass("active")
                $target.siblings().find("span").removeClass('active')
                window.eventHub.emit("clickTab",e.currentTarget)
            });
        }
    }
    controller.init(view,model)
}