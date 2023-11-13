
console.log('introducemenu');

$.ajax({
	url : "/subway/MemberInfoController" ,
	method : 'get' ,
	async : false,
	data : { } ,
	success: function(result){ 
		
		console.log(result);
		
		if(result == '') {
			alert('로그인을 먼저 해주시길 바랍니다.')
			location.href = "/subway/jsp/join.jsp";
		}
	},
	error: function(result){console.log('실패 ' + result)}
});


// 카테고리 리스트
let categoryList = [ '샌드위치', '랩', '샐러드'];
let categoryDetailsList = {샌드위치 : ['All', '클래식', '프리미엄'],랩 : ['All', '시그니처 랩', '클래식 랩'],
샐러드 :  ['All', '클래식', '프리미엄'] }; 
let cateno = 0;
let category = 0;
let totalPrice = 0;
let orderList =  JSON.parse(sessionStorage.getItem('orderList'));
if(orderList == null) orderList = []
categoryPrint(0);
cartPrint();
//productPrint(0);

 function categoryPrint(selectNo) {
	 console.log('categoryPrint')
	 // 1. 어디에
	 let midUl = document.querySelector('.midUl');
	 // 2. 무엇을
	 let html = '';
	 	// HTML 구성 : 배열 내 데이터(for)를 li 형식으로 출력
	 for(let i = 0; i < categoryList.length; i++) {
		 if(i == selectNo) {  html+=`<li onclick="categorySelect( ${ i })" class="categoryselect"> ${categoryList[i]}  </li>`
			categoryDetailsPrint(categoryList[i]);
		}
		 else{ 
			 
			 html+=`<li onclick="categorySelect( ${ i })"> ${categoryList[i]}  </li>` 
		}
	 }
	 console.log('html : ' + html);
	 midUl.innerHTML = html;
 }
  function categoryDetailsPrint(selectName) {
	 console.log('categoryPrint')
	 
	 // 1. 어디에
	 let menuUl = document.querySelector('.menuUl');
	 // 2. 무엇을
	 let html = '';
	 	// HTML 구성 : 배열 내 데이터(for)를 li 형식으로 출력
	 for(let i = 0; i < categoryDetailsList[selectName].length; i++) {
		 if(i == 0) {
		  html+=`<li onclick="categoryDetailsSelect( ${ i })" class="categorydetailsselect"> ${categoryDetailsList[selectName][i]}  </li>`
		}
		 else{ 
			 
			 html+=`<li onclick="categoryDetailsSelect( ${ i })"> ${categoryDetailsList[selectName][i]}  </li>` 
		}
	 }
	 // 3. 넣는다
	 menuUl.innerHTML = html;
	 categoryDetailsSelect(0)
 }
 
 

 // 3. 카테고리 클릭 함수 [ 실행조건 : . li에서 클릭했을때 ]
 function categorySelect(selectNo) {
	 cateno = selectNo;
	 console.log('categorySelect')
	 // <li> 여러개 존재 하는데 무엇 선택했는지 식별
	 console.log(selectNo);
	 // 0. 카테고리의 모든 li 호출
	 let categoryli = document.querySelectorAll('.midUl li'); // 해당 클래스 ul안에 있는 모든 li 호출
	 	console.log(categoryli);
	 // 1. 해당 선택된 인덱스의 class 추가 // !!! JS에서 class 추가 / 삭제 가능
	 for(let i = 0 ; i < categoryList.length; i++) {
		 // 2. 선택된 인덱스[selectNo]의 i번째 카테고리 찾기
		 if( selectNo == i ) {
			 // 해당 li에 class 추가	DOM객체명.classList.add('새로운클래스명')
			 categoryli[i].classList.add('categoryselect');
			 categoryDetailsPrint(categoryList[i]);
		 }else{
			 // 해당 li에 class 삭제 DOM객체명.classList.remove('새로운클래스명')
			 categoryli[i].classList.remove('categoryselect');
		 }
	 }
	 
	 let intro_top = document.querySelector('.intro_top');
	 let top_h1 = document.querySelector('.top_h1');
	 let top_p = document.querySelector('.top_p');
	 if(selectNo == 0) {
		 intro_top.style.backgroundImage = "url(/subway/img/menu_h_img01.jpg)";
		 top_h1.innerHTML = 'Sandwich';
		 top_p.innerHTML = '전세계 넘버원 브랜드 Subway! <br> 50년 전통의 세계 최고의 샌드위치를 맛보세요!';
	 }else if(selectNo == 1) {
		 intro_top.style.backgroundImage = "url('')";
		 intro_top.style.backgroundColor = '#85C441';
		 top_h1.innerHTML = 'Wrap';
		 top_p.innerHTML = 'Subway를 더 맛있고 간편하게 즐기는 방법 <br> 최상의 레시피로 만들어진 써브웨이 랩 시리즈, 이젠 고민하지 마세요!';
		 
	 }else {
		 intro_top.style.backgroundImage = "url('')";
		 intro_top.style.backgroundColor = '#0B9132';
		 top_h1.innerHTML = 'Salad';
		 top_p.innerHTML = '양은 더 많이! 칼로리는 더 적게! <br> 신선한 야채와 다양한 소스로 가볍게 샐러드를 즐겨보세요!';
	 }
	 
	 
	 
	 //categoryPrint(selectNo);
	 console.log("----" + selectNo);
	 // 3.
	 
	
 }
 // ---------------------------------- //
 
 function categoryDetailsSelect(detailNo) {
	 console.log('categoryDetailsSelect')
	 category = detailNo;
	 // 0. 카테고리의 모든 li 호출
	 let categorydetailsli = document.querySelectorAll('.menuUl li'); // 해당 클래스 ul안에 있는 모든 li 호출

	 // 1. 해당 선택된 인덱스의 class 추가 // !!! JS에서 class 추가 / 삭제 가능
	 for(let i = 0 ; i < categoryDetailsList.샌드위치.length; i++) {
		 // 2. 선택된 인덱스[selectNo]의 i번째 카테고리 찾기
		 if( detailNo == i ) {
			 // 해당 li에 class 추가	DOM객체명.classList.add('새로운클래스명')
			 categorydetailsli[i].classList.add('categorydetailsselect');
		 }else{
			 // 해당 li에 class 삭제 DOM객체명.classList.remove('새로운클래스명')
			 categorydetailsli[i].classList.remove('categorydetailsselect');
		 }
	 }
	 
	 productPrint();
 }
 

 // 4. 제품 출력 함수 [ 실행 조건 : 1. 카테고리 클릭(변경)하면 ]
 function productPrint() { // 어떤 카테고리의 제품 출력할껀지 인수 판단
	 // 1. 어디에
	 let products = document.querySelector('.products')
	 // 2. 무엇을 [ 선택된 카테고리에 맞는 제품들만 출력 ]
	 let html = ``;
	
	console.log(cateno+1);
	console.log('category' + category);
	$.ajax({
		url : "/subway/ProductController" ,
		method : 'get' ,
		async : false,
		data : { 'cateno' : (cateno+1) , 'category' : category, 'type' : 'productPrint'} ,
		success: function(result){ 
			// html 구성 : 
		 	for(let i = 0; i < result.length; i++) { 
				html+=`
				<div class="product">
					<img onclick="changePage(${result[i].pno})" src="/subway/img/${result[i].pimg}">
					<h3>${result[i].pname}</h3>
					<p>${result[i].pname_e}</p>
					<p>${result[i].pprice.toLocaleString()}원</p>
				</div>`;
				
			}
			 // 3. 출력[대입]
		 	 products.innerHTML = html;
		},
		error: function(result){console.log('실패 ' + result)}
	});
	 
 }
 
 // 주문페이지로 넘어가기 전 유효성 검사
 function changePage(pno) {
	 
	 location.href=`/subway/jsp/order.jsp?pno=${ pno }`;
 }
 
 

function cartPrint(){ // 인수 판단 : 모든 카트 내 제품 출력
	console.log('cartPrint')
	let cartbottom = document.querySelector('.cartbottom')
	let html = '';
	totalPrice = 0;
	
	let pnoList = []
	for(let i = 0; i < orderList.length; i++) {
		pnoList.push(orderList[i].pno)
	}

	console.log('pnoList : ' + pnoList)
	
	$.ajax({
		url : "/subway/ProductController" ,
		method : 'get' ,
		async:false,
		data : { pnoList : JSON.stringify(pnoList), type : 'productsInfo'} ,
		success: function(r){ 
			let cnt = 0;
			console.log('success')
			console.log(r)
			// html 구성 : 
		 	r.forEach(re => {
				html += `<div class="citem">
						<div class="iname"> ${re.pname} </div> 
						<div class="iprice"> ${re.pprice.toLocaleString()}원 </div> 
						<span onclick="productCancel(${cnt++})" class="icencel"> x </span>
					 </div>`;
				totalPrice += re.pprice;
				
			 }) 
				
			
			
		},
		error: function(result){console.log(result)}
	});
		
	 // 3. 출력[대입]
	 cartbottom.innerHTML = html;
	 console.log('html : ' + html)
	 // + 카트내 제품 수 출력 [ 제품수 : 배열길이]
	document.querySelector('.ccount').innerHTML = `${orderList.length}`
	// + 카트내 제품 총가격 출력 [총가격 : 배열내 버거요소의 가격을 모두 더한 값]
	document.querySelector('.ctotal').innerHTML = `${totalPrice.toLocaleString()}원`
	
	// ***** 만약에 카트내 제품이 많아서 스크롤이 생성 되었을때 자동으로 가장 오른쪽으로 이동하기
	cartbottom.scrollLeft = 10000; // 임의값 높은거 썻음 !
	
}


//7. 장바구니 내 버거들의 부분 취소 함수 --------------------------------------------------------------------
// 실행조건 : 장바구니 내 버거 박스의 X를 클릭 했을때 
function productCancel(cartIndex){
	orderList.splice(cartIndex , 1);
	alert ('장바구니에서 삭제되었습니다.')
	cartPrint();
	sessionStorage.setItem('orderList', JSON.stringify(orderList))
}


//8. 장바구니 내 전체 취소 함수 --------------------------------------------------------------------
// 실행조건 : 취소하기 버튼을 클릭 했을때
function cartCancel(){
	orderList.splice ( 0 ); // 배열내 모든 요소 삭제하기
	alert ('장바구니를 모두 비웠습니다.')
	sessionStorage.setItem('orderList', JSON.stringify(orderList))
	cartPrint();
}

//주문 데이터 구조화 설계


//9. 주문하기 버튼 함수 --------------------------------------------------------------------
// 실행조건 : 주문하기 버튼을 클릭 했을때
function productOrder(){
	
	$.ajax({
		url : "/subway/OrderController" ,
		method : 'post',
		data : { totalPrice : totalPrice, type : "order"} ,
		success: function(r){
			console.log('productOrder Success'); 
			order_details(r);
		},
		error: function(result){console.log(result)}
	});
	
}

function order_details(ono) {
	
	console.log(JSON.stringify(JSON.parse(sessionStorage.getItem("orderList"))));
	
	$.ajax({
		url : "/subway/OrderController" ,
		method : 'post',
		data : { ono : ono, orderList : sessionStorage.getItem("orderList"), type : "order_details" } ,
		success: function(r){
			alert("주문이 완료되었습니다.");
			orderList = '';
			sessionStorage.setItem("orderList", orderList);
			location.href="/subway/jsp/main.jsp";
		},
		error: function(result){console.log(result)}
	});
	orderList
}




 
 
 