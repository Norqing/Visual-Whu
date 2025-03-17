$(function(){

    var box1_height = $("#box1").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box1_height - 500 ){
    $("#box1").animate({
        marginLeft:"30px",
        opacity:"1",
    },1000)
    }
    });

    var box2_height = $("#box2").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box2_height - 500 ){
    $("#box2").animate({
        opacity:"1",
    },1000)
    }
    });

    var box3_height = $("#box3").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box3_height - 500 ){
    $("#box3").animate({
        marginLeft:"50px",
        opacity:"1",
    },1000)
    }
    });

    var box4_height = $("#box4").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box4_height - 500 ){
    $("#box4").animate({
        marginLeft:"70px",
        opacity:"1",
    },1000)
    }
    });

    var box5_height = $("#box5").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box5_height - 500 ){
    $("#box5").animate({
        opacity:"1",
    },1000)
    }
    });

    var box6_height = $("#box6").offset().top;
    $(window).scroll(function(){
    var this_scrollTop = $(this).scrollTop();
    if(this_scrollTop > box6_height - 300 ){
    $("#box6").animate({
        marginLeft:"20px",
        opacity:"1",
    },1000)
    }
    });
});

