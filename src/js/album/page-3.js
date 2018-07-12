{
    let view = {
        el:"#page-3",
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
                if($attr === "page-3"){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            });
        }
    }
    controller.init(view,model)
}