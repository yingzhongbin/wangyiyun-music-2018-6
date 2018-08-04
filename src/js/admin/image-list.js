{
    let view = {
        el:'.cover-list',
        template:`
        <ol>
        </ol>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
            let {images} = data
            let liList = images.map((image)=>{
                console.log(image);
                let $li = $("<li></li>")
                let $img = $("<img>")
                $img.attr("src",image.cover)
                $li.append($img)
                return $li
            })
            console.log(liList);
            $(this.el).find("ol").empty().append(liList)
            console.log(666);
            // $(this.el).find("ol").append(liList)

        },
        clearActive(){
            $(this.el).find(".active").removeClass("active");
        }
    }
    let model = {
        data:{
            images:[
                // {cover:"image1"},{cover:"image2"}
            ]
        },
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvent()
            this.bindEventHub()
            this.view.render(this.model.data)

        },
        bindEvent(){
            this.view.$el.on("click","li",(e)=>{
                let src = $(e.currentTarget).find("img").attr("src")
                window.eventHub.emit("clickImg",src)

            })
        },
        bindEventHub(){
            // 上传了 封面
            window.eventHub.on("upload",(songData)=>{
                if(songData.cover !== undefined){
                    this.model.data.images.push(songData);
                    console.log(this.model.data.images);
                    this.view.render(this.model.data)
                }
            })
        }
    }
    controller.init(view,model)
}