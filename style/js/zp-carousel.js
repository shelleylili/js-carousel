(function($){
    // FastClick.attach(document.body);
    $.extend($.fn,{
        carousel:function(options){
            var $carousel = createHtml(options);
            this.append($carousel);
            slider();
        }
    });
    //创建html结构
    function createHtml(options){
        var $carousel = $("<section />",{id:"carousel",class:"carousel"});
        var html="";
        var html1="";
        if(!$.isEmptyObject(options)){
            if(options.width){
                $carousel.css("width",options.width+"px");
            }
            if(options.height){
                $carousel.css("height",options.height+"px");
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
                html ='<a href="" id="left" class="btn">&lt;</a>'+
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
        $carousel.append($(html));
        return $carousel;
    }
    $("#carousel").tap(function(){console.log(145666);});
    function slider(){
    	var aNlItem = $("#navlist>li");
        var aClpItem = $(".clp-item");
        var oCarousel=$("#carousel");
        var oPrev = $("#left");
        var oNext = $("#right");
        var oNavList = $("#navlist");
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
        // //绑定点击事件
        oPrev.on("touchend",prev);
        oNext.on("touchend",next);
        oNavList.on("touchend",navFunc);
        //主要的切换方法
        function play() {
            aClpItem.each(function(index){
                $(aNlItem[index]).data("index",index);
                aClpItem.each(function(innerIndex){
                    if ($(this).hasClass("active")){
                        $(this).removeClass("active");
                        $(aNlItem[innerIndex]).removeClass("active")
                    }
                    if($(this).hasClass("act-prev")){
                        $(this).removeClass("act-prev");
                    }
                    if($(this).hasClass("act-next")){
                        $(this).removeClass("act-next");
                    }
                });
                $(aClpItem[iNow]).addClass("active");
                $(aNlItem[iNow]).addClass("active");
                $(aClpItem[iNowPre]).addClass("act-prev");
                $(aClpItem[iNowNext]).addClass("act-next");
            });        
        }
        //向前移动
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
        //向后移动
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
        //点击波点导航按钮移动
        function navFunc(e){
                var target = e.target || e.srcElement;
                play();
                if(target.tagName!="UL"){// ul click do not deal
                    aClpItem.each(function(innerIndex){
                        if ($(this).hasClass("active")){
                            $(this).removeClass("active");
                            $(aNlItem[innerIndex]).removeClass("active")
                        }
                        if($(this).hasClass("act-prev")){
                            $(this).removeClass("act-prev");
                        }
                        if($(this).hasClass("act-next")){
                            $(this).removeClass("act-next");
                        }
                    });
    
                    iNow=$(target).data("index");
                    iNowPre=iNow-1;
                    iNowNext=iNow+1;
                    if(iNowPre<0){
                        iNowPre=aClpItem.length-1;
                    }
                    if(iNowNext>=aClpItem.length){
                        iNowNext=0;
                    }
                    
                    $(target).addClass("active");
                    $(aClpItem[iNow]).addClass("active");
                    $(aClpItem[iNowPre]).addClass("act-prev");
                    $(aClpItem[iNowNext]).addClass("act-next");
                }
        }
    }         
})(Zepto);
