{
    let view = {
        el:"#search-result ul",
        template:`
            <li>
                <a href="./play.html?id=__id__">
                    <div class="song-main">
                        <div class="song-main-top">__name__</div>
                        <div class="song-main-bottom">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-ttpodicon"></use>
                            </svg>
                            __singer__
                        </div>
                    </div>
                    <div class="song-play">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
                </a>
            </li>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
            let {songs} = data
            songs.map((song) => {
                let $li = this.template.replace(`__name__`,song.name)
                    .replace("__singer__",song.singer)
                    .replace("__id__",song.id)
                $(this.el).append($li)
            })
        }


    }
    let model = {
        data:{
            songs:[]
        },
        find(inquiry) {
            var queryName = new AV.Query('Song');
            queryName.contains('name', inquiry);
            var querySinger = new AV.Query('Song');
            querySinger.contains('singer', inquiry);
            var queryAlbum = new AV.Query('Song');
            queryAlbum.contains('album', inquiry);
            var query = AV.Query.or(queryName, querySinger,queryAlbum);
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
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
                // console.log(this.data.songs);

            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on("search",(content)=>{
                // console.log(content);
                this.model.find(content).then(()=>{
                    this.view.render(this.model.data)
                    $("#search-result").removeClass("hide").addClass("show")
                },()=>{})
            })
        }
    }
    controller.init(view,model)
}