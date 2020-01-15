
class DetailsRender{
    constructor(){
        //接收id
        this.sid=location.search.substring(1).split('=')[1];//？？？依接口地址而来

        this.wrap=$('.wrap');
        this.spic=$('.spic');
        this.sf=$('#sf');
        this.bf=$('#df');
        this.bpic=$('#pic');
        this.ulist=$('#ulist');
        this.list_ul=$('#list ul');
        this.count=$('#count');
        this.left=$('#left');
        this.right=$('#right');


    }
    init(){
        $.ajax({
            url:"http://xlxlyqj.xlismine.top:8888/tcl/category/2",
            data:{
                sid:this.sid
            },
            dataType:'json'
        }).done((objdata)=>{
            $('#spic img').attr('src',objdata.pic_url);
            $('.loadtitle').html(objdata.pname);
            $('.loadpcp').html(objdata.price);

            let $urls=[objdata.pic_url,objdata.pic_url_a,objdata.pic_url_b,objdata.pic_url_c,objdata.pic_url_d];//列表小图地址
            // console.log($urls);
            let $strhtml='';
            $.each($urls,function (index,value){
                $strhtml+=`<li><img src="${value}"</li>`;
            });
            this.list_ul.html($strhtml);


        });

      this.addcart();//执行添加购物车

    }
  //将商品加入购物车
    addcart(){
        //假设本地存储有商品的编号和数量
        let $goodsid=[];
        let $goodsnum=[];

        function getcookie(){//cartnum,cartsid本地存储对应的数量和编号的key值
            if(localStorage.getItem('cartnum') && localStorage.getItem('cartsid')){
                $goodsnum=localStorage.getItem('cartnum').split(',');
                $goodsid=localStorage.getItem('cartsid').split(',');
            }
        }
        $('.p-btn a').on('click',()=>{
            getcookie();
            if($.inArray(this.sid,$goodsid)==-1){//-1表示没找到，则第一次点击将sid传入
                $goodsid.push(this.sid);
                localStorage.setItem('cartsid',$goodsid);
                localStorage.setItem('cartnum',$goodsnum);

            }else{//多次点击无需重复添加sid
                let $index = $.inArray(this.sid,$goodsid);
                let $newnum = parseInt($goodsnum[$index])+parseInt(this.count.val());
                //再把新得到的数量存进本地
                $goodsnum[$index] =  $newnum ;
                localStorage.setItem('cartnum',$goodsnum[$index]);

            }
        });
    }

    //放大镜效果
    Scale(){
        let _this = this;
        this.spic.hover(()=>{
            $('#sf,#df').css('visibility','visible');//显示小放、大放
        });
        //求小放尺寸和比例
        this.sf.css({
            
        })


    }

}
 
export{
DetailsRender
}