class Cartlist {
    constructor() {
        this.itemlist = $('.item-list');

    }
    init() {
        //1.获取本地存储
        if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
            let $csid = localStorage.getItem('cartsid').split(',');
            let $cnum = localStorage.getItem('cartnum').split(',');
            for (let i = 0; i < $csid.length; i++) {
                this.render($csid[i], $cnum[i]);//调用单条数据渲染方法
            }
        }
        this.allselect();
        this.valuechange();
        this.delgoods();
    }

    //2.渲染一条数据
    render(sid, num) {//当前购物车编号和数量
        $.ajax({
            url: 'http://xlxlyqj.xlismine.top:8888/tcl/category/2',
            dataType: 'json'
        }).done((data) => {
            $.each(data, (index, value) => {
                if (sid == value.sid) {
                    let $cloneBox = $('.goods-item:hidden').clone(true, true);
                    $cloneBox.find('.goods-pic img').attr('src', value.url);
                    $cloneBox.find('.goods-pic img').attr('sid', value.id);
                    $cloneBox.find('.goods-d-info a ').html(value.pname);
                    $cloneBox.find('.b-price strong').html(value.price);
                    $cloneBox.find('.quantity-from input').val(num);
                    $cloneBox.find('.b-sum strong').html((value.price * num).toFixed(2));
                    $cloneBox.show();
                    
                    this.itemlist.append($cloneBox);

                }

            });
        });
    }

    //计算总价
    allprice() {
        let $goodsnum = 0;
        let $goodsprice = 0;
        $('.goods-item:visible').each((index, element) => {
            if ($(element).find('input:checkbox').is(':checked')) {
                $goodsnum += parseInt($(element).find('.quantity-form input').val());
                $goodsprice += parseFloat($(element).find('.b-sum strong').html());
            }
        });
        $('.amount-sum em').html($goodsnum);
        $('.totalprice').html(`￥${$goodsprice}`);
    }
    //全选
    allselect() {
        $('.allsel').on('change', () => {
            $('.goods-item:visile').find('input:checkbox').prop('checked', $('.allsel').prop('checked'));
            //
        });
        let $checkinput = $('.goods-item:visible').find('input:checkbox');//委托元素
        $('.item-list').on('click', $checkinput, () => {
            let $input = $('.goods-item:visible').find('input:checkbox');
            if ($('.goods-item:visible').find('input:checked').length === $input.length) {
                $('.allsel').prop('checked', true);

            } else {
                $('.allsel').prop('checked', false);
            }
            //
        });
    }
    //文本框值改变
    valuechange() {
        //+
        $('.quantity-add').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            $(this).prev('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));//求单价
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);//存储数量

        });
        //-
        $('.quantity-down').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;//让框里的值最小为1
            }
            $(this).next('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);

        });
        //直接输入
        $('.quantity-form input').on('input', function () {
            let $reg = /^\d+$/;
            let $inputvalue = $(this).val();
            if ($reg.test($(this).val())) {
                if ($inputvalue < 1) {
                    $(this).val(1);
                } else {
                    $(this).val($(this).val());
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $(this).val());

        });
        //封装计算单价方法
        function singleprice(obj) {
            let $dj = parseInt(obj.parents('.goods-info').find('.b-price strong').html());
            let $count = parseFloat(obj.parents('.goods-info').find('.quantity-form input').val());
            return $dj*$count.toFixed(2);
        }

        //数量改变 重新本地存储 通过sid获取数量的位置，将当前的值存放到对应的位置
        function local(sid,value){
            if(localStorage.getItem('cartsid') && localStorage.getItem('cartnum') ){
                let arrsid = localStorage.getItem('cartsid').split(',');
                let arrnum = localStorage.getItem('cartnum').split(',');
                let index = $.inArray(sid,arrsid);
                arrnum[index] = value;
                localStorage.setItem('cartnum',arrnum.toString());
            }
        }
        //删除
        delgoods(){
            let arrnum=[];
            let arrsid =  [];
            let _this = this;

            function getstorage(){
                if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                    arrsid = localStorage.getItem('cartsid').split(',');
                    arrnum = localStorage.getItem('cartnum').split(',');
                }
            }

            //删除本地存储数组项的值
            function delstorage(sid,arrsid){
                let $index = -1;
                $.each (arrsid,function(index,value){
                    if(sid === value){
                        $index = index;
                    }
                });
                arrsid.splice($index,1);
                aarrnum.splice($index,1);
                localStorage.setItem('cartsid',arrsid.toString());
                localStorage.setItem('cartnum',arrnum.toString());

            }
            //单条删除
            $('.item-list').on('click','b-action a',function(){
                getstorage();//取出本地存储
                if(window.confirm('你确定要删除吗？')){
                    $(this).parents('.goods-item').remove();

                }
                delstorage($(this).parents('.goods-item').find('.goods-pic img').attr('sid'),arrsid);
                _this.allprice();
            });

            //删除选中
            $('.operation a').on('click',function(){
                getstorage();
                if(window.confirm('你确定要删除吗？')){
                    $('.goods-item:visible').each(function(index,element){
                        if($(this).find('input:checkbox').is(':checked')){
                            $(this).remove();
                           
                        }
                        delstorage($(this).find('.goods-pic img').attr('sid'),attsid);
                    });
                 

                }
                _this.allprice();
            });
        }

    }
}
export {
    Cartlist
}