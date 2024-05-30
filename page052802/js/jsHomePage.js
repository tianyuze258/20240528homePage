// 轮播图 
window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    //1.轮播图自动播放
    var timer = this.setInterval(function () {
        index++;
        var target = -index * w;
        //使用CSS里的transform和transition属性实现图片滚动和过渡
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + target + 'px)';
    }, 2000);
    //2.无缝滚动，且去掉过渡效果
    ul.addEventListener('transitionend', function () {
        if (index >= ul.children.length - 2) {
            index = 0;
            ul.style.transition = 'none';
            var target = -index * w;
            ul.style.transform = 'translateX(' + target + 'px)';
        } else if (index < 0) {
            index = ul.children.length - 3;
            ul.style.transition = 'none';
            var target = -index * w;
            ul.style.transform = 'translateX(' + target + 'px)';
        }
        //3.小圆点跟随图片变化
        ol.querySelector('.current').classList.remove('current');
        var num = ol.children.length - index - 1;
        ol.children[num].classList.add('current');
    })
    //4.手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        //手指触摸的时候就停止定时器
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var target = -index * w + moveX;
        //手指拖动的时候不需要动画效果，所以取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + target + 'px)';
        flag = true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function () {
        //5.回弹效果，滑动距离大于70px才会切换下一张
        if (flag) {
            if (Math.abs(moveX) > 70) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var target = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + target + 'px)';
            } else {
                var target = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + target + 'px)';
            }
        }
        //6.手指离开，恢复定时器  
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var target = -index * w;
            //使用CSS里的transform和transition属性实现图片滚动和过渡
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + target + 'px)';
        }, 2000);
    })
})
// 轮播图 

//简介
function toggleContent(sectionId) {
    // 获取所有section元素
    var sections = document.getElementsByClassName('section');
    // 遍历所有section，移除active类
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    // 添加active类到当前section
    document.getElementById(sectionId).classList.add('active');
}
function buttonContent(buttonId) {
    // 获取所有section元素
    var buttons = document.getElementsByClassName('tabButtons');
    // 遍历所有section，移除active类
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('buttonActive');
    }
    // 添加active类到当前section
    document.getElementById(buttonId).classList.add('buttonActive');
}

//简介