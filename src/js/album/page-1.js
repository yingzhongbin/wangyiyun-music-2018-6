{
    // 切换tab 到 page-1
    let view = {
        el:"#page-1",
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
                if($attr === "page-1"){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            });
            this.loadModule1()
            this.loadModule2()
        },
        loadModule1(){
            let script1 = document.createElement("script")
            script1.src = "js/album/page-1-1.js"
            document.body.appendChild(script1)
        },
        loadModule2(){
            let script1 = document.createElement("script")
            script1.src = "js/album/page-1-2.js"
            document.body.appendChild(script1)
        }
    }
    controller.init(view,model)
}