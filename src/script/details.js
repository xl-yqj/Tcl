
class DetailsRender {
    constructor() {
        //接收id
        this.sid = location.search.substring(1).split('=')[1];//依接口地址而来

        this.wrap = $('.wrap');
        this.spic = $('#spic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        this.ulist = $('#ulist');
        this.list_ul = $('#list ul');
        this.list = $('#list ul li');
        this.count = $('#count');
        this.left = $('#left');
        this.right = $('#right');


    }
    init() {
        $.ajax({
            url: "http://xlxlyqj.xlismine.top:8888/tcl/category/2",// 该地址不行，要与后端交互，请求数据然后后端返回
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).done((objdata) => {
            $('#spic img').attr('src', objdata.pic_url);
            $('.loadtitle').html(objdata.pname);
            $('.loadpcp').html(objdata.price);

            let $urls = [objdata.pic_url, objdata.pic_url_a, objdata.pic_url_b, objdata.pic_url_c, objdata.pic_url_d];//列表小图地址
            // console.log($urls);
            let $strhtml = '';
            $.each($urls, function (index, value) {
                $strhtml += `<li><img src="${value}"</li>`;
            });
            this.list_ul.html($strhtml);


        });

        this.addcart();//执行添加购物车
        this. Scale();//执行放大镜效果

    }
    //将商品加入购物车
    addcart() {
        //假设本地存储有商品的编号和数量
        let $goodsid = [];
        let $goodsnum = [];

        function getcookie() {//cartnum,cartsid本地存储对应的数量和编号的key值
            if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                $goodsnum = localStorage.getItem('cartnum').split(',');
                $goodsid = localStorage.getItem('cartsid').split(',');
            }
        }
        $('.p-btn a').on('click', () => {
            getcookie();
            if ($.inArray(this.sid, $goodsid) == -1) {//-1表示没找到，则第一次点击将sid传入
                $goodsid.push(this.sid);
                localStorage.setItem('cartsid', $goodsid);
                localStorage.setItem('cartnum', $goodsnum);

            } else {//多次点击无需重复添加sid
                let $index = $.inArray(this.sid, $goodsid);
                let $newnum = parseInt($goodsnum[$index]) + parseInt(this.count.val());
                //再把新得到的数量存进本地
                $goodsnum[$index] = $newnum;
                localStorage.setItem('cartnum', $goodsnum[$index]);

            }
        });
    }

    //放大镜效果
    Scale() {
        let _this = this;
        //1.鼠标移入移出显示隐藏小放和大放。
        this.spic.hover(() => {
            $('#sf,#df').css('visibility', 'visible');//显示小放、大放
            //3.求小放尺寸和比例
            this.sf.css({
                width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()

            });
            //比例
            this.ratio = this.bpic.outerWidth() / this.spic.outerWidth();
            //2.让小放跟随鼠标移动
            this.spic.on('mousemove', (e) => {
                let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                let $t = e.pageX - this.wrap.offset().top - this.sf.height() / 2;
                if ($l < 0) {
                    $l = 0;
                } else if ($l > this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                }
                if ($t < 0) {
                    $t = 0;
                } else if ($t > this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                }

                this.sf.css({
                    left: $l,
                    top: $t
                });
                //对大图赋值
                this.bpic.css({
                    left: -$l * this.ratio,//大图跟小放方向相反
                    top: -$t * this.ratio
                });
            });
        }, () => {
            $('#sf,#bf').css('visibility', 'hidden');
        });//鼠标移入移出两个事件处理函数

        //4.点击小图列表切换缩放的图片 （事件委托）
        // #list ul li ：委托的元素
        this.list_ul.on('click', 'li', () => {
            let $imgurl = $(this).find('img').attr('src');
            this.spic.find('img').attr('src', $imgurl);
            this.bpic.attr('src', $imgurl);
        });
        //点击左右箭头，图片运动
        let $num = 4;//可视的li的长度
        let $liwidth = this.list.eq(0).outerWidth(true);
        if (this.list.size() <= $num) {
            this.right.css('color', '#fff');

        }
        this.right.on('click', () => {
            if (this.list.size() > $num) {
                $num++;
                this.left.css('color', '#333');
                if ($num === this.list.size()) {
                    this.right.css('color', '#fff');
                }
                this.list_ul.animate({
                    left: -($num - 4) * $liwidth
                });

            }
        });

        this.left.on('click', () => {
            if ($num > 4) {
                $num--;
                this.right.css('color', '#333');
                if ($num === 4) {
                    this.left.css('color', '#fff');
                }
                this.list_ul.animate({
                    left: -($num - 4) * $liwidth
                });
            }
        });

    }

}

export {
    DetailsRender
}