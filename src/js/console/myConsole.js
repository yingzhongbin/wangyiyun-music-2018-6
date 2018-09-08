// <!--自制console 显示面板-->
// <!--<div style="position: fixed;background-color:red;width: 100%;height: 300px;bottom: 0;left: 0" id="consoleOutput">-->
// <!--</div>-->

// 自制console 方法
window.console = {
    log(x) {
        let output = $("#consoleOutput")
        let p = $("<p></p>")
        p.text(x)
        output.append(p)
    }
}
console.log("231313")