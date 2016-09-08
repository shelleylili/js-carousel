/**
 * Created by Administrator on 16-9-7.
 */
var shelleyCarousel=(function(){
//判断一个元素是否在数组中,参数一arr是数组，参数二n是元素
    function findInArray(arr,n){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==n){
                return true;
            }
        }
        return false;
    }
//根据className获取元素兼容写法，oParent是父元素，classname是要获取的类的名字
    function getByClassName(oParent,classname){
        if(oParent.getElementsByClassName){
            return oParent.getElementsByClassName(classname);
        }else{
            var aElem=oParent.getElementsByTagName("*");
            var arr=[];
            for(var i=0;i<aElem.length;i++){
                var aTemp=aElem[i].className.split(" ");
                if(findInArray(aTemp,classname)){
                    arr.push(aElem[i]);
                }
            }
            return arr;
        }
    }
//判断一个对象是否是空对象
    function isEmptyObject(obj){
        var arr=[];
        for(var key in obj){
            arr.push(key);
        }
        return arr.length>0 ? false:true;
    }
//elem是要添加事件的元素，eventName是事件名，handler是事件处理函数
    function addEvent(elem,eventName,handler){
        if(elem.addEventListener){
            elem.addEventListener(eventName,handler,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+eventName,handler);
        }else{
            elem["on"+eventName]=handler;
        }
    }
//入口方法
    var carousel=function(oParent,options){
        var df = createHtml(options);
        oParent.appendChild(df);
        if(!isEmptyObject(options)){
            if(!options.btn){
                document.getElementById("left").style.display="none";
                document.getElementById("right").style.display="none";
            }
            if(!options.navlist){
                document.getElementById("navlist").style.display="none";
            }
        }
        slider();
    };
//创建html结构
    function createHtml(options){
        var df = document.createDocumentFragment();
        var oCarousel = document.createElement("section");
        oCarousel.setAttribute("class","carousel");
        oCarousel.setAttribute("id","carousel");
        var html="";
        var html1="";
        if(!isEmptyObject(options)){
            if(options.width){
                oCarousel.style.width=options.width+"px";
            }
            if(options.height){
                oCarousel.style.width=options.height+"px";
            }
            if(options.item.length>0){
                html+= '<a href="" id="left" class="btn">&lt;</a>'+
                '<a href="" id="right" class="btn">&gt;</a>'+
                '<div class="cl-panel flex">';
                html1+='<ul class="navlist flex" id="navlist">';
                for(var i= 0,len=options.item.length;i<len;i++){
                    if(i==0){
                        html+='<div class="clp-item flex active">'+
                        '<img src="'+options.item[i].imgSrc+'" class="clp-img">'+
                        '<div class="clp-content flex-ver">'+
                        '<h4>'+options.item[i].title+'</h4>'+
                        '</div>'+
                        '</div>';
                        html1+='<li class="nl-item flex-item active"></li>';
                    }else{
                        html+='<div class="clp-item flex">'+
                        '<img src="'+options.item[i].imgSrc+'" class="clp-img">'+
                        '<div class="clp-content flex-ver">'+
                        '<h4>'+options.item[i].title+'</h4>'+
                        '</div>'+
                        '</div>';
                        html1+='<li class="nl-item flex-item"></li>';
                    }
                }
                html+='</div>';
                html1+='</ul>';
                html+=html1;
            }else{
                html = '<a href="" id="left" class="btn">&lt;</a>'+
                '<a href="" id="right" class="btn">&gt;</a>'+
                '<div class="cl-panel flex">'+
                '<div class="clp-item flex active">'+
                '<img src="style/img/1.jpg" class="clp-img">'+
                '<div class="clp-content flex-ver">'+
                '<h4>title1</h4>'+
                '</div>'+
                '</div>'+
                '<div class="clp-item flex">'+
                '<img src="style/img/2.jpg" class="clp-img">'+
                '<div class="clp-content flex-ver">'+
                '<h4>2</h4>'+
                '</div>'+
                '</div>'+
                '<div class="clp-item flex">'+
                '<img src="style/img/3.jpg" class="clp-img">'+
                '<div class="clp-content flex-ver">'+
                '<h4>title3</h4>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<ul class="navlist flex" id="navlist">'+
                '<li class="nl-item flex-item active"></li>'+
                '<li class="nl-item flex-item"></li>'+
                '<li class="nl-item flex-item"></li>'+
                '</ul>';
            }
        }else{
            html = '<a href="" id="left" class="btn">&lt;</a>'+
            '<a href="" id="right" class="btn">&gt;</a>'+
            '<div class="cl-panel flex">'+
            '<div class="clp-item flex active">'+
            '<img src="style/img/1.jpg" class="clp-img">'+
            '<div class="clp-content flex-ver">'+
            '<h4>title1</h4>'+
            '</div>'+
            '</div>'+
            '<div class="clp-item flex">'+
            '<img src="style/img/2.jpg" class="clp-img">'+
            '<div class="clp-content flex-ver">'+
            '<h4>2</h4>'+
            '</div>'+
            '</div>'+
            '<div class="clp-item flex">'+
            '<img src="style/img/3.jpg" class="clp-img">'+
            '<div class="clp-content flex-ver">'+
            '<h4>title3</h4>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<ul class="navlist flex" id="navlist">'+
            '<li class="nl-item flex-item active"></li>'+
            '<li class="nl-item flex-item"></li>'+
            '<li class="nl-item flex-item"></li>'+
            '</ul>'
        }
        oCarousel.innerHTML=html;
        df.appendChild(oCarousel);
        return df;
    }
//滑动操作
    function slider(){
        var oCarousel=document.getElementById("carousel");
        var oPrev = document.getElementById("left");
        var oNext = document.getElementById("right");
        var oNavList = document.getElementById("navlist");
        var aNlItem = oNavList.getElementsByTagName("li");
        var aClpItem =getByClassName(oCarousel,"clp-item");
        var iNow=0;
        var iNowPre=0;
        var iNowNext=0;
        iNowPre=iNow-1;
        iNowNext=iNow+1;
        if(iNowPre<0){
            iNowPre=aClpItem.length-1;
        }
        if(iNowNext>=aClpItem.length){
            iNowNext=0;
        }

        function play() {
            for (var i = 0; i < aClpItem.length; i++){
                aNlItem[i].index = i;
                for (var j = 0; j < aClpItem.length; j++) {
                    if (aClpItem[j].className.indexOf("active") > -1){
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("active") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("active") + 6);
                        aNlItem[j].className = aNlItem[j].className.substring(0, aNlItem[j].className.indexOf("active") - 1) + aNlItem[j].className.substring(aNlItem[j].className.indexOf("active") + 6);
                    }
                    if(aClpItem[j].className.indexOf("act-prev")>-1){
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("act-prev") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("act-prev") + 8);
                    }
                    if(aClpItem[j].className.indexOf("act-next")>-1) {
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("act-next") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("act-next") + 8);
                    }
                }
            }
            aClpItem[iNow].className += " active";
            aNlItem[iNow].className += " active";
            aClpItem[iNowPre].className+=" act-prev";
            aClpItem[iNowNext].className+=" act-next";
        }
        addEvent(oPrev,"click",prev);
        addEvent(oNext,"click",next);
        addEvent(oNavList,"click",navFunc);
        function prev(e){
            iNow--;
            if(iNow<0){
                iNow=aClpItem.length-1;
            }
            iNowPre=iNow-1;
            iNowNext=iNow+1;
            if(iNowPre<0){
                iNowPre=aClpItem.length-1;
            }
            if(iNowNext>=aClpItem.length){
                iNowNext=0;
            }
            play();
            e.preventDefault();
            window.event.returnValue=false;
            return false;
        }
        function next(e){
            iNow++;
            if(iNow>=aClpItem.length){
                iNow=0;
            }
            iNowPre=iNow-1;
            iNowNext=iNow+1;
            if(iNowPre<0){
                iNowPre=aClpItem.length-1;
            }
            if(iNowNext>=aClpItem.length){
                iNowNext=0;
            }
            play();
            e.preventDefault();
            window.event.returnValue=false;
            return false;
        };
        function navFunc(e){
            var target = e.target || e.srcElement;
            play();
            if(target.tagName!="UL"){// ul click do not deal
                for (var j = 0; j < aClpItem.length; j++) {
                    if (aClpItem[j].className.indexOf("active") > -1) {
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("active") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("active") + 6);
                        aNlItem[j].className = aNlItem[j].className.substring(0, aNlItem[j].className.indexOf("active") - 1) + aNlItem[j].className.substring(aNlItem[j].className.indexOf("active") + 6);
                    }
                    if(aClpItem[j].className.indexOf("act-prev")>-1){
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("act-prev") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("act-prev") + 8);
                    }
                    if(aClpItem[j].className.indexOf("act-next")>-1) {
                        aClpItem[j].className = aClpItem[j].className.substring(0, aClpItem[j].className.indexOf("act-next") - 1) + aClpItem[j].className.substring(aClpItem[j].className.indexOf("act-next") + 8);
                    }
                }
                iNow=target.index;
                iNowPre=iNow-1;
                iNowNext=iNow+1;
                if(iNowPre<0){
                    iNowPre=aClpItem.length-1;
                }
                if(iNowNext>=aClpItem.length){
                    iNowNext=0;
                }
                target.className += " active";
                aClpItem[target.index].className += " active";
                aClpItem[iNowPre].className+=" act-prev";
                aClpItem[iNowNext].className+=" act-next";

            }
        }
    }
    return {
        carousel:carousel
    }
})();