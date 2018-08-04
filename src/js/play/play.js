{
    let view = {
        el:"#app",
        template:`
            <audio autoplay controls src="__link__"></audio>
        `,
        render(data){
            $(this.el).append(this.template.replace("__link__",data.link || " "))
            $(this.el).find(".lyric-container h1 span").text(data.name+" -")
            $(this.el).find(".lyric-container h1 b").text(data.singer)
            $(this.el).find("#app-background").css("background-image",`url(${data.cover})`)
            $(this.el).find("header .inner .cover").css("background-image",`url(${data.cover})`)
            $(this.el).find("header .inner .cover").css("background-size",`cover`)
            let lyricAndTime = data.lyric.split("\n")
            // let lyricAndTime = data.split("\n")
            lyricAndTime = lyricAndTime.filter(line=>line)
            let timeBreakTemp
            let ps = []
            let $p
            let reg = /(\d\d:\d\d.\d\d)/g
            let res
            let newLyrics = []
            let lastIndex
            for(let i = 0;i<lyricAndTime.length;i++) {
                let lyricString = lyricAndTime[i]
                console.log("lyricAndTime[i]");
                console.log(lyricAndTime[i]);
                timeBreakTemp =[]
                while(res = reg.exec(lyricString)){
                    timeBreakTemp.push(res[0])
                    lastIndex = reg.lastIndex;
                }
                console.log("timeBreakTemp");
                console.log(timeBreakTemp);
                if(lyricString.slice(lastIndex + 1)) {
                    for (let j= 0;j<timeBreakTemp.length;j++){
                        let minute = timeBreakTemp[j].substr(1,2)
                        let second = parseFloat(timeBreakTemp[j].substr(3,5),10) + parseInt(minute,10)*60
                        // timeBreak.push(second)
                        // lyricLines.push(lyricString.slice(lastIndex+1));
                        newLyrics.push({seconds:second,lyric:lyricString.slice(lastIndex+1)})
                    }
                }
                newLyrics.sort(this.compare("seconds"))
                console.log(newLyrics);


            }
            for(let j=0;j<newLyrics.length;j++){
                $p = $("<p></p>")
                $p.text(newLyrics[j].lyric)
                $p.attr("data-time",newLyrics[j].seconds)
                ps.push($p)
            }
            $(this.el).find(".lines").append(ps)
        },
        compare(prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },
        playToggle(data){
            let audio = $(this.el).find("audio")[0]
            // console.log(audio)
            if(data){
                audio.play();
                $(this.el).find("header > .svg-container").removeClass("hidden")
                $(this.el).find("header .out").removeClass("paused")
                $(this.el).find("header .inner").removeClass("paused")
            }else{
                audio.pause();
                $(this.el).find("header > .svg-container").addClass("hidden")
                $(this.el).find("header .out").addClass("paused")
                $(this.el).find("header .inner").addClass("paused")
            }

        },
    }
    let model = {
        data:{
            song: {
                name: "",
                singer: "",
                id: "",
                link: ""
            },
            play:false,
        },
        setId(id){
            this.data.song.id = id
        },
        getSong(){
            var query = new AV.Query('Song');
            return query.get(this.data.song.id).then( (song) => {
                Object.assign(this.data.song,song.attributes)
                // console.log(this.data)
                return this.data.song
            },  (error) => {
                // 异常处理
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.setId(id)
            this.model.getSong().then((data) => {
                this.view.render(this.model.data.song)
                this.bindEvents()
            })
        },
        bindEvents(){

            $(this.view.el).on("click",()=>{
                this.view.playToggle(this.model.data.play)
                this.model.data.play = !this.model.data.play
            })
            let audio = $(this.view.el).find("audio")
            audio.on("timeupdate",()=>{
                let currentTime = audio[0].currentTime + 0.5
                // console.log(audio[0].currentTime)
                let ps = $(this.view.el).find(".lines p")
                let lines = $(this.view.el).find(".lines")
                // console.log(lines);
                for(let i = 0;i<ps.length;i++){
                    let previousTime = ps.eq(i).attr("data-time")
                    let nextTime = ps.eq(i+1).attr("data-time")
                    if(currentTime > previousTime && currentTime < nextTime){
                        // console.log(ps.eq(i).text())
                        let distance = -27*(i+1)+54
                        // console.log(distance);
                        lines.css("transform",`translateY(${distance}px)`)
                        ps.eq(i).addClass("active").siblings(".active").removeClass("active")
                        break
                    }
                }
            })
            // console.log(audio);
            //     .on("ended",()=>{
            //     console.log("end")
            // })
        },
        getSongId(){
            // id=5b20e7aa9f5454003b83736b&&a=1
            let search = window.location.search
            if(search.indexOf("?") === 0){
                search = search.substring(1)
            }
            let id = ""
            // .filter(v=>v); 用来过滤空字符串
            let newSearch = search.split("&").filter(v=>v);
            for(let i=0;i<newSearch.length;i++){
                let kv = newSearch[i].split("=")
                let k = kv[0]
                let v = kv[1]
                if(k === "id"){
                    id = v
                }
            }
            return id
        }
    }
    controller.init(view,model)
}



