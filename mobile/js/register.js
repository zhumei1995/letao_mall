$(function(){
//给注册按钮添加点击事件
//获取用户信息
//获取借口信息
//进行信息验证
//调用注册借口。实现祖册功能
//给出提示：是否成功
//跳转到登录页面

$('#registerBtn').on('click',function(){
	var username=$('[name="username"]').val();
	var mobile=$('[name="mobile"]').val();
	var password=$('[name="password"]').val();
	var againPass=$('[name="againPass"]').val();
	var vCode=$('[name="vCode"]').val();

	//验证
	if(!username){
		mui.toast('请输入用户名');
		return;
	}

	if(!mobile){
		mui.toast('请输入合法手机号');
		return;
	}

	if(password!=againPass){
		mui.toast('两次输入的密码不相同');
		
		return;
	}
	if(vCode!=vCode){
		mui.toast('请输入正确的验证码');
		return;
	}

	$.ajax({
		url:'/user/register',
		type:'post',
		data:{
			username:username,
			password:password,
			mobile:mobile,
			vCode:vCode
		},
		success:function(res){
			console.log(res);
			if(res.success){
				mui.toast('注册成功');
				setTimeout(function(){
					location.href='login.html';
				},2000);
			}else{
				mui.toast(res.message);
			}
		}
	})
});

	//获取接口认证码
	//获取认证码点击事件
	//将认证码输出到控制台

	$('.getCode').on('click',function(){
		$.ajax({
			url:'/user/vCode',
			type:'get',
			success:function(res){
			console.log(res.vCode);
			}
		});
	})



});