$(function(){

	//
	var address=null;

	//展示用户信息
	$.ajax({
		url:'/address/queryAddress',
		type:'get',
		success:function(res){
			var html=template('addressTpl',{result:res});
			$('.addressBox').html(html);

			address=res;
		}
	});

	//删除收货地址操作
	/*
		1.给删除按钮天剑点击事件
		2.弹出一个确认对话框
		3.如果用户点击确认就删除
		4.调用删除按钮 的接口 完成删除功能
		5.刷新当前页面
	*/
	$('.addressBox').on('click','.deleteBtn',function(){
		var id=this.getAttribute('data-id');
		
		var li=this.parentNode.parentNode;
		mui.confirm('确认要删除吗？',function(message){
			//确认书删除操作
			if(message.index==1){
				$.ajax({
					url:'/address/deleteAddress',
					type:'post',
					data:{
						id:id
					},
					success:function(res){
						if(res.success){
							//重新加载当前页面
							location.reload();
						}
					}
				});
			}else{
				//取消删除操作
				mui.swipeoutClose(li);
			}
		});
	});


	//编辑操作
	/*
		1.给编辑按钮添加点击事件
		2。跳转到收货地址编辑页面并将要编辑的数据传递到这个页面上
		3.将数据展示到页面山
		4.给确定按钮添加点击事件
		5.调用接口 执行编辑操作
		6.跳转到收货地址列表页面
	*/
	$('.addressBox').on('click','.editBtn',function(){

		var id=this.getAttribute('data-id');
		
		for(var i=0; i<address.length; i++){
			if(address[i].id == id){
				localStorage.setItem('editAddress',JSON.stringify(address[i]));
				break;
			}
		}
		location.href='addAddress.html?isEdit=1';

	});



});