## 使用
1.html中引入文件
>>head中引入```<link rel="stylesheet" href="style/css/carousel.css```<br>
>>body中引入```<script src="style/js/carousel.js"></script>```<br>

2.script标签中设置
>>//测试代码
```window.onload=function(){
      var a = document.getElementById("wrapper");//获取一个装载carousel的父元素
      shelleyCarousel.carousel(a,{
      //            width:100,//设置carousel的宽，默认100%；
      //            height:100,//设置carousel的高，默认图片高度; 
          item:[//设置轮播图片个数组
              {
                  title:"",//图片上面的文字
                  imgSrc:"style/img/1.jpg"//图片路径
              },
              {
                  title:"第二个item",
                  imgSrc:"style/img/2.jpg"
              },
              {
                  title:"第三个item",
                  imgSrc:"style/img/3.jpg"
              }
          ],
          btn:true,//左右点击按钮是否设置,true:是，false：否
          navlist:true//导航波点是否设置,true:是，false：否
      });
  }
