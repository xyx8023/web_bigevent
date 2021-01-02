$(function() {
    getUserInfo();
    var layer = layui.layer;

    // 点击退出按钮 实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        // index 是 弹出框的索引号
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //  清空本地存储的token
            localStorage.removeItem('token');
            // 跳转登录页面
            location.href = '/login.html'
                // 关闭弹出框
            layer.close(index);
        })
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！');
            // 调用 函数 渲染头像
            renderAvatar(res.data)
        }
    })
}


// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //    用户名字首字母转换为大写
        var first = name[0].toUpperCase();
        $('.text_avatar').html(first).show();
    }

}