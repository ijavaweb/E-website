window.onload=function(){
    wb.app.toTip();
    wb.app.toBanner();
    wb.app.sel();
    wb.app.toRun();
}

var wb={};

wb.tools={};
wb.tools.getByClass=function(oParent,sClass) {
    var aLe=oParent.getElementsByTagName('*');
    var arr=[];
    for(var i=0;i<aLe.length;i++){
        if(aLe[i].className==sClass){
            arr.push(aLe[i]);
        }
    }
    return arr;
};

wb.tools.getStyle=function (obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }

};

wb.ui={};
wb.ui.textChange=function (obj,str) {
    obj.onfocus=function () {
        if(this.value==str){
            this.value='';
        }
    };
    obj.onblur=function(){
        if(this.value==''){
            this.value=str;
        }
    };
};

wb.ui.fadeIn=function (obj) {
    var iCur=wb.tools.getStyle(obj,'opacity');
    if(iCur==1){
        return false;
    }
    var value=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var iSpeed=5;
        if(value==100){
            clearInterval(obj.timer);
        }else{
            value+=iSpeed;
            obj.style.opacity=value/100;
            obj.style.filter='alpha(opacity='+value+')';
        }
    },30);
    
};
wb.ui.fadeOut=function (obj) {
    var iCur=wb.tools.getStyle(obj,'opacity');
    if(iCur==0){
        return false;
    }
    var value=100;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var iSpeed=-5;
        if(value==0){
            clearInterval(obj.timer);
        }else{
            value+=iSpeed;
            obj.style.opacity=value/100;
            obj.style.filter='alpha(opacity='+value+')';
        }
    },30);
    
};

wb.ui.moveLeft = function(obj,old,now){

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        var iSpeed = (now - old)/10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

        if(now == old){
            clearInterval(obj.timer);
        }
        else{
            old += iSpeed;
            obj.style.left = old + 'px';
        }

    },30);

};


wb.app={};

wb.app.toTip=function () {
    var oText1=document.getElementById("text1");
    var oText2=document.getElementById("text2");
    wb.ui.textChange(oText1,'Search website');
    wb.ui.textChange(oText2,'Search website');
};
wb.app.toBanner=function () {
    var aAd=document.getElementById("ad");
    var aLi=aAd.getElementsByTagName("li");
    var oPreBg=wb.tools.getByClass(aAd,'prev_bg')[0];
    var oNextBg=wb.tools.getByClass(aAd,'next_bg')[0];
    var oPre=wb.tools.getByClass(aAd,'prev')[0];
    var oNext=wb.tools.getByClass(aAd,'next')[0];

    var iNow=0;
    var timer=setInterval(auto,3000);

    function auto(){
        if(iNow==aLi.length-1){
            iNow=0;
        }else{
            iNow++;
        }
        for(var i =0;i<aLi.length;i++){
            wb.ui.fadeOut(aLi[i]);
        }
        wb.ui.fadeIn(aLi[iNow]);
    };
    function autoPrev(){
        if(iNow==0){
            iNow=aLi.length-1;
        }else{
            iNow--;
        }
        for(var i =0;i<aLi.length;i++){
            wb.ui.fadeOut(aLi[i]);
        }
        wb.ui.fadeIn(aLi[iNow]);
    };

    oPreBg.onmouseover=oPre.onmouseover=function () {
        oPre.style.display='block';
        clearInterval(timer);
    };
    oPreBg.onmouseout=oPre.onmouseout=function () {
        oPre.style.display='none';
        timer=setInterval(auto,3000);

    };
    oNextBg.onmouseover =oNext.onmouseover =function () {
        oNext.style.display='block';
        clearInterval(timer);
    };
    oNextBg.onmouseout= oNext.onmouseout=function () {
        oNext.style.display='none';
        timer=setInterval(auto,3000);
    };

    oPre.onclick=function () {
        autoPrev();
    };
    oNext.onclick=function () {
        auto();
    };
};
wb.app.sel=function () {
    var oSel=document.getElementById('sell');
    var oUl=oSel.getElementsByTagName('ul');
    var oDd=oSel.getElementsByTagName('dd');
    var oH2=oSel.getElementsByTagName('h2');

    for(var i=0;i<oDd.length;i++) {
        oDd[i].index = i;
        oDd[i].onclick = function (ev) {
            var ev = ev || window.event;
            var This=this;
            for (var i = 0; i < oUl.length; i++) {
                oUl[i].style.display = 'none';
            }
            oUl[this.index].style.display = 'block';
            document.onclick = function () {
                oUl[This.index].style.display = 'none';
            };
            ev.cancelBubble = true;
        };
    };
    for(var i=0;i<oUl.length;i++){
        oUl[i].index=i;
        (function (ul) {
            var oLi=document.getElementsByTagName('li');
            for(var i=0;i<oLi.length;i++){
                oLi[i].onmouseover=function () {
                    this.className='active';
                }
                oLi[i].onmouseout=function () {
                    this.className='';
                }
                oLi[i].onclick=function (ev) {
                    var ev=ev||window.event;
                    oH2[this.parentNode.index].innerHTML=this.innerHTML;
                    ev.cancelBubble=true;
                    this.parentNode.style.display='none';
                }
            }
        })(oUl[i])
    }
    
};

wb.app.toRun=function () {
    var aRun=document.getElementById('run1');
    var aUl=aRun.getElementsByTagName('ul')[0];
    var aLi=aUl.getElementsByTagName('li');

    var oPrev=wb.tools.getByClass(aRun,'prev')[0];
    var oNext=wb.tools.getByClass(aRun,'next')[0];
    var iNow=0;
    aUl.innerHTML+=aUl.innerHTML;                   //复制一份ul
    aUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
    oPrev.onclick=function () {
        if(iNow == 0){
            iNow = aLi.length/2;
            aUl.style.left = -aUl.offsetWidth/2 + 'px';
        }
        wb.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);

        iNow--;
    };
    oNext.onclick=function () {
        if(iNow==aLi.length/2){
            iNow=0;
            aUl.style.left=0;
        }
        wb.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
        iNow++;
    };
};