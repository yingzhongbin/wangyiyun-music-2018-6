{
    let view = {
        el: "",
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
                $("ol.songs").append($li)
            })
        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    return {id: song.id, ...song.attributes}
                });
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.find().then(() => {
                console.log(this.model.data)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}