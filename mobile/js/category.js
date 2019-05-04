
$(function(){

	// 页面滚动区域
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005
	});




	//请求接口数据
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		success:function(response){
			/*console.log(response);*/
			var html=template('category-first',{result:response.rows});
			$('#links').html(html);
			if(response.rows.length){
				$('#links').find('a').eq(0).addClass('active');
				var id=response.rows[0].id;
				getSecendcategory(id);

			}
		}
	});


	//点击一级分类，获取二级分类
	//在事件处理函数中获取到一级分类的ID
	//调用二级分类的接口获取数据
	//将数据展示到制定页面
	//点击一级分类，获取二级分类
	$('#links').on('click','a',function(){
		//在事件处理函数中获取到一级分类的ID
		var id=$(this).attr('data-id');
		$(this).addClass('active').siblings().removeClass('active')
		//调用二级分类的接口获取数据
		getSecendcategory(id);
	})

});


function getSecendcategory(id){
		$.ajax({
			url:'/category/querySecondCategory',
			type:'get',
			data:{
				id:id
			},
			success:function(response){
				var html=template('category-second',response)
				$('.waper').html(html);
			}
		})
}