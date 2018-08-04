let data = `
[00:03.40]歌曲名称：龙拳
[00:07.20]专辑名称：八度空间
[00:13.33]出版年代：2002年
[00:19.12]语言类别：国语
[00:24.85]歌手名称：周杰伦
[00:30.76]歌手类别：香港男歌手
[00:36.61]词：方文山 　曲：周杰伦　 编曲：洪敬尧
[00:42.43]LRC编辑 acftf QQ 422426772
[00:48.50]
[00:49.34]
[00:49.99]以敦煌为圆心的东北东
[00:52.02]这民族的海岸线像一支弓
[00:54.73]那长城像五千年来待射的梦
[00:57.36]我用手臂拉开这整个土地的重
[01:00.03]
[01:00.25]蒙古高原南下的风写些什么内容
[01:02.67]汉字到底懂不懂
[01:04.23]一样肤色和面孔
[01:05.50]跨越黄河东
[01:06.74]登上泰山顶峰
[01:08.04]我向西引北风
[01:09.41]晒成一身古铜
[01:10.47]
[02:47.83][01:20.86]渴望着血脉相通
[02:50.19][01:23.07]无限个千万弟兄
[02:52.45][01:25.54]
[02:52.75][01:25.94]我把天地拆封将长江水掏空
[02:55.48][01:28.63]人在古老河床蜕变中
[02:57.10][01:51.77][01:31.14]
[03:39.75][02:58.40][01:52.14][01:31.46]我右拳打开了天
[04:01.58][03:40.79][02:59.47][01:53.23][01:32.60]化身为龙
[03:41.98][03:00.64][01:54.45][01:33.76]把山河重新移动
[04:04.15][03:43.36][03:02.05][01:55.79][01:35.34]填平裂缝
[03:44.51][03:03.11][01:56.94][01:36.61]将东方
[03:45.32][03:03.93][01:57.69][01:37.27]的日出调整了时空
[04:06.43]调整了时空
[03:47.01][03:05.81][01:59.43][01:38.86]回到洪荒 去支配去操纵
[04:10.64]去支配去操纵
[03:49.80][03:08.38][02:02.17][01:41.58]
[03:49.99][03:08.60][02:02.49][01:41.84]我右拳打开了天
[04:11.83][03:51.12][03:09.72][02:03.54][01:42.90]化身为龙
[03:52.25][03:10.90][02:04.80][01:44.15]那大地心脏汹涌
[04:14.30][03:53.65][03:12.29][02:06.13][01:45.44]不安跳动
[03:54.78][03:13.42][02:07.53][01:46.57]全世界
[03:55.71][03:14.17][02:08.13][01:47.37]的表情只剩下一种
[04:16.82]只剩下一种
[04:19.31][03:57.41][03:16.03][02:09.96][01:49.21]等待英雄
[04:20.98][03:58.88][03:17.46][02:11.12][01:50.62]我就是那条龙
`
let lyricAndTime = data.split("\n")
lyricAndTime = lyricAndTime.filter(line=>line)

let timeBreak = []
let lyricLines = []
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
    newLyrics.sort(compare("seconds"))
    console.log(newLyrics);


}
for(let j=0;j<newLyrics.length;j++){
    $p = $("<p></p>")
    $p.text(newLyrics[j].lyric)
    $p.attr("data-time",newLyrics[j].seconds)
    ps.push($p)
}
$(this.el).find(".lines").append(ps)



function compare(prop) {
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
}