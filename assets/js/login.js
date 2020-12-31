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
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('#pwdd').val();
            if (pwd !== value) return '两次密码输入不一致';
        }
    });

    var layer = layui.layer
        // 表单提交
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 一次获取表单内容
            data: $(this).serialize(),
            success: function(res) {
                // layui的弹出层方法 layer.msg
                if (res.status != 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                location.href = './index.html'
            }

        })
    })

    // (注册)表单提交
    // $('#form_reg').on('submit', function(e) {
    //         e.preventDefault();
    //         $.ajax({
    //             url: '/api/reguser',
    //             method: 'POST',
    //             // 一次获取表单内容
    //             // data: $(this).serialize(),
    //             data: {
    //                 username: $('#form_reg [name=username]').val(),
    //                 password: $('#form_reg [name=passwoed]').val()
    //             },
    //             success: function(res) {
    //                 // layui的弹出层方法 layer.msg
    //                 if (res.status !== 0) {
    //                     return layer.msg(res.message)
    //                 }
    //                 layer.msg('注册成功，请登录!');
    //                 $('.link_login').click();
    //             }
    //         })
    //     })
    // 注册表单提交
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize();
        var url = '/api/reguser';
        $.post(url, data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            $('.link_login').click();
        })
    })
})