$(function(){

	var isEdit=Number(getParamByUrl(location.href,'isEdit'));
	if(isEdit){
			//编辑操作
			if(localStorage.getItem("editAddress")){

				var address=JSON.parse(localStorage.getItem("editAddress"));

				var html=template('editTpl',address);

				$('.editBox').html(html);
			}
	}else{
		//添加操作

			var html=template('editTpl',{});

				$('.editBox').html(html);

	}


	 var picker = new mui.PopPicker({layer:3});

	 picker.setData(cityData); 

	 $('#selectCity').on('click',function(){

	 	  picker.show(function (selectItems) {
    	  //智子
    	  $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
  		}) ;
	 });


	$('#addAddressBtn').on('click',function(){
	  	var recipients = $.trim($("[name='recipients']").val());
	  	var postcode = $.trim($("[name='postcode']").val());
	  	var address = $.trim($("[name='address']").val());
	  	var addressDetail = $.trim($("[name='addressDetail']").val());

	  	if(!recipients){
	  		mui.toast('请输入收货人姓名')
	  		return;
	  	}
	  	if(!postcode){
	  		mui.toast('请输入邮政编码')
	  		return;
	  	}
	  	if(!address){
	  		mui.toast('请输入收货地址')
	  		return;
	  	}
	  	if(!addressDetail){
	  		mui.toast('请输入收货地址')
	  		return;
	  	}



	  	var data={
	  			address:address,
 				addressDetail:addressDetail,
  				recipients:recipients,
                postcode:postcode
	  	}


	  if(isEdit){
	  		//编辑操作
	  		var url='/address/updateAddress';
	  		data.id=address.id;
	  	}else{
	  		//添加操作
	  		var url='/address/addAddress';
	  	}



	  	$.ajax({
	  		url:url,
	  		type:'post',
	  		data:data,
	  		success:function(res){
	  			if(res.success){
	  				if(isEdit){
	  					mui.toast('修改成功');
	  				}else{
	  					mui.toast('添加成功');
	  				}
	  				
/*	  			setTimeout(function(){
	  				location.href='address.html';
	  				},2000);*/
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
 };

});