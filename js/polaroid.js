// 监听提交按钮
$('#submit').click(function () {
    // 获取输入框的值
    var text = $('#serialNumber').val();

    // 判断输入框是否为空
    if (text == '') {
        alert('请输入序列号');
        return;
    }

    // 判断输入框文本长度是否等于11
    if (text.length != 11) {
        alert('序列号长度不正确');
        return;
    }

    // 参数对应div的id
    var shutterType = '';
    var productionYear = '';
    var model = '';
    var productionDate = '';

    

    // 第二、第三位：用来表示生产年份和月份 id=productionYear
    var second = text.substring(1, 2);
    var third = text.substring(2, 3);
    var month = '';
    var year = '';// 680 690 1980开始生产 其余是1972开始生产  5c944592140
	var yearAdd = parseInt(third);
    if (first == '7' || first == '8' || first == '9') {
        year = yearAdd + 1980;
    } else {
		
		if(yearAdd != 0 && yearAdd != 1 && yearAdd != 2){
			yearAdd = yearAdd > 2 ? yearAdd - 2 : yearAdd;
		}else{
			yearAdd = yearAdd == 0 ? 8 : yearAdd;
			yearAdd = yearAdd == 1 ? 9 : yearAdd;
			yearAdd = yearAdd == 2 ? 0 : yearAdd;
		}
		
        year = yearAdd + 1972;
		
    }
	
	if(second == 'i' || second == 'I'){
		cleanData();
		return;
	}else{		
		month = Number(second.toLowerCase().charCodeAt())-96<9?Number(second.toLowerCase().charCodeAt())-96:Number(second.toLowerCase().charCodeAt())-97;
	}

    // 第四位：用来表示型号 id=model

    var fourth = text.substring(3, 4);
    switch (fourth) {
        case '0':
            model = 'SX-70 Original';
            break;
        case '1':
            model = 'SX-70 Original（Alpha 1）';
            break;
        case '2':
            model = 'SX-70 Alpha SE（Alpha 2、Model 2）';
            break;
        case '3':
            model = 'SX-70 Model 3';
            break;
        case '4':
            model = 'SX-70 Sonar';
            break;
    }
	
	// 解析序列号  第一位数字：用来表示快门类型 id=shutterType
	var first = text.substring(0, 1);
	
	switch (first) {
	    case '7':
	    case '8':
	        model = 'SLR 680';
	        break;
	    case '9':
	        model = 'SLR 690';
	        break;
	}

    // 第十位 第十一位：
    var tenth = text.substring(9, 10);
    var eleventh = text.substring(10, 11);
    var day = 0;
    switch (tenth) {
        case '0':
            day = 0;
            break;
        case '1':
            day = 4;
            break;
        case '2':
            day = 7;
            break;
        case '3':
            day = 10;
            break;
        case '4':
            day = 14;
            break;
        case '5':
            day = 17;
            break;
        case '6':
            day = 20;
            break;
        case '7':
            day = 24;
            break;
        case '8':
            day = 27;
            break;
        case '9':
            day = 30;
            break;
    }

    var day2 = Math.ceil(parseInt(eleventh) / 3);
    var day3 = day + day2;
    productionDate = year + '年' + month + '月' + day3 + '日';


    // 显示结果
    $('#shutterType').text(shutterType);
    $('#productionYear').text(productionYear);
    $('#model').text(model);
    $('#productionDate').text(productionDate);
});


function cleanData(){
	alert('输入内容有误，请重试')
	$('#serialNumber').val('')
}