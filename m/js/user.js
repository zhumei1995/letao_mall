//声明变量保存用户信息
var userInfo=null;
	/*获取用户信息，并确认用户未登录情况*/
	$.ajax({
		url:'/user/queryUserMessage',
		type:'get',
		//异步请求变成同步请求
		async:false,
		success:function(res){
		//用户未登录
			if(res.error&&res.error==400){
				location.href='login.html';
			}
			userInfo=res;
		}
	});

$(function(){
	/*退出登录
		1，找到退出登录按钮，添加点击事件
		2，调用退出借口，实现退出登录
		3，退出成功，跳转到首页
	*/
	$('.logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get',
			success:function(res){
				if(res.success){
					mui.toast('退出登录成功');
					setTimeout(function(){
						location.href='index.html';
					},2000);
				}
			}
		})
	});


	//展示用户信息
	var html=template('userTpl',userInfo);
	$('#userInfoBox').html(html);



	//按钮跳转
	$('.updateBtn').on('click',function(){
		location.href='modify.html';
	})

});