/*
 * @Author: your name
 * @Date: 2021-11-04 08:18:30
 * @LastEditTime: 2021-11-13 17:20:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editfun
 * @FilePath: \Zero-Cup-2021\index1\js\main.js
 */
// let contents = document.querySelectorAll('.content');
// for (item of contents) {
//     item.onmouseover = function() {
//         this.style.opacity = '1';
//         this.style.visibility = "visible";
//         console.log("1")
//     }
// }
// console.log("hi");

// $('.timecard').hover(function(){
//     $('i')
// }
// )

$(".timecard").hover(function (e) {
    console.log(e);
    console.log(e.currentTarget.classList[1]);
    $(".content." + e.currentTarget.classList[1]).addClass("hover");
    $(".jiantou." + e.currentTarget.classList[1]).addClass("hover");
    console.log(e.currentTarget.classList);
}, function (e) {
    $(".content."+ e.currentTarget.classList[1]).removeClass("hover");
    $(".jiantou."+ e.currentTarget.classList[1]).removeClass("hover");
});


$(".timecard:odd").css("right","-65vw");
$(".jiantou:odd").css("left","48vw");
$(".jiantou:odd svg").css("margin-left","18rem");
$(".jiantou:odd span").css("margin-left","4rem");
$(".jiantou:odd span").css("margin-top","0.3rem");
$(".jiantou:odd svg").css('animation','move2 1s infinite');

$('.timecard:eq(0)').click(function (){
    window.location.href="https://zhuanlan.zhihu.com/p/363311034"
})

$('.timecard:eq(1)').click(function (){
    window.location.href="https://www.zhihu.com/question/319535726/answer/647773410"
})

$('.timecard:eq(2)').click(function (){
    window.location.href="https://zhuanlan.zhihu.com/p/23527927"
})
$('.timecard:eq(3)').click(function (){
    window.location.href="https://zhuanlan.zhihu.com/p/72003260"
})
$('.timecard:eq(4)').click(function (){
    window.location.href="https://www.zhihu.com/question/55608987/answer/151380948"
})
$('.timecard:eq(5)').click(function (){
    window.location.href="https://www.zhihu.com/question/36979454/answer/1090443746"
})
// $("#ren").hide();

$(".zhuan").click(function (e) {
    e.preventDefault();
    $("#ren").fadeToggle();
    console.log('hi');
    $('.count6').toggleClass("filter");
    // $("#ren").css('filter','');
    // $(".zhuan").css('filter','');  
    // $(".closeBtn").fadeIn();
    // $(".sidebar, .imgContainer").css("filter", "blur(10px)");
});

