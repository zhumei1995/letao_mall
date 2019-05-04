$(function(){

	$('.modifyBtn').on('tap',function(){
		//获取用户填写信息
		var originPass=$.trim($('[name="originPass"]').val());

		var newPass=$.trim($('[name="newPass"]').val());
		
		var surePass=$.trim($('[name="surePass"]').val());
		
		var vCode=$.trim($('[name="vCode"]').val());
		

			//验证
		if(!originPass){
			mui.toast('请输入原密码');
			return;
		}

		if(!newPass){
			mui.toast('请输入新密码');
			return;
		}


		if(newPass!=surePass){
			mui.toast('两次输入的密码不相同');
			return;
		}
		if(vCode!=vCode){
			mui.toast('请输入正确的验证码');
			return;
		}

		$.ajax({
			url:'/user/updatePassword',
			type:'post',
			data:{
				oldPassword:originPass,
				newPassword:newPass,
				vCode:vCode
			},
			success:function(res){
				console.log(res);
				if(res.success){
					mui.toast('修改密码成功');
					setTimeout(function(){
						location.href='login.html';
					},2000);
				}else{
					mui.toast('修改密码失败');
				}
			}
		});

	});

	//获取认证码
	$('.getCode').on('click',function(){
		$.ajax({
			url:'/user/vCodeForUpdatePassword',
			type:'get',
			success:function(res){
			console.log(res.vCode);
			}
		});
});











});