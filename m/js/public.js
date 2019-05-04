$(function(){
	$('body').on('tap','a',function(){
		mui.openWindow({
			url:$(this).attr('href')
		})
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
});