
let pno = new URL( location.href ).searchParams.get("pno")
let cateno;
console.log('pno : ' + pno)


/*
	1. 아이템 페이지에서 선택된 제품의 이미지와 제품명 전달 받아서 innerHTML출력하기
	2. 주문하기 버튼 누르면 옵션 모두 선택된 내용 객체에 저장후 주문내역 배열에 저장하고 세션에 저장
	
	★ 카테고리 넘버 1: 샌드위치 / 2: 랩 / 3: 샐러드
 */

 // -------------------------출력--------------------------------------------------
 // -------------------------출력--------------------------------------------------
 
 // 받아온 데이터(제품이미지, 제품명) 출력하기
 itemPrint()
 function itemPrint(){ //f s
 	console.log('itemPrint')
 	$.ajax({
		url : "/subway/ProductController" ,
		method : "get",
		data : { type:"productInfo" , pno : pno } ,
		success:r=>{ 
			console.log('success');
			console.log(r);
			//어디
			 let productinfo = document.querySelector('.productinfo')
			 //무엇
			 let html = `<div class="productImgBox"><img class="productImg" src="/subway/img/${r.pimg}"/></div>
						 <div class="productNameBox"><h3 class="productName"> ${r.pname} </h3></div>
						 <div class="productNameEnglishBox"><p class="productEnglish"> ${r.pname_e} / ${r.pprice.toLocaleString()}원 </p></div>

						 `
			 //대입
			 productinfo.innerHTML = html 
			 cateno = r.cateno;
			 optionPrint(r.cateno)
		},
		error: function(result){console.log('실패 ' + result)}
	})
	 
 } //f e
 
 //커스텀 옵션과 주문하기 버튼 출력하기
 function optionPrint(categoryNo){ //f s
	 //어디
	 let customBox = document.querySelector('.customBox')
	 let ccnoList = []
	 let html = '';
	 if(categoryNo == 1) {
		ccnoList.push(1); ccnoList.push(2); ccnoList.push(3); ccnoList.push(4); ccnoList.push(5); 
	 }
	 else if(categoryNo == 3) {
		 ccnoList.push(2); ccnoList.push(3); ccnoList.push(5); 
	 }
	 
	 //무엇
	 $.ajax({
		url : "/subway/CustomController" ,
		method : "get",
		data : { ccnoList : JSON.stringify(ccnoList) } ,
		success:r=>{ 
			console.log('success');
			
			let cnt = 0;
			for(let i = 0 ; i < r.length; i++) {
				
				if(cnt != r[i].ccno) {
					
					switch(r[i].ccno) {
						case 1 : 
							html+=`
								<div class="customBread customlist"> <!-- 커스텀 : 빵 -->
									<div> <img src="../img/빵.PNG"/> </div>
									<div><h3> 빵 </h3></div>
									<div> <!-- 빵 옵션 -->
							`;
							break;
						case 2 :
							if(r[i].ccno == 1) {
								html+= `</div></div>`
							}
							html+=`
								</div></div>
								<div class="customCheese customlist"> <!-- 커스텀 : 치즈 -->
									<div> <img src="../img/치즈.PNG"/> </div>
									<div><h3> 치즈 </h3></div>
									<div> <!-- 치즈 옵션 --> 
							`;
							break;
						case 3 :
							html+=`
								</div></div>
								<div class="customSauce customlist"> <!-- 커스텀 : 소스 -->
									<div> <img src="../img/소스.PNG"/> </div>
									<div><h3> 소스 </h3></div>
									<div> <!-- 소스 옵션 --> 
								
							`;
							break;
						case 4 : 
							html+=`
								</div></div>
								<div class="customToasting customlist"> <!-- 커스텀 : 토스팅 -->
									<div> <img src="../img/토스팅.PNG"/> </div>
									<div><h3> 토스팅 </h3></div>
									<div> <!-- 토스팅 옵션 true, false --> 
								
								
							`;
							break;
						case 5 : 
							html+=`
								</div></div>
								<div class="customVegetable customlist"> <!-- 커스텀 : 야채제외 -->
									<div> <img src="../img/야채.PNG"/> </div>
									<div><h3> 야채제외 </h3></div>
									<div> <!-- 야채제외 옵션 --> 
							`;
							break;
					} 
					cnt = r[i].ccno;
				}
				switch(r[i].ccno) {
					case 1 : 
						if(r[i].ccname == 'x') break;
						html += `
							<input style='zoom:1.7;' type ="radio" class="breadOption" name="bread" value="${r[i].customitemno}"> 
							${r[i].ccname}
						`;
						break;
					case 2 :
						html += `
							<input style='zoom:1.7;' type ="radio" class="cheeseOption" name="cheese" value="${r[i].customitemno}"> 
							${r[i].ccname}
						`;
						break;
					case 3 :
						html += `
							<input style='zoom:1.7;' type ="radio" class="sauceOption" name="sauce" value="${r[i].customitemno}"> 
							${r[i].ccname}

						`;
						break;
					case 4 : 
						html += `
							<input style='zoom:1.7;' type ="radio" class="toastingOption" name="toasting" value="${r[i].customitemno}"> 
							${r[i].ccname}
						`;
						break;
					case 5 : 
						if(r[i].ccname == 'x') {
							
						}else {
							html += `
								<input style='zoom:1.7;' type ="checkbox" class="vegetableOption" onchange="선택이벤트()" name="vegetable" value="${r[i].customitemno}"> 
								${r[i].ccname}
							`;
						}
						break;
				}
			}
			html += `</div></div>`;
			customBox.innerHTML = html;
		},
		error: function(result){console.log(result)}
	})
	 
	 // 버튼 출력하기
	 let orderBtnBox = document.querySelector('.orderBtnBox')
	 orderBtnBox.innerHTML = `<button onclick="order()" class="orderBtn"> 장바구니 담기 </button>`;
	 
 }//f e
 
 
 
 function 제외이벤트(){
    
    let vegetableInputs = [];
    vegetableInputs = document.querySelectorAll('input[name="vegetable"]:checked');
    // 제외 안함이 체크 되면 다른 체크박스 체크 지우기
    for( let i = 0 ; i<vegetableInputs.length; i++ ){
        if( vegetableInputs[i].value == '제외 안 함' ){
           for( let j = 0 ; j<vegetableInputs.length; j++ ){ 
              vegetableInputs[j].checked = false;
           }
           console.log( vegetableInputs )
           vegetableInputs[i].checked = true;
           break;
        }
    }
 }
 function 선택이벤트(){
	let vegetableInputs = [];
    vegetableInputs = document.querySelectorAll('input[name="vegetable"]:checked');
	// 제외 안함이 체크되어 있는데 다른 항목에 체크되면 제외 안함 체크 풀기
    for( let i = 0 ; i<vegetableInputs.length; i++ ){
        if( vegetableInputs[i].value == '피망' || 
        	vegetableInputs[i].value == '할라피뇨' || 
        	vegetableInputs[i].value == '올리브' || 
        	vegetableInputs[i].value == '피클' || 
        	vegetableInputs[i].value == '양파' ){
           for( let j = 0 ; j<vegetableInputs.length; j++ ){ 
			   if(vegetableInputs[j].value == '제외 안 함')
              vegetableInputs[j].checked = false;
           }
           console.log( vegetableInputs )
           vegetableInputs[i].checked = true;
           break;
        }
    }
 }
 
 
 
 
 // -------------------------주문하기--------------------------------------------------
 // -------------------------주문하기--------------------------------------------------
 // orderList = 주문내역 객체가 들어가는 주문리스트 배열명
 // 속성명 종류 ( ono, name, phone, date, status, category, product, bread, cheese, toasting, vegetable, sauce, pay )
 orderList = []
 function order(){ // f s
 	 console.log("order");
 	 // 세션에 있는 값 배열에 넣어놓고 그 이후에 받는 입력값을 저장해서 누적시키기
	 orderList = JSON.parse(sessionStorage.getItem('orderList'))
	 if ( orderList == null ) { orderList = [] }
	 
	 //저장할 주문 정보들 선언하기, 만약에 넣을 값이 없다면 공백으로 저장하기
	 let bread = '23';
	 if(cateno == 1){bread = document.querySelector('input[name="bread"]:checked').value;} 
	 console.log ("bread : " + bread)
	 let cheese = '23';
	 if(cateno == 1 || cateno == 3) {cheese = document.querySelector('input[name="cheese"]:checked').value;}
	 console.log (cheese)
	 let toasting = '23';
	 if(cateno == 1) 					{toasting = document.querySelector('input[name="toasting"]:checked').value;}
	 console.log (toasting)
	 
	 let vegetable = [];
     let vegetableInputs = [];
     if(cateno == 1 || cateno == 3) {vegetableInputs = document.querySelectorAll('input[name="vegetable"]:checked')}
     console.log (vegetableInputs)
    
     for( let i = 0 ; i<vegetableInputs.length; i++ ){
        if( vegetableInputs[i].value == '제외 안 함' ){
           vegetable.splice( 0 ); // 배열 초기화
           break;
        }
        vegetable.push ( vegetableInputs[i].value )
     }
     console.log (vegetable)
	
	 let sauce = '23';
	 if(cateno == 1 || cateno == 3) {sauce = document.querySelector('input[name="sauce"]:checked').value;}
	 console.log (sauce)
	 

	 // 주문 객체 만들기
	 let order = { pno : pno, bread: bread, cheese: cheese, toasting: toasting, 
	 				vegetable: vegetable, sauce: sauce  }
	 // 주문을 주문리스트배열에 푸쉬 및 세션에 올리기
	 orderList.push(order); console.log (order);
	 sessionStorage.setItem('orderList', JSON.stringify(orderList));
	 
	 // 다시 메뉴 고르는 곳으로
	 location.href="/subway/jsp/introducemenu.jsp";
 }// f e
 