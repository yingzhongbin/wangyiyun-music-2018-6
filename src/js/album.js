{
    // 添加歌曲page-1页的 点播的li
    let view = {
        el: "#app",
        template: `
         <li>
            <a href="./play.html?id=__id__">
                <div class="li-left">__i__</div>
                <div class="li-right">
                    <div class="li-right-left">
                        <div class="li-right-left-top">__name__</div>
                        <div class="li-right-left-bottom">__singer__</div>
                    </div>
                    <div class="li-right-right">
                        <svg class="icon active" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
                </div>
            </a>
        </li>
        `,
        init() {
            this.$el = $(this.el)
        },
        render({songs}) {
            //render ol > li
            $ol = $("<ol></ol>")
            for(let i = 0;i<songs.length;i++){
                console.log(songs[i]);
                let strings = "id name singer".split(" ")
                console.log(strings);
                let li = this.template
                strings.map((string)=>{
                    console.log(string);
                    li = li.replace(`__${string}__`,songs[i][string])
                })
                li = li.replace(`__i__`,i+1)

                console.log(li);
                let $li = $(li)
                $ol.append(li)
            }
            this.$el.find(".song-list").append($ol)

            // render 封面
            if(songs[0]["cover"]!==""){
                appendStr = `<style>header::before{background-image: url(${songs[0]["cover"]})}</style>`;
                this.$el.find("header").append(appendStr);
                this.$el.find(".img-container img").attr("src",songs[0]["cover"])
            }


        }
    }
    let model = {
        data: {
            songs:[]
        },
        getAlbum(){
            // id=5b20e7aa9f5454003b83736b&&a=1
            let search = window.location.search
            if(search.indexOf("?") === 0){
                search = search.substring(1)
            }
            let album = ""
            // .filter(v=>v); 用来过滤空字符串
            let newSearch = search.split("&").filter(v=>v);
            for(let i=0;i<newSearch.length;i++){
                let kv = newSearch[i].split("=")
                let k = kv[0]
                let v = kv[1]
                if(k === "album"){
                    album = v
                }
            }
            return decodeURIComponent(album)
        },
        findAlbum(albumName) {
            var query = new AV.Query('Song');
            query.contains("album",albumName);
            // return query
            return query.find().then(function (songs) {
                return songs
            }, function (error) {
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            let albumName = this.model.getAlbum()
            this.model.findAlbum(albumName).then((songs)=>{
                songs.map((song)=>{
                    let {attributes,id} = song
                    this.model.data.songs.push({...attributes,id})
                })
                this.view.render(this.model.data)
                console.log(this.model.data);
            },()=>{})
        }
    }
    controller.init(view, model)
}