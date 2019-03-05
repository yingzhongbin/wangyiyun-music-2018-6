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
            songs:[],
            inquiry:""
        },
        searchContent(inquiry){
            console.log(inquiry);
            var queryName = new AV.Query('Song');
            queryName.contains('name', inquiry);
            var querySinger = new AV.Query('Song');
            querySinger.contains('singer', inquiry);
            var queryAlbum = new AV.Query('Song');
            queryAlbum.contains('album', inquiry);
            var query = AV.Query.or(queryName, querySinger,queryAlbum);
            query.select(['name', 'singer','album']);
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    // console.log(song);
                    return {
                        id: song.id,
                        album:song.attributes.album,
                        cover:song.attributes.cover,
                        link:song.attributes.link,
                        lyric:song.attributes.lyric,
                        name:song.attributes.name,
                        singer:song.attributes.singer
                    }
                });
                console.log(this.data.songs);
            });
        },
        searchSongs(inquiry) {
            console.log(inquiry);
            var queryName = new AV.Query('Song');
            queryName.contains('name', inquiry);
            var querySinger = new AV.Query('Song');
            querySinger.contains('singer', inquiry);
            var queryAlbum = new AV.Query('Song');
            queryAlbum.contains('album', inquiry);
            var query = AV.Query.or(queryName, querySinger,queryAlbum);
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    // console.log(song);
                    return {
                        id: song.id,
                        album:song.attributes.album,
                        cover:song.attributes.cover,
                        link:song.attributes.link,
                        lyric:song.attributes.lyric,
                        name:song.attributes.name,
                        singer:song.attributes.singer
                    }
                });
                console.log(this.data.songs);
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEventHub()
            this.bindEvents()
            this.view.render()
        },
        bindEvents(){
            this.view.$el.on("propertychange input","input",(e)=>{
                let inquiry = e.currentTarget.value
                this.model.data.inquiry = inquiry
                console.log(inquiry);
                this.model.searchSongs(inquiry).then(()=>{
                    window.eventHub.emit("showSearch",JSON.parse(JSON.stringify(this.model.data)))
                },()=>{});
            })

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