{
    let view = {
        el:'.songList-main',
        template:`
        <ol>
        </ol>
        `,
        render(data){
            let {songs} = data
            let liList = songs.map((song)=>{
                let $li = $("<li></li>").text(song.name);
                $li.attr("data-id",song.id)
                return $li
            })
            $(this.el).find("ol").empty()
            $(this.el).html(this.template)
            liList.map((domLi)=>{
                $(this.el).find("ol").append(domLi);
            });
        },
        clearActive(){
            $(this.el).find(".active").removeClass("active");
        }
    }
    let model = {
        data:{
            songs:[
                // {id:"5b4f35749f5454003db3b6aa",name:"歌名1"},
            ]
        },
        getSong(id){
            var query = new AV.Query('Song');
            return query.get(id).then( (song) => {
                // 成功获得实例
                // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
                return song;
            },  (error) => {
                // 异常处理
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)

            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){
            $(this.view.el).on("click","li",(e)=>{
                let id = $(e.currentTarget).attr("data-id")
                this.model.getSong(id).then((song)=>{
                    let data = {...song.attributes,id}
                    //song-list 点击 li
                    window.eventHub.emit("updateSong",JSON.parse(JSON.stringify(data)))
                }, ()=>{
                    console.log("获取歌曲失败");
                })
            })
        },
        bindEventHub(){
            // 提交歌曲信息
            window.eventHub.on("newSong",(songData)=>{
                console.log("song-list2");
                console.log(songData);
                let  flag = true
                for(let i = 0;i<this.model.data.songs.length;i++){
                    if(songData.id === this.model.data.songs[i].id || songData.id === ""){
                        flag = false
                    }
                }
                console.log("flag", flag);
                if(flag){
                    this.model.data.songs.push(songData);
                    this.view.render(this.model.data)
                }
            })
        }
    }
    controller.init(view,model)
}