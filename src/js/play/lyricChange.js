let lyrics ="[00:01.42]作词：TEDDY/KUSH/G-DRAGON/T.O.P [00:01.53]作曲：TEDDY/KUSH/서원진/G-DRAGON [00:01.87]编曲：TEDDY/KUSH [00:16.53]오늘도 친구들이 왔어 [00:19.06]Man how you been what's up [00:21.76]Aye 여기 한 잔만 줄래 [00:23.53]제일 늦게 마시는 사람 술래 [00:27.20]그냥 섞어 마셔 champagne [00:29.96]And if u know what I'm saying [00:31.95]내 손목을 보니 시간은 금이야 [00:34.52]불금이야 you dig [00:37.49]우린 젊기에 후회 따윈 내일 해 [00:42.75]조금 위험해 [00:45.88]Aye man you better [00:46.66]Slow it down [00:48.00]다시 돌아오지 않을 오늘을 위해 [00:54.05]저 하늘을 향해 건배해 [00:57.86]We like 2 party [01:00.55]Yeah yeah yeah yeah [01:03.73]We like 2 party [01:06.19]머리 위에 해 뜰 때까지 [01:08.60]We like 2 party [01:11.47]Yeah yeah yeah yeah [01:14.16]We like 2 party [01:16.79]서쪽에서 해 뜰 때까지 [01:19.38]오래간만에 불장난해 [01:22.09]지금 이 순간 나랑 [01:23.51]같이 밖에 나갈래 [01:25.46]시끌 시끌 분위기는 환상 [01:28.17]겁이 없는 멋쟁이들 꽐라 [01:30.89]여기저기 널부러진 opus one에 [01:33.82]마무리는 달콤하게 D'yquem [01:36.29]너는 빼지 않지 가지 함께 천국까지 [01:39.23]맨 정신은 반칙 [01:41.52]우린 젊기에 후회 따윈 내일 해 [01:46.69]조금 위험해 [01:49.85]Aye man you better [01:50.71]Slow it down [01:52.11]다시 돌아오지 않을 오늘을 위해 [01:57.93]저 하늘을 향해 건배해 [02:02.24]We like 2 party [02:04.84]Yeah yeah yeah yeah [02:07.80]We like 2 party [02:09.97]머리 위에 해 뜰 때까지 [02:12.70]We like 2 party [02:15.32]Yeah yeah yeah yeah [02:18.17]We like 2 party [02:20.83]서쪽에서 해 뜰 때까지 [02:23.25]너 없인 미쳐버리겠어 [02:28.21]DJ play a love song [02:33.86]나 취한 게 아냐 [02:36.27]네가 보고 싶어 죽겠어 [02:41.10]So DJ play a love song [02:44.82]We like 2 party [02:47.41]Yeah yeah yeah yeah [02:50.77]We like 2 party [02:52.84]머리 위에 해 뜰 때까지 [02:55.50]We like 2 party [02:58.11]Yeah yeah yeah yeah [03:00.67]We like 2 party [03:03.84]서쪽에서 해 뜰 때까지 "

lyrics = lyrics.replace(/\[/g,'\n[')
console.log(lyrics);


let aaa = lyrics.split('\n')
let finallyArr =''

//删除特定位置的元素
for(let i=1;i<aaa.length;i++){
  aaa[i] = aaa[i].substring(0,9) + aaa[i].substring(10,aaa[i].length)
}
for(i=1;i<aaa.length;i++){
  finallyArr += aaa[i] + '\n'
}
console.log(finallyArr);

