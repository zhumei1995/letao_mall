$(function(){
	//实现搜索页面跳转功能
	/*
	1、获取搜索框的点击事件
	2、拿到用户输入的内容
	3、判断用户是否输入
	4、把用户输入的内容带到跳转页面
	*/
	var keyAry=[];

	$('#search-btn').on('click',function(){
		var keyword=$(this).siblings("input").val();

		if(keyword){

			keyAry.push(keyword);

			localStorage.setItem('keyAry',JSON.stringify(keyAry));

			location.href="searchList.html?keyword="+keyword;
		}else{
			alert('请输入商品名称');
		}
	});

	/*
	实现历史记录功能
	1、准备一个存储关键字的空数组
	2、当用户输入关键字的时候把他追加到数组当中
	3、把数组存取在本地存储中
	4'将数据和html拼接并展示到页面上

	*/
	

	//判断本地内存是否有内容，如果有，把他返回到页面上
	if(localStorage.getItem('keyAry')){

		keyAry=JSON.parse(localStorage.getItem('keyAry'));

		var html=template('historyTpl',{result:keyAry});

		$('#history-box').html(html);
	}


	//清空页面和本地存储数据
	$('.clearBtn').on('click',function(){

		localStorage.removeItem("keyAry");

		$('#history-box').html("");

		keyAry=[];


	});

});