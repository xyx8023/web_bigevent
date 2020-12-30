$(function() {
    $('.link_reg').on('click', function() {
        $('.login').hide();
        $('.reg').show();
    })
    $('.link_login').on('click', function() {
        $('.reg').hide();
        $('.login').show();
    })


    // 自定义密码框验证规则
    // 从layui.js中获取form对象
    var form = layui.form;
    //通过form.verify() 函数自定义校验规则
    form.verify({
        pwd: [/^[\s]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('#pwdd').val();
            if (pwd !== value) {
                return '两次密码输入不一致';
            }
        }
    });
    // var repwd = $('#repwd').val();
    // var pwd = $('#pwd').val();
    // if (repwd != pwd) {
    //     return '两次密码输入不一致'
    // }
})