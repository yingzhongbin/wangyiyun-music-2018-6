{
    let view = {
        el:".upload-area",
        find(selector){
            return $(this.el).find(selector)[0]
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.initQiniu();
        },
        initQiniu(){
            var uploader = Qiniu.uploader({
                disable_statistics_report: false,   // 禁止自动发送上传统计信息到七牛，默认允许发送
                runtimes: 'html5',      // 上传模式,依次退化
                browse_button: this.view.find('#uploadButton'),         // 上传选择的点选按钮，**必需**
                uptoken_url : 'http://localhost:8888/uptoken', 
                get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
                domain: 'p9u6wc9sm.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                container: this.view.find('#uploadContainer'),             // 上传区域 DOM ID，默认是 browser_button 的父元素，
                max_file_size: '20mb',             // 最大文件体积限制
                max_retries: 3,                     // 上传失败最大重试次数
                dragdrop: true,                     // 开启可拖曳上传
                drop_element: this.view.find('#uploadContainer'),          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb',                  // 分块上传时，每块的体积
                auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function(up, file) {
                        // 每个文件上传时,处理相关的事情
                        // uploadStatus.textContent = "正在上传中"
                        console.log("正在上传中");
                    },
                    'FileUploaded': function(up, file, info) {
                        // 每个文件上传成功后,处理相关的事情
                        // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                        // {
                        //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                        //    "key": "gogopher.jpg"
                        //  }
                        // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html


                        // uploadStatus.textContent = "上传完毕"
                        console.log("上传完毕");
                        var domain = up.getOption('domain');
                        // console.log(domain)
                        var res = info.response;
                        var res = JSON.parse(res);
                        var sourceLink = "http://" + domain + "/" + encodeURIComponent(res.key); //获取上传成功后的文件的Url
                        let arr = res.key.split("-");

                        // 上传 歌曲 或 封面
                        if(arr[1]){
                            window.eventHub.emit("upload",{
                                link:sourceLink,
                                singer:(arr[0]+"").trim(),
                                name:(arr[1]+"").trim(),
                            })
                        }else{
                            window.eventHub.emit("upload",{
                                cover:sourceLink,
                            })
                        }
                    },
                    'Error': function(up, err, errTip) {
                        //上传出错时,处理相关的事情
                    },
                    'UploadComplete': function() {
                        //队列文件处理完毕后,处理相关的事情
                    },
                }
            });
        }
    }
    controller.init(view,model)
}