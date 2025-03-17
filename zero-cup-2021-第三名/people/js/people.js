//导入音频
var toyAudio = new Audio("./css/toyStory.mp3");
var monsterAudio = new Audio("./css/monster.mp3");
var seaAudio = new Audio("./css/sea.mp3");
var carAudio = new Audio("./css/car.mp3");
var cocoAudio = new Audio("./css/coco.mp3");
var IncrediblesAudio = new Audio("./css/Incredibles.mp3");
//播放
function playToy() {
  toyAudio.play();
}
function playMonster() {
  monsterAudio.play();
}
function playSea() {
  seaAudio.play();
}
function playCar() {
  carAudio.play();
}
function playCoco() {
  cocoAudio.play();
}
function playIncredibles() {
  IncrediblesAudio.play();
}
//显示人物介绍
$(document).ready(function () {
  $(".toy").click(function () {
    $(".toyDe").fadeIn("slow");
  });
});
$(document).ready(function () {
  $(".monster").click(function () {
    $(".monsterDe").fadeIn("slow");
  });
});
$(document).ready(function () {
  $(".sea").click(function () {
    $(".seaDe").fadeIn("slow");
  });
});
$(document).ready(function () {
  $(".car").click(function () {
    $(".carDe").fadeIn("slow");
  });
});
$(document).ready(function () {
  $(".coco").click(function () {
    $(".cocoDe").fadeIn("slow");
  });
});
$(document).ready(function () {
  $(".Incredibles").click(function () {
    $(".IncrediblesDe").fadeIn("slow");
  });
});
//隐藏人物介绍
$(document).ready(function () {
  $(".peopleClose").click(function () {
    $(".toyDe").fadeOut("slow");
    $(".monsterDe").fadeOut("slow");
    $(".seaDe").fadeOut("slow");
    $(".carDe").fadeOut("slow");
    $(".cocoDe").fadeOut("slow");
    $(".IncrediblesDe").fadeOut("slow");
  });
});
