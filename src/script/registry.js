class Registry {
    constructor() {
        this.tel = $('.tel');
        this.pic = $('.pic_yanzheng');
        this.mess = $('.mess_yanzheng');
        this.telwrong = $('.tel-wrong');
        this.picwrong = $('.pic-wrong');
        this.messwrong = $('.mess-wrong');
       
       
    }
    init() {

        this.Tel();
        this.yzm();
        this.yanzheng();
        this.submit();
    }
    //手机号码输入框
    Tel() {
        let $tinput = this.tel.find('input');
        let $telLock = true;
        $tinput.on('blur', () => {

            if ($tinput.val() !== '') {
                let reg = /^1[3578]\d{9}$/;
                if (reg.test($tinput.val())) {
                    this.telwrong.html('√');
                    this.telwrong.css('color', 'green');
                    $telLock = true;
                } else {
                    this.telwrong.html('请输入正确的手机号码');
                    this.telwrong.css('color', 'red');
                    $telLock = false;
                }

            } else {
                this.telwrong.html('手机号码不能为空');
                this.telwrong.css('color', 'red');
                $telLock = false;
            }
            //前后端交互
            $.ajax({
                type: 'post',
                url: 'http://localhost/Tcl/php/registry.php',
                data: {
                    userTel: $tinput.val()
                }
            }).done((result) => {
                if (!result) {
                    this.telwrong.html('√');
                    this.telwrong.css('color', 'green');
                    $telLock = true;
                } else {
                    this.telwrong.html('该手机号已注册');
                    this.telwrong.css('color', 'red');
                    $telLock = false;
                }
            });
        });
    }
    //生成随机验证码
    yzm() {
        
        let $strhtml = '';
        let $arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 4; i++) {
           let $index = Math.ceil(Math.random() * 8);
            $strhtml += $arr[$index];
        }
        $('.yanZhengMa').html($strhtml);
    }
    //匹配验证码
    yanzheng() {
        let $pinput = this.pic.find('input');
        let $yzmLock = true;
        $pinput.on('blur', () => {
            // alert(this.picwrong.html('????'));
            if ($pinput.val() !== '') {
                if ($pinput.val() === $('.yanZhengMa').html($strhtml)) {
                    this.picwrong.html('√');
                    this.picwrong.css('color', 'green');
                    $yzmLock = true;
                } else {
                    this.yzm();
                    this.picwrong.html('请输入正确的验证码');
                    this.picwrong.css('color', 'red');
                    $yzmLock = false;
                }
            } else {
                this.picwrong.html('请输入正确的验证码');
                this.picwrong.css('color', 'red');
                $yzmLock = false;
            }
        });

    }
    //提交
    submit() {
        $('form').on('submit', () => {
            if (!$telLock || !$yzmLock) {
                return false;
            }
        });
    }

}
export {
    Registry
}