{
    let view = {
        el:"#search-box",
        template:`
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo-copy"></use>
            </svg>
            <input type="text" placeholder="搜索歌曲、歌手、专辑" value="">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quchu"></use>
            </svg>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(){
            $(this.el).html(this.template)
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
            this.view.render()
            this.model = model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on("search",(content)=>{
                console.log("on");
                this.view.$el.find("input").val(content)
            })
        }
    }
    controller.init(view,model)
}