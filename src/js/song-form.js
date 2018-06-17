{
    let view = {
        el:".page main",
        template:`
        <h1>新建歌曲</h1>  
        <form action="" class="form">
            <div class="row">
                <label for="">
                    
                </label>歌名：<input type="text" name="name" value = "__name__">
            </div>
            <div class="row">
                <label for="">
                    
                </label>歌手：<input type="text" name="singer" value = "__singer__">
            </div>
            <div class="row">
                <label for="">
                    
                </label>外链：<input type="text" name="link" value="__link__">
            </div>
            <div class="row">
                <label for="">
                    
                </label><button type="submit">提交</button>
            </div>
        </form>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data = {}){
            let placeholder = ["name","singer","link"];
            let html = this.template;
            placeholder.map((string)=>{
                html = html.replace(`__${string}__`,data[string]||"")
            })
            $(this.el).html(html)
        },
        reset(data){
            // data.name =
            this.render(data)
        }
    }
    let model = {
        data:{
            name:"",
            singer:"",
            link:"",
            id:""
        },
        // 发送数据到 leanCLoud
        create(data){
            
            //创建数据库
            let Song = AV.Object.extend('Song');
            //创建一条记录
            let song = new Song();
            //保存一条记录
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('link',data.link);
            // 设置优先级
            return song.save().then( (newSong) => {
                // alert('LeanCloud Rocks!');
                // console.log(newSong)
                let {id,attributes} = newSong;
                // Object.assign(this.data,{
                //     id:id,
                //     name:attributes.name,
                //     singer:attributes.singer,
                //     link:attributes.link
                // });
                //  ES6
                Object.assign(this.data,{
                    id,
                    ...attributes
                });
            }, () => { alert("fuck"); })
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.init();
            this.bindEvents()
            this.view.render(this.model.data);
            window.eventHub.on("upload",(data) => {
                this.model.data = data
                this.view.render(this.model.data)
            });
        },
        // 重设 song-form 的 input 的 value 内容
        reset(data){
            this.view.render(data)
        },
        bindEvents(){
            this.view.$el.on("submit","form",(e)=>{
                e.preventDefault();
                let data = {};
                let needs = "name singer link".split(" ")
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val();
                });
                this.model.create(data).then(()=>{
                    this.view.reset({})
                    // 深拷贝
                    window.eventHub.emit("create",JSON.parse(JSON.stringify(this.model.data)))
                });
            })
        }
    }
    controller.init(view,model)
}