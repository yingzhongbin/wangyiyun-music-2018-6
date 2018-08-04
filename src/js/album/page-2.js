{
    // 切换tab 到 page-2
    let view = {
        el:"#page-2",
        show(){
            $(this.el).removeClass("hide").addClass("show")
        },
        hide(){
            $(this.el).removeClass("show").addClass("hide")
        },

    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            window.eventHub.on("clickTab",(data)=>{
                $attr = $(data).attr("tab-data")
                if($attr === "page-2"){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            });
        }
    }
    controller.init(view,model)
}