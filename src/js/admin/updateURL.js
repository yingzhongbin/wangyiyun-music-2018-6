{
  function updateALLURL(Name) {
    var query = new AV.Query(Name);
    query.limit(1000)
    query.find().then(function (songs) {
      console.log(songs);
      songs.forEach(function(song) {
        let cover = song.attributes.cover.replace('http://www.yingzhongbin.xyz','http://yingzhongbin.xyz')
        let link = song.attributes.link.replace('http://www.yingzhongbin.xyz','http://yingzhongbin.xyz')
        song.set('cover', cover);
        song.set('link', link);
      });
      return AV.Object.saveAll(songs);
    }).then(function(songs) {
      // 更新成功
    }, function (error) {
      // 异常处理
    })
  }
  updateALLURL('Song')
}