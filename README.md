# running
写css轮播图主要想优化一下曾经写了多遍的纯js的轮播图

1.在css方面，主要是多设置了几个类名，在做图片切换的时候，可以在className上操作，而不是直接用js改变left,这样可以减少重绘和回流的次数，其次在class中是调用的animation来完成图片的切换，目的在于可以完成一帧的动画效果
<br>
<br>
2.在js方面，主要是用setTimeout多次调用取代setInterval，好处是setTimeout完成效果的时候一定比setInterval完成效果的时间准确。
