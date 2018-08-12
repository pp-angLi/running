window.onload = function () {
    running.timeRun(); // timerRun（obj） // 为切下一张图的时间间隔
    makeFunction();
}

var makeFunction = function () {  //  事件监听操作的
    var Spot = document.getElementsByClassName('circle');
    for(let i = 0; i < Spot.length; i++){ // 获取选取的下一张图片的号码，并且进行切换
        if(Spot[i].addEventListener){
            running.someAdd(Spot[i], 'click', function () {
                changeNumber = i;
                running.runNext();
            });
        }
        else if(Spot[i].attachEvent){
            running.someAdd(Spot[i], 'click', function () {
                changeNumber = i;
                running.runNext();
            });
        }
        else{
            running.someAdd(Spot[i], 'click', function () {
                changeNumber = i;
                running.runNext();
            });
        }
    }
}

var changeNumber; // 下一张图片的号码
var running = (function(){
    var Photo = document.getElementsByClassName('photo');
    var Circle = document.getElementsByClassName('circle');
    var photoNumber; // 标记当前图片的号码
    var timer; // 计时器
    var speed = -20; // 轮播图滑屏速度

    var timeRun = function (timeChange) {  //  无操作时轮播图的播放
        timerClean();
        circleColor();
        var s = 3000;
        timeChange = timeChange?timeChange:s;
        timer = setTimeout(function () { // setTimeout延时器，延迟多久切换一张图
            if(photoNumber == 0 || photoNumber == Photo.length - 1){ // 根据当前图片的位置来切换速度的正负
                speed = -speed;
            }
            intervalTime();
        }, timeChange)
    }

    var circleColor = function () {  //  方法 -- 定义使标记位变色
        for(var i = 0; i < Photo.length; i++){
            if(getStyle(Photo[i], 'right') == '0px'){ //获取当前显示的图片的号数
                photoNumber = i;
            }
        }
        for(var i = 0; i < Photo.length; i++){ //下小圈变色
            if(i == photoNumber){
                Circle[i].style.background = '#ea6565';
            }
            else{
                Circle[i].style.background = '';
            }
        }
    }

    var intervalTime = function () { // 方法 -- 定义计时器
        var timer1 = setInterval(function () { // setInterval计时器，切换一张图用的速度
            if(speed > 0){
                Photo[photoNumber].style.right = parseInt(getStyle(Photo[photoNumber],'right')) + speed + 'px';
                Photo[photoNumber+1].style.right = parseInt(getStyle(Photo[photoNumber+1],'right')) + speed + 'px';
                if(Photo[photoNumber+1].style.right == 0 + 'px'){
                    clearInterval(timer1);
                    timeRun();
                }
            }
            else{
                Photo[photoNumber].style.right = parseInt(getStyle(Photo[photoNumber],'right')) + speed + 'px';
                Photo[photoNumber-1].style.right = parseInt(getStyle(Photo[photoNumber-1],'right')) + speed + 'px';
                if(Photo[photoNumber-1].style.right == 0 + 'px'){
                    clearInterval(timer1);
                    timeRun();
                }
            }
        }, 1)
    }

    var timerClean = function () { //清除定时器，当鼠标进入时停止计时
        clearTimeout(timer);
    }

    var runNext = function () {  // 切换图片
        var difference = Math.abs(changeNumber - photoNumber);
        for(var i = 0; i < difference; i++){
            if(photoNumber == 0 || photoNumber == Photo.length - 1){ // 根据当前图片的位置来切换速度的正负
               speed = -speed;
            }
            if(changeNumber >= photoNumber){
                speed = Math.abs(speed);
                circleColor();
                intervalTime();
            }
            else{
                speed = -Math.abs(speed);
                circleColor();
                intervalTime();
            }
        }
        timeRun();
    }

    var someAdd = function (element, type, handle) { //监听器，用以dom2级操作
        if(element.addEventListener){ // 非IE 用addEventListener
            element.addEventListener(type, handle, false);
        }
        else if(element.attachEvent){ // IE 用attachEvent
            element.attachEvent('on' + type, handle);
        }
        else{ // 以上两者都不能用的用 'onclick/onmouseenter...' = ();
            element['on' + type] = handle;
        }
    }
    return {
        runNext:runNext,
        someAdd:someAdd,
        timeRun:timeRun,
        timerClean:timerClean
    }
})();

function getStyle(obj,attr){//用来获取样式的方法
    if(obj.currentStyle){//IE用currentStyle。
            return obj.currentStyle[attr];
    }
    else{//firefox用getComputedStyle来获取样式。
        return getComputedStyle(obj,false)[attr];
    }
}