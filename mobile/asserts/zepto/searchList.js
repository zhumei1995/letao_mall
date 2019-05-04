$(function(){

	//获取地址栏中用户搜索的关键字

	getParamByUrl(location.href,keyword);




});




//获取地址栏中 的参数

function getParamByUrl(url,name){

	console.log(url.indexOf('?'));

}