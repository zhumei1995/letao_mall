
//获取用书输入的关键字
var keyword=getParamByUrl(location.href,'keyword');

var page=1;
var html='';
var priceSort=1;
var numSort=1;
var This=null;

$(function(){
	mui.init({
	  pullRefresh : {
	    container:'.refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	    up : {
	      height:50,//可选.默认50.触发上拉加载拖动距离
	      auto:true,//可选,默认false.自动上拉加载一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	    }
	  }
	});

	//价格排序
	$('.priceSort').on('tap',function(){
		//排序方式
		priceSort=priceSort==1 ? 2 :1;
		//清空原来数据 从新初始化
		html='';
		page=1;

		mui('.refreshContainer').pullRefresh().refresh(true);
		//从新加载数据
		getData();

	});


	//销量排序
	$('.numSort').on('tap',function(){
		numSort=numSort==1 ? 2 :1;
		html='';
		page=1;
		mui('.refreshContainer').pullRefresh().refresh(true);
		getData();
	});



});

//getData函数用法
//页面加载时的记载数据
function getData(){
	if(!This){
	This=this;
	}
	$.ajax({
		url:'/product/queryProduct',
		type:'get',
		data:{
			page:page++,
			pageSize:2,
			proName:keyword,
			price:priceSort,
			num:numSort
		},
		success:function(res){
			console.log(res)
			if(res.data.length>0){
				html+=template('searchTpl',res);

				$('#search-box').html(html);
				
				This.endPullupToRefresh(false);
			}else{
				This.endPullupToRefresh(true);
			}

		}
	});
}

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