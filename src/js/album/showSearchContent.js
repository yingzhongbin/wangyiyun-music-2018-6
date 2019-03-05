{
    let view = {
        el:"#showSearchContent",
        template:`
           <li>
                <div class="icon-sousuo-copy">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo-copy"></use>
                    </svg>
                </div>
                <div class="SearchListContent"></div>
            </li>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
            this.$el.find("#showSearchContent-title").html("搜索"+`\"${data.inquiry}\"`)
            console.log(data);
            $ul = $("<ul class='showSearchContent-container'></ul>")
            for(let i=0;i<data.songs.length;i++){

            }
        }


    }
    let model = {
        data:{
            album:[],
            singer:[],
            name:[],
            inquiry:''
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
        groupUp(data){
            console.log(data);
            if(data.songs.length>0){
                let singer = data.songs[0].singer
                let album  = data.songs[0].album
                let name = data.songs[0].name
            }

            for(let i = 0;i<data.songs.length;i++){

            }
        },
        bindEventHub(){
            window.eventHub.on("showSearch",(data)=>{
                this.model.data.inquiry = data.inquiry
                this.view.render(data)
                console.log(4);
                this.groupUp(data)
                console.log(5);
                // this.view.render(data);
            })
        }
    }
    controller.init(view,model)
}