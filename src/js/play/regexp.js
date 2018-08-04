// 正则测试 regexp

// \b 单词开始结束标志   word boundary
var reg = /\bis\b/
"he is a boy.This is a dog".replace(reg,"IS")
// OUTPUT
// "he IS a boy.This is a dog

//全局替换标志 g
var reg = /\bis\b/g
"he is a boy.This is a dog".replace(reg,"IS")
// OUTPUT
// "he IS a boy.This IS a dog"


// 忽略大小写
var reg = /\bis\b/gi
"he is a boy.This Is a dog".replace(reg,"IS")
// OUTPUT
// "he IS a boy.This IS a dog"

// 元字符
// *+?^.| \ (){}[]


// 字符类 []
'a1b2c3d4'.replace(/[abc]/g,"X")
// OUTPUT
// "X1X2X3d4"

// 字符类取反^
'a1b2c3d4'.replace(/[^abc]/g,"X")
// OUTPUT
// "aXbXcXXX"

// 范围类
// [a-z] 表示从 a 到 z 的任意字符
'a1b2w3z4'.replace(/[^a-z]/g,"X")
// OUTPUT
// "aXbXwXzX"

// [a-zA-Z]
'a1b2w3z4SFSADADA'.replace(/[a-zA-Z]/g,"X")
// OUTPUT
// "X1X2X3X4XXXXXXXX"

//[0-9]
"2015-01-03".replace(/[0-9]/g,"Q")
// OUTPUT
// "QQQQ-QQ-QQ"

// 数字和-
"2015-01-03".replace(/[0-9-]/g,"Q")
"QQQQQQQQQQ"

// 预定义类

// .  除了回车 换行的所有字符
  "@123@abc@".replace(/@./g,"Q")
// OUTPUT
// "Q23Qbc@"


// [0-9] 数字字符
// [^0-9] 非数字字符
// \w  === [a-zA-Z_0-9]


// 常用的边界匹配字符

// ^ 以xxx开始
"@123@abc@".replace(/^@./g,"Q")
// OUTPUT
// "Q23@abc@"

// $ 以xxx结束

"@123@abc@".replace(/.@$/g,"Q")
// OUTPUT
// "@123@abQ"

// \b 表示单词边界
// \B 表示非单词边界


//  处理多行 m
mulSrt= `@123
@456
@789`
mulSrt.replace(/^@\d/gm,"x")
// OUTPUT
// "x23
// x56
// x89"

// 量词
// ?  出现0次或一次(最多一次)
// +  出现1次或多次(至少一次)
// *  出现0次或多次(任意次)
// {n}出现n次
// {n,m} 出现n到m次
// {n,}  至少出现n次

//  \d{20}\w\d?\w+\d*\d{3}\w{3,5}\d{3,}

//  贪婪模式
"123456789".replace(/\d{3,6}/,'W')
// OUTPUT
// "W789"


//  非贪婪模式 加上 ？
"123456789".replace(/\d{3,6}?/g,'W')
// OUTPUT
// "WWW"

// 分组  利用（）将匹配进行分组
"a1b2c3d4".replace(/[a-z]\d{3}/,"Q")
// OUTPUT
// "a1b2c3d4"
"a1b2c3d4".replace(/([a-z]\d){3}/,"Q")
// OUTPUT
// "Qd4"

// 或 |
"ByrinCasper".replace(/Byrin|Casper/g,"X")
// OUTPUT
// "XX"
"ByrinsperByrCasper".replace(/Byr(in|Ca)sper/g,"X")
// OUTPUT
// "XX"

// 反向引用
"2016-11-25".replace(/(\d{4})-(\d{2})-(\d{2})/,'$2/$3/$1')
// OUTPUT
"11/25/2016"

// 忽略分组  在分组内加上?:即可
// (?:Byron).(ok)

//前瞻  断言部分不参加匹配替换内容部分
//正向前瞻exp(?=assert)
"a2*4".replace(/\w(?=\d)/g,"X")
// OUTPUT
// "X2*4"
"a2*34v8".replace(/\w(?=\d)/g,"X")
// OUTPUT
// "X2*X4X8"
//负向前瞻exp(?!assert)
"a2*34v8".replace(/\w(?!\d)/g,"X")
// OUTPUT
// "aX*3XvX"

// JS 对象属性
// global：是否全文搜索  默认false
// ignore case：是否大小写敏感 默认false
// multiline：是否多行匹配 默认false
// lastIndex：是当前表达式匹配内容的最后一个字符的下一个位置
// 正则表达式的文本字符串
var reg1 = /\w/
reg1.source
// "\w"
var reg2 = /\w/igm
reg2.source
// "\w"

RegExp.prototype.test(str)
// 用来测试字符串参数中是否存在匹配正则表达式模式的字符串

var reg1 = /\w/
reg1.test("a")
// true
reg1.test("$")
// false

// 这是由于 lastIndex 在发生变化
var reg2 = /\w/g
reg2.test('ab')
// true
reg2.test('ab')
// true
reg2.test('ab')
// false
while(reg2.test("ab")){
    console.log(reg2.lastIndex)
}
// 1
// 2

// RegExp.prototype.exec(str)
// 使用正则表达式模式对字符串执行搜索，将更新全局RegExp对象的属性以反应匹配结果
// 如果没有匹配的文本则返回null  否则返回一个结果数组：
// index声明文本的第一个字符的位置
// input存放被检索的字符串 string

var reg4 = /\d(\w)(\w)\d/g
var ts = '$1az2be3cg4er5hg'
var ret
while(ret = reg4.exec(ts)){
  console.log(reg4.lastIndex+"\t"+ret.index+"\t"+ret.toString())
}

// 5	1	1az2,a,z
// 11	7	3cg4,c,g

// 字符串对象方法
// String.prototype.search(reg)
// String.prototype.match(reg)
var reg5 = /\d(\w)(\w)\d/g
var ts = '$1az2be3cg4er5hg'
var ret
ret = ts.match(reg5)
console.log(reg5.lastIndex+"\t"+ret.index+"\t"+ret.toString())
// 0	undefined	1az2,3cg4




