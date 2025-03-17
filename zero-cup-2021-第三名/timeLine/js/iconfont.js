!(function (t) {
  var e,
    n,
    o,
    i,
    c,
    a =
      '<svg><symbol id="icon-07jiantouxiangyou" viewBox="0 0 1024 1024"><path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z"  ></path><path d="M668.832254 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.512727-32.735385-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l136.287918 136.671523-137.407768 135.904314c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C671.231931 526.592447 673.600645 512.767209 668.832254 501.152426z"  ></path></symbol><symbol id="icon-07jiantouxiangzuo" viewBox="0 0 1024 1024"><path d="M64 512c0-247.039 200.961-448 448-448s448 200.961 448 448S759.039 960 512 960 64 759.039 64 512zM128 512c0 211.744 172.256 384 384 384s384-172.256 384-384S723.744 128 512 128 128 300.256 128 512z"  ></path><path d="M362.272 535.971l160.255 158.496c6.241 6.145 14.369 9.248 22.497 9.248 8.255 0 16.512-3.169 22.751-9.504 12.416-12.576 12.32-32.801-0.256-45.248L430.112 513.058 566.4 376.386c12.48-12.513 12.449-32.768-0.064-45.248-12.513-12.513-32.768-12.449-45.248 0.064L362.176 490.561c-0.031 0.033-0.031 0.064-0.064 0.096-0.033 0.031-0.064 0.031-0.096 0.064-2.943 2.976-5.056 6.432-6.592 10.048-0.064 0.127-0.224 0.256-0.256 0.384C350.399 512.767 352.768 526.592 362.272 535.971z"  ></path></symbol><symbol id="icon-jiantou-you" viewBox="0 0 1024 1024"><path d="M384.7 872.6L710 547.4c19.5-19.5 19.5-51.2 0-70.7L384.7 151.4c-19.5-19.5-51.2-19.5-70.7 0s-19.5 51.2 0 70.7L603.9 512 314 801.9c-19.5 19.5-19.5 51.2 0 70.7 19.5 19.6 51.2 19.6 70.7 0z"  ></path></symbol><symbol id="icon-jiantou-zuo" viewBox="0 0 1024 1024"><path d="M639.3 151.4L314 476.6c-19.5 19.5-19.5 51.2 0 70.7l325.3 325.3c19.5 19.5 51.2 19.5 70.7 0s19.5-51.2 0-70.7L420.1 512 710 222.1c19.5-19.5 19.5-51.2 0-70.7-19.5-19.6-51.2-19.6-70.7 0z"  ></path></symbol></svg>',
    d = (d = document.getElementsByTagName("script"))[
      d.length - 1
    ].getAttribute("data-injectcss"),
    s = function (t, e) {
      e.parentNode.insertBefore(t, e);
    };
  if (d && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function l() {
    c || ((c = !0), o());
  }
  function u() {
    try {
      i.documentElement.doScroll("left");
    } catch (t) {
      return void setTimeout(u, 50);
    }
    l();
  }
  (e = function () {
    var t, e;
    ((e = document.createElement("div")).innerHTML = a),
      (a = null),
      (t = e.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (e = t),
        (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((n = function () {
            document.removeEventListener("DOMContentLoaded", n, !1), e();
          }),
          document.addEventListener("DOMContentLoaded", n, !1))
      : document.attachEvent &&
        ((o = e),
        (i = t.document),
        (c = !1),
        u(),
        (i.onreadystatechange = function () {
          "complete" == i.readyState && ((i.onreadystatechange = null), l());
        }));
})(window);
