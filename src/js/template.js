{
    let view = {
        el:"",
        template:`
           
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
        }


    }
    let model = {
        data:{
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){

        },
        bindEventHub(){

        }
    }
    controller.init(view,model)
}