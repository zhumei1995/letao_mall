$(function(){

	//用户登录，添加点击事件
	//获取登录信息
	//调用登录中心实现登录
	//
	$('.loginBtn').on('click',function(){
		var username=$('[name="username"]').val();
		var password=$('[name="password"]').val();

		if(!username){
			mui.toast('请输入用户名');
			return;
		}
		if(!password){
			mui.toast('请输入密码');
			return;
		}

		$.ajax({
			url:'/user/login',
			type:'post',
			data:{
				username:username,
				password:password
			},
			beforesend:function(){
				$('.loginBtn').html('正在登录......');
			},
			success:function(res){
				if(res.success){
					mui.toast('登录成功');
					setTimeout(function(){
						location.href='index.html';
					},2000)
				}else{
					mui.toast(res.message);
				}
		}
	})


	});
});