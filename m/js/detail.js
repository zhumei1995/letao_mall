$(function(){

	//获取产品id
	var id=getParamByUrl(location.href,'id');
	//库存数量
	var rest=0;
	//用户尺码
	var size=null;

	var num=1;

	//
	var productId=0;

	
	
	$.ajax({
		url:'/product/queryProductDetail',
		type:'get',
		data:{
			id:id
		},
		success:function(res){

			var html=template('productTpl',res);
			
			$('.productBox').html(html);

			var gallery = mui('.mui-slider');
			gallery.slider();

			rest=res.num;
			productId=res.id;


		}
	});


	//尺码点击事件
	$('.productBox').on('tap','.size span',function(){
		$(this).addClass('active').siblings().removeClass('active');
		//用户选择了尺码
		size=$(this).html();
	});

	
	//添加数量功能
	$('.productBox').on('tap','.num .plus',function(){
		num++
		if(num>rest){
			num=rest;
		}
		$('.numInput').val(num);
	});

	//数量减少功能
	$('.productBox').on('tap','.num .decreased',function(){
		num--;
		if(num<1){
			num=1;
		}
		$('.numInput').val(num);
		
	});


	//加入购物车接口
	/*
		1.获取加入购物车按钮，并添加点击事件
		2.判断用户是否选择了尺码
		3.调用加入购物车接口
		4.提示用户加入购物车成功
	*/



	$('.addCart').on('tap',function(){
		if(!size){
			mui.toast('请选择尺码！');
			return;
		}
		$.ajax({
			url:'/cart/updateCart',
			type:'post',
			data:{
				id:productId,
				size:size,
				num:rest
			},
			success:function(res){
				if(res.success){
					mui.confirm('加入购物车成功，是否跳转到购物车？',function(message){
						if(message.index){
							location.href='cart.html';
						}
					})
				}
			}

		}); 


	});



	//获取地址栏中 的参数
function getParamByUrl(url,name){

	var param=url.substr(url.indexOf('?')+1);
	var params= param.split('&');

	for( var i=0;i<params.length;i++){
		var current=params[i].split('=');
		if(current[0]==name){
			return current[1];
		}
			
	}
	return null;
}
})