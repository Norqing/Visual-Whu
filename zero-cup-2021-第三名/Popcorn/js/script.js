let MaxIndex = 99;

$(function() {　
    $('#p1').hide(); //开始隐藏　　　
    $('#m1').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p1").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1
        setTimeout(function() {
            $('#p1').fadeIn(); //显示div
            $('#p2').fadeOut(); //其它div隐藏　
            $('#p3').fadeOut();
            $('#p4').fadeOut();
            $('#p5').fadeOut();
            $('#p6').fadeOut();　
        }, 1000);

    });
});
$(function() {　
    $('#p2').hide(); //开始隐藏　　　
    $('#m2').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p2").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1
        setTimeout(function() {
            $('#p2').fadeIn(); //显示div
            $('#p1').fadeOut(); //其它div隐藏　
            $('#p3').fadeOut();
            $('#p4').fadeOut();
            $('#p5').fadeOut();
            $('#p6').fadeOut();　
        }, 1000);
    });
});
$(function() {　
    $('#p3').hide(); //开始隐藏　　　
    $('#m3').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p3").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1 　　　　　　
        setTimeout(function() {
            $('#p3').fadeIn(); //显示div
            $('#p1').fadeOut(); //其它div隐藏　
            $('#p2').fadeOut();
            $('#p4').fadeOut();
            $('#p5').fadeOut();
            $('#p6').fadeOut();　
        }, 1000);
    });
});
$(function() {　
    $('#p4').hide(); //开始隐藏　　　
    $('#m4').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p4").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1　　　　　　
        setTimeout(function() {
            $('#p4').fadeIn(); //显示div
            $('#p1').fadeOut(); //其它div隐藏　
            $('#p2').fadeOut();
            $('#p3').fadeOut();
            $('#p5').fadeOut();
            $('#p6').fadeOut();　
        }, 1000);　
    });
});
$(function() {　
    $('#p5').hide(); //开始隐藏　　　
    $('#m5').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p5").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1　　　　　　
        setTimeout(function() {
            $('#p5').fadeIn(); //显示div
            $('#p1').fadeOut(); //其它div隐藏　
            $('#p2').fadeOut();
            $('#p3').fadeOut();
            $('#p4').fadeOut();
            $('#p6').fadeOut();　
        }, 1000);
    });
});
$(function() {　
    $('#p6').hide(); //开始隐藏　　　
    $('#m6').click(function() {　　　　
        $(".flap").css("z-index", MaxIndex);　 //设置其为顶层
        $("#p6").css("z-index", MaxIndex);　 //设置其为顶层
        MaxIndex++; //顶层数＋1　　　　　　
        setTimeout(function() {
            $('#p6').fadeIn(); //显示div
            $('#p1').fadeOut(); //其它div隐藏　
            $('#p2').fadeOut();
            $('#p3').fadeOut();
            $('#p4').fadeOut();
            $('#p5').fadeOut();　
        }, 1000);
    });
});