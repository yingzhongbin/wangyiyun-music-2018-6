{
    let view = {
        el:"#hot-list",
        template:`
        `,
        init(){
            this.$el = $(this.el)
        },
        render(lists){
            let $ul = $("<ul class='list'></ul>")
            for(let i=0;i<lists.length;i++){
                let $li = $("<li></li>")
                let $a = $("<a></a>")
                $a.text(lists[i])
                $li.append($a)
                $ul.append($li)
            }
            $(this.el).append($ul)
        }
    }
    let model = {
        data:{
            searchContent:[]
        },
        getSearchList(){
            var query = new AV.Query('searchList');
            return query.find().then( (contents) => {
                return contents
            }).then((contents) => {
                for(let i=0;i<contents.length;i++){
                    this.data.searchContent.push(contents[i].attributes.searchContent)
                }
                return this.data.searchContent
                // 更新成功
            },  (error) => {
                // 异常处理
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.model.getSearchList().then((lists)=>{
                this.view.render(this.model.data.searchContent)
            },()=>{})
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on("click","li",(e)=>{
                e.preventDefault();
                console.log("emit");
                window.eventHub.emit("search",JSON.parse(JSON.stringify(e.currentTarget.innerText)))
                this.view.$el.addClass("hide")
            })
        }

    }
    controller.init(view,model)
}