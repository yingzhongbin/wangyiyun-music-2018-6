{
    let view = {
        el: ".song-form",
        template: `
        <form action="" class="form">
                    <!--<span data-id="__id__"></span>-->
                    <div class="form-left">
                        <div class="row">
                            <label for="name">
                                歌名：<input type="text" name="name" value="__name__">
                            </label>
                        </div>
                        <div class="row">
                            <label for="">
                                歌手：<input type="text" name="singer" value="__singer__">
                            </label>
                        </div>
                        <div class="row">
                            <label for="">
                                外链：<input type="text" name="link" value="__link__">
                            </label>
                        </div>
                        <div class="row">
                            <label for="">
                                封面：<input type="text" name="cover" value="__cover__">
                            </label>
                        </div>
                        <div class="row">
                            <label for="">
                                专辑：<input type="text" name="album" value="__album__">
                            </label>
                        </div>
                        <div class="row">
                            <label for="">

                            </label>
                            <button type="submit">提 交</button>
                        </div>
                    </div>
                    <div class="form-right">
                        <div class="row">
                            <label for="">
                                <div>歌词：</div>
                                <textarea name="lyric" id="" cols="30" rows="10">__lyric__</textarea>
                            </label>
                        </div>
                    </div>
                </form>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(data = {}) {
            let needs = "name singer link cover album lyric".split(" ")
            let html = this.template
            needs.map((string)=>{
                // console.log(string);
                html = html.replace(`__${string}__`,data[string] || "")
            })

            this.$el.html(html)
        },
    }
    let model = {
        data: {
            song:{
                name: "",
                singer: "",
                link: "",
                id: "",
                cover: "",
                album:"",
                lyric: ""
            }
        },
        // 发送数据到 leanCLoud
        create(data){
            console.log("data---",data)
            //创建数据库
            let Song = AV.Object.extend('Song');
            //创建一条记录
            let song = new Song();
            //保存一条记录
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('link',data.link);
            song.set('cover',data.cover);
            song.set('album',data.album);
            song.set('lyric',data.lyric);
            // 设置优先级
            return song.save().then( (newSong) => {
                alert('LeanCloud Rocks!');
                console.log("newSong",newSong);
                let {id,attributes} = newSong;
                // console.log("newSong");
                // console.log(newSong);
                // this.model.setData({})

                // Object.assign(this.data,{
                //     id:id,
                //     name:attributes.name,
                //     singer:attributes.singer,
                //     link:attributes.link
                // });
                //  ES6

                //录入当地数据
                Object.assign(this.data.song,{
                    id,
                    ...attributes
                });
                console.log("录入了当地数据");
                console.log(this.data);
            }, (error) => { console.log("fuck"+error.message); })
        },
        update(data){
            var song = AV.Object.createWithoutData('Song', this.data.song.id);
            song.set('name', data['name']);
            song.set('singer', data['singer']);
            song.set('link', data['link']);
            song.set('cover',data['cover']);
            song.set('album',data['album']);
            song.set('lyric', data['lyric']);
            // 保存到云端
            return song.save().then( (newSong) => {
                alert('LeanCloud Update!');
                console.log("UpdateSong",newSong);
                let {id,attributes} = newSong;
                // console.log("newSong");
                // console.log(newSong);
                // this.model.setData({})

                // Object.assign(this.data,{
                //     id:id,
                //     name:attributes.name,
                //     singer:attributes.singer,
                //     link:attributes.link
                // });
                //  ES6

                //录入当地数据
                Object.assign(this.data.song,{
                    id,
                    ...attributes
                });
                console.log("更新了当地数据");
                console.log(this.data);
            }, (error) => { console.log("fuck"+error.message); })
        },
        //删除 .mp3后缀
        delete(){
            // 这是一个比较完整的例子，具体方法可以看下面的文档
            // 查询某个 AV.Object 实例，之后进行修改
            var query = new AV.Query('Song');
            var regExp = new RegExp('.mp3$', 'i');
            query.matches('name', regExp);
            // find 方法是一个异步方法，会返回一个 Promise，之后可以使用 then 方法
            query.find().then(function(results) {
                // 返回一个符合条件的 list
                console.log(results);
                let obj
                let name
                console.log(results.length);
                for(let i = 0;i<results.length;i++){
                    console.log(i);
                    obj = results[i];
                    console.log(results[i].attributes.name);
                    name = results[i].attributes.name.replace(/.mp3$/,"")
                    console.log(name);
                    obj.set('name', name);
                    // save 方法也是一个异步方法，会返回一个 Promise，所以在此处，你可以直接 return 出去，后续操作就可以支持链式 Promise 调用
                    // return obj.save();
                    obj.save();
                }
            }).then(function() {
                // 这里是 save 方法返回的 Promise
                console.log('删除.mp3成功');
            }).catch(function(error) {
                // catch 方法写在 Promise 链式的最后，可以捕捉到全部 error
                console.error(error);
            });

        }
    }
    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render({})
            this.bindEvents()
            this.bindEventHub()
            this.model.delete()
        },
        bindEvents(){
            this.view.$el.on("submit","form",(e)=>{
                e.preventDefault();
                let data = {};
                let needs = "name singer link cover album lyric".split(" ")
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val();
                });
                console.log("submit1",data)
                console.log(this.model.data)
                if(!this.model.data.song.id){
                    // 上传数据到 LeanCloud
                    this.model.create(data).then(()=>{
                        console.log("已录入云数据");
                        // 深拷贝
                        // 提交歌曲信息
                        window.eventHub.emit("newSong",JSON.parse(JSON.stringify(this.model.data.song)))
                        //清空数据
                        this.model.data.song = {
                            name: "",
                            singer: "",
                            link: "",
                            id: "",
                            cover: "",
                            album:"",
                            lyric: ""
                        }
                        this.view.render(this.model.data.song)
                        });
                }else{
                    // 更新数据到 LeanCloud
                    this.model.update(data).then(()=>{
                        console.log("已更新云数据");
                        // 深拷贝
                        // 提交歌曲信息
                        window.eventHub.emit("newSong",JSON.parse(JSON.stringify(this.model.data.song)))
                        //清空数据
                        this.model.data.song = {
                            name: "",
                            singer: "",
                            link: "",
                            id: "",
                            cover: "",
                            album:"",
                            lyric: ""
                        }
                        this.view.render(this.model.data.song)
                    });

                }

            })
        },
        bindEventHub(){
            //song-list 点击 li
            window.eventHub.on("updateSong",(data)=>{
                this.model.data.song = data
                console.log(this.model.data.song);
                this.view.render(this.model.data.song)

            })
            // 上传 歌曲 或 封面
            window.eventHub.on("upload",(data)=>{
                console.log("song-form2222222222222");
                console.log(data);
                Object.assign(this.model.data.song,data)
                this.view.$el.find("input[name='name']").val(this.model.data.song.name)
                this.view.$el.find("input[name='singer']").val(this.model.data.song.singer)
                this.view.$el.find("input[name='link']").val(this.model.data.song.link)

                // this.view.render(this.model.data.song)
            })
            window.eventHub.on("clickImg",(data)=>{
                this.view.$el.find("input[name='cover']").val(data)
            })
        }
    }
    controller.init(view, model)
}