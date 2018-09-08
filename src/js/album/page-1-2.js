{
    // 添加歌曲page-1页的 点播的li
    let view = {
        el: "ol.songs",
        template: `
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
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let {songs} = data
            songs.map((song) => {
                let $li = this.template.replace(`__name__`,song.name)
                    .replace("__singer__",song.singer)
                    .replace("__id__",song.id)
                $(this.el).append($li)
            })
        },
        bindEventHub(){
            window.eventHub.on("clickTab",(data)=>{
                $attr = $(data).attr("tab-data")
                if($attr === "page-1"){
                    this.show()
                }else{
                    this.hide()
                }
            });
        },
        show(){
            this.$el.removeClass("hide").addClass("show")
        },
        hide(){
            this.$el.removeClass("show").addClass("hide")
        },
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song');
            query.matches('album', "love");
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

            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.view.bindEventHub()
            this.model = model
            this.model.find().then(() => {
                // console.log(this.model.data)
                this.view.render(this.model.data)
            })
        },

    }
    controller.init(view, model)
}