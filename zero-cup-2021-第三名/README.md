# zero-cup-2021-bug永远改不队
## 零族第三

组长答辩拉胯到被自己追杀
## 一、主要内容
1. History：以时间轴的方式展示了Pixar动画工作室从成立至今的历史和主要的代表作品，让访问者对Pixar的发展历程有一个全面的了解。
2. Films：这个部分我们通过轮播图展示了Pixar动画电影中一些经典的作品，并插入了一些视频，让访问者能直观地感受Pixar动画电影的魅力。
3. Characters：在这里我们以类似舞台的形式展示了六个Pixar动画电影中家喻户晓的角色，点击会播放角色的经典台词和展示角色的细节信息。
4. Prizes：在奖项页中，我们通过不同层级的图片排列顺序和js中hide和show的动画效果，在点击时呈现出类似快门开关的效果，同时切换所展示的电影的奖项。

## 二、项目目录及说明

```txt
.
├── FirstPage
│   ├── FirstPage.html //首页入口
│   ├── css //首页样式文件
│   │   ├── style.css
│   │   ├── 1.mp4
│   │   ├── textbg.png
│   │   └── title.png
│   └── js //首页js文件
│       ├── script.js
│       └── jquery-3.6.0.js //jQuery库
├── timeLine
│   ├── timeline.html //历史页入口
│   ├── css //历史页样式文件
│   │   ├── timeline.css
│   │   ├── 1.png
│   │   └── PerfectMoment-Script.otf
│   └── js //历史页js文件
│       ├── timeline.js
│       └── iconfont.js //svg文件
├── Film
│   ├── film.html //电影页入口
│   ├── css //电影页样式文件
│   │   ├── film.css
│   │   ├── carVideo.mp4
│   │   ├── …
│   │   ├── car.png
│   │   ├── …
│   │   └── PerfectMoment-Script.otf
│   └── js //电影页js文件
│       └── film.js
├── People
│   ├── people.html //人物页入口
│   ├── css //人物页样式文件
│   │   ├── people.css
│   │   ├── 123.mp3
│   │   ├── …
│   │   ├── 1.jpg
│   │   ├── …
│   │   ├── car.png
│   │   └── …
│   └── js //人物页js文件
│       └── people.js
├── Popcorn
│   ├── index.html //奖项页入口
│   ├── css //奖项页样式文件
│   │   ├── style.css
│   │   ├── 1.jpg
│   │   └── …
│   └── js //奖项页js文件
│       └── script.js
├── EndPage
│   ├── EndPage.html //尾页入口
│   ├── css //尾页样式文件
│   │   ├── EndPage.css
│   │   └── fifawelcome1.3.ttf
│   └── js //尾页js文件
│       └── EndPage.js
├── index.html //主页入口
├── index.css //主页样式文件
├── index.js //主页js文件
├── bottom.png //背景图片
├── README.md //说明文档
└── README.pdf //说明文档pdf版本
```

## 三、功能设计

在本项目中，我们全部采用的是前端的相关技术。在完成此次项目中，我们首先讨论了网页的主题和主要内容，并构思了各个页面的主要呈现方式，构建设计思路，在此基础上分工编写各个页面的html，css和JavaScript的代码。除引用了``jQuery``库协助开发外，主页面没有使用任何第三方辅助工具和其他库。同时为了方便队内及时沟通和整理已有成果，我们也学习并使用了``git``和``github``，及时更新项目进度。在整合网页时，我们使用``iframe``嵌套不同的页面。同时我们也按照开发规范对命名、格式等做了严格要求，代码可读性高。

在首页中，我们首先通过渐入"Are you ready to know about Pixar?"做了一个引入，使访问者对接下来我们将要展示的内容有一定的了解。为了使一些看过甚至熟知Pixar动画的访问者获得一些熟悉感和亲近感，以及使一些没有接触过Pixar动画的访问者对我们的网页产生一定兴趣，在接下来的部分我们采用了一段Pixar经典的开场动画来过渡到正式的开场部分，同时这也是我们对Pixar的制作者的一种致敬。继续下滑，我们通过计算变量`scrolled`,使滑动过程有一个标题从大到小渐入，视频逐渐淡出，最后将标题呈现出来的动画，让标题的出现更为自然流畅也不会死板。

在历史页中，我们用了时间轴配合图片和文字，营造了博物馆展墙的效果，让访问者在阅读使更有身临其境的感受。通过两侧按钮或左右滑动可以调整页面中展示的历史的时间段，访问者可以自由决定希望阅读的内容。

在电影页中，我们制作了自动播放的轮播图来展示Pixar的电影作品，通过两侧按钮可以手动切换展示的图片，点击图片可以看到对应电影的剪辑视频，并且我们在背景制作了毛玻璃效果，使背景更为干净，营造更好的观看效果。

在人物页中，我们呈现了六个经典角色，点击时会展示对角色的介绍，并播放角色的音频，使角色更为鲜活生动地呈现在访问者面前。

在奖项页中，我们通过不同层级的图片排列顺序和js中hide和show的动画效果，在点击时呈现出类似快门开关的效果，同时切换所展示的电影的奖项。

在尾页中，我们通过``animation``实现了语句的浮动渐入效果，对整体网页做了一个收尾和总结。

## 四、部分界面的展示图片

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/1.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/2.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/3.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/4.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/5.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/6.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/7.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/7.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/8.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/9.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/10.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/11.png)

![](https://raw.githubusercontent.com/little-weakduck/Picture/main/img/12.png)

## 五、bug永远改不队成员及分工

罗逸宸：队长，主要负责电影页和人物页的部分。
戴承骥：队员，主要负责奖项页的部分。
廉厶铭：队员，主要负责历史页的部分。
陈慧：队员，主要负责首页和尾页的部分。
UI设计及页面整合修改由全体成员共同完成。
