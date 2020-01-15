
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
        })
    }
}
export{
DetailsRender
}