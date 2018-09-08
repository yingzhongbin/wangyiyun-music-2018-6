{
    let view = {
        el:"#history",
        template:`
        <li class="item">
            <svg class="icon historyrecord" aria-hidden="true">
                <use xlink:href="#icon-historyrecord"></use>
            </svg>
            <div class="historyItemContainer">
                <div class="historyItemContent">__content__</div>
                <div class="cha">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cha"></use>
                    </svg>
                </div>

            </div>
        </li>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(contents){
            let $ul = $("<ul id='historyList'></ul>")
            let lis = ""
            for(let i=0;i<contents.length;i++){
                lis+=this.template.replace("__content__",contents[i])
            }
            $ul.html(lis)
            this.$el.append($ul)
            // $(this.el).html(this.template)
        }


    }
    let model = {
        data:{
            history:[]
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            if(localStorage.getItem("searchHistory")){
                this.model.data.history = JSON.parse(localStorage.getItem("searchHistory"))
                this.view.render(this.model.data.history)
            }
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on("search",(content)=>{
                let item;
                for(item=0;item<this.model.data.history.length;item++){
                    if(this.model.data.history[item] === content){
                        this.model.data.history.splice(item,1)
                    }
                }
                this.model.data.history.unshift(content)

                localStorage.setItem("searchHistory",JSON.stringify(this.model.data.history))
                console.log(this.model.data.history);
                this.view.$el.addClass("hide")
            })
        }
    }
    controller.init(view,model)
}