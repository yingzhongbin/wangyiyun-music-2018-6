{
    let view = {
        el:"#footer",
        show(){
            $(this.el).removeClass("hide").addClass("show")
        },
        hide(){
            $(this.el).removeClass("show").addClass("hide")
        },
        bindEventHub(){
            window.eventHub.on("clickTab",(data)=>{
                $attr = $(data).attr("tab-data")
                if($attr === "page-1"){
                    this.show()
                }else{
                    this.hide()
                }
            });
        }
    }
    let model = {}
    let controller = {
        init(){
            this.view = view
            this.view.bindEventHub()
            this.model = model
        }
    }
    controller.init()
}