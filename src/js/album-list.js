{
    // 添加歌曲page-1页的 点播的li
    let view = {
        el: ".recommend-songs",
        template: `
        <li>
            <a href="./album.html?album=__data-album__">
                <div></div>
                <img src="./img/__imgLink__" alt="">
                <div>
                    __div__
                </div>    
            </a>
        </li>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            console.log(data);
            let $ul = $("<ul></ul>")
            for(let i=0;i<data.imgLink.length;i++){
                let $li = this.template
                let strings = "imgLink div".split(" ")
                strings.map((string)=>{
                    $li = $li.replace(`__${string}__`,data[string][i])
                    console.log($li);
                })
                $li = $li.replace(`__data-album__`,encodeURIComponent(data["data-album"][i]))
                $ul.append($li)
            }
            this.$el.append($ul)
        }
    }
    let model = {
        data: {
            imgLink:[
                "aiyou.jpg","yehuimei.jpg","jtanhao.jpg",
                "dengnixiake.jpg","fantexi.jpg","jay.jpg",
                "kuashidai.jpg","mojiezuo.png","qilixiang.jpg",
                "shier.jpg","shiyi.jpg","wohenmang.png",
                "badu.jpg","chuangbian.jpg","jtanhao.jpg"
            ],
            "data-album":[
                "哎呦，不错哦","叶惠美","惊叹号",
                "等你下课","范特西","Jay",
                "跨时代","魔杰座","七里香",
                "十二新作","十一月的萧邦","我很忙",
                "八度空间","周杰伦的床边故事","惊叹号"
            ],
            div:[
                "JAY语录里最被流传模仿的一句","『叶惠美』一个女性的名字？让人匪夷所思、充满问号？？？","炫技玩乐出神入化 满载欢乐.疗伤",
                "不让歌迷等太久 周董新歌「等你下课」1/18日凌晨0:00热腾腾出炉","欢迎光临-周杰伦的音乐幻想世界！","“杰伦”同名专辑，整张曲风充斥着杰伦对音乐的超高技术创作",
                "音乐，像吸血鬼永远不老，跨时代也跨越世代，超屌！","眼睛看到的不一定是真的 让音乐变幻无穷 让梦想一一成真","2004年夏天周杰伦带来浓郁《七里香》！",
                "当时光敲第12响时，是该听周杰伦的时候了…","§浪漫古典因子谱出音乐新诗篇§","再忙 … 也要陪你听一首歌！",
                "无限延展 创意尽现『八度空间』","开始听 周杰伦 的床边故事","靠自己创作跑道才是王道！"
            ]
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)
}