
console.log (' admin JS 도착')
// 주문현황부터 출력
let selectedDate = '';
order_status_view(1, 0)

// 날짜 가져오기
function getSelectedDate(){
	selectedDate = document.querySelector('.dateInput').value;
	console.log('selectedDate : '+selectedDate)
	
	order_status_view(1, selectedDate)
}


// 주문현황 (전체, 개별) --------------------------------------------------------
	// 1. 전체 -------------------------------------------------------
function order_status_view(page, date){
	console.log (' 전체 주문현황 도착')
	
	$.ajax({
		url : "/subway/AdminController",
		method : "get",
		data : { type : 0 , listsize : 15, page : page, date : date } ,
		success : function f(r){
			console.log("통신성공 : "+r)
			
			document.querySelector('.menu_R_box').innerHTML=`
				<h2> 주문 현황 </h2>
				<input type="date" class="dateInput">
				<button class="getSelectedDate" onclick="getSelectedDate()">선택한 날짜 가져오기</button>
				<span class="printDate"> </span> <br/>
				<table class="orderTable"> </table>
				<div class="pagebox" ></div>
			`;
			
			let orderTable = document.querySelector('.orderTable');
			let HTML = `<tr>
							<th style="width: 12.5%;"> 주문번호 </th> 
							<th style="width: 20%;"> 주문일 </th> 
							<th style="width: 15%;"> 주문자 </th> 
							<th style="width: 20%;"> 전화번호 </th>
							<th style="width: 12.5%;"> 주문상태</th>
							<th style="width: 20%;"> 결제금액</th>
						</tr>`;
			r.orderlist.forEach( (o) => {
				let ostatus = '';
				if( o.ostatus == 0 ){
					ostatus = '주문중';
				} else if ( o.ostatus == 1 ){
					ostatus = '완료';
				} else if ( o.ostatus == 2 ){
					ostatus = '취소';
				}
				let ototalpaid = o.ototalpaid.toLocaleString('ko-KR')
				console.log(o)
				HTML += `
					<tr class="orderTd" onclick="order_status_view_details(${o.ono},${page},'${date}')">
						<td> ${o.ono} </td> 
						<td> ${o.odate} </td> 
						<td> ${o.mname} </td> 
						<td> ${o.phone} </td>
						<td> ${ostatus} </td>
						<td> ${ototalpaid}원 </td>
					</tr>
					`;
				
				}); // forEach end
			orderTable.innerHTML = HTML;
			
			
			// -------------- 페이징버튼 출력 --------------
			PageHTML = ``;
			PageHTML += `<button class="pagemove" onclick="order_status_view(${page <= 1 ? page : page-1}, '${date}')" type="button"> ◀ </button>`;
			for( let i = r.startbtn; i <= r.endbtn; i++ ){
				PageHTML += `<button onclick="order_status_view(${i},'${date}')" class="${page == i ? 'selectpage' : ''} nonselectpage" type="button"> ${i} </button>`;
			}
			PageHTML += `<button class="pagemove" onclick="order_status_view(${page >= r.totalpage ? page : page+1}, '${date}')" type="button"> ▶ </button>`;
			document.querySelector('.pagebox').innerHTML = PageHTML;
		}
	}) // ajax end
} // order_status_view end

	// 2. 개별 -------------------------------------------------------
function order_status_view_details(ono,page,date){
	console.log (' 개별 주문현황 도착')
	console.log("ono : "+ono)
	$.ajax({
		url : "/subway/AdminController",
		method : "get",
		data : { type : 1, ono : ono } ,
		success : function f(details_customs){
			console.log("통신성공 : ")
			console.log(details_customs)
			
			let r = details_customs.details;
			let c = details_customs.customs;
			
			console.log('c => ')
			console.log(c)
			
			console.log('r.address => ')
			console.log(r.address)
	
			
			let printostatus = '';
			if( r.ostatus == 0 ){
				printostatus = '주문중';
			} else if ( r.ostatus == 1 ){
				printostatus = '완료';
			} else if ( r.ostatus == 2 ){
				printostatus = '취소';
			}
			let ototalpaid = r.ototalpaid.toLocaleString('ko-KR')
			let menu_R_box = document.querySelector('.menu_R_box');
			let HTML = ` 
			<h2> 주문 상세 정보 </h2>
			<button class="gotoback" onclick="order_status_view(${page}, '${date}')" type="button"> ◀ 주문 현황 돌아가기 </button>
			<div class="orderDetailsBox"> <!-- 상세정보 -->
						<div class="orderNo">  주문 번호 : ${r.ono} </div>
						<div class="orderDetailsBottomBox">
							<div class="orderDetailsBottom Lbox" > <!-- 주문자 정보 구역 -->
								<h3> 주문자 및 주문 정보</h3>
								<h4> ${r.mname} </h4>
								<h4> ${r.phone} </h4> 
								<div> ${r.address} </div> <br/> <br/> <br/>
								<h4> 주문일 </h4> <div> ${r.odate} </div> 
								<h4> 주문 상태 </h4> <div> ${printostatus} </div>
								<h4> 총 결제액 </h4> <div> ${ototalpaid} </div>
							</div> 
							<div class="orderDetailsBottom Rbox"> <!-- 주문 내역 구역 -->
								<h3> 주문 내역 </h3>
								<div class="orderDetailsList">
									
								</div>
							</div> 
						</div>
					</div>
			`;
			menu_R_box.innerHTML = HTML;

			// 커스텀 내용 출력할때 
			let orderDetailsList = document.querySelector('.orderDetailsList');
			let HTML_D = ``;
			c.forEach ( (o) => {
				console.log('c = o')
				console.log(o)
				console.log('o.pname : '+o.pname)
				 // 값이 숫자로 들어있는거 글자로 바꿔 출력하기..
					let bread;  
					if( o.bread == 1){ bread = '화이트';} else if( o.bread == 2){ bread = '위트';} else if( o.bread == 3){ bread = '허니오트';} else if( o.bread == 4){ bread = '플랫브레드';} else { bread = '';}
					let cheese;
					if( o.cheese == 6){ cheese = '아메리칸치즈';} else if( o.cheese == 7){ cheese = '슈레드치즈';} else if( o.cheese == 8){ cheese = '모차렐라치즈';} else { cheese = '';}
					let toasting;
					if( o.toasting == 15){ toasting = 'O';} else { toasting = 'X';}
					let sauce; 
					if( o.sauce == 10){ sauce = '핫칠리소스';} else if( o.sauce == 12){ sauce = '랜치소스';} else if( o.sauce == 13){ sauce = '바베큐소스';} else if( o.sauce == 14){ sauce = '스위트어니언소스';} else { sauce = '';}
					
					
				HTML_D += `
				<div class="customPrint"> ● ${o.pname} </div>
				<div class="customListPrint"> ${bread} ${cheese} 토스팅${toasting} ${sauce}  </div>
				<div class="vegetablePrint customListPrint"> </div>
				`;
				// 커스텀 내역 중 야채들 배열에서 꺼내서 출력하기 
				if( o.vegetable != null ){
					let v = o.vegetable;
					console.log('veg : ')
					console.log(v)
					
					let cleanedArray = v.map(str => str.replace(/\[|\]/g, '')); // 대괄호 제거
					let veg = cleanedArray.map(Number); // 문자열을 숫자로 변환
					
					
					HTML_D_Veg = `야채제외 : `;
					let vegetable = '없음'; 
						for( let i = 0 ; i < o.vegetable.length; i++ ){
							if( veg[i] == 17 ){ vegetable = '피망'}
							else if( veg[i] == 18){ vegetable = '할라피뇨';}
							else if( veg[i] == 19){ vegetable = '올리브';}
							else if( veg[i] == 20){ vegetable = '피클';}
							else if( veg[i] == 21){ vegetable = '양파';}
						HTML_D_Veg += `${vegetable} `;
					}
				} else { HTML_D_Veg = '';}
			});
			orderDetailsList.innerHTML = HTML_D;
			document.querySelector('.vegetablePrint').innerHTML = HTML_D_Veg;
		}
	})
	
}

// 회원관리 -------------------------------------------------------
function member_management_view(page){
	console.log (' 회원관리 도착')
	
	$.ajax({
		url : "/subway/AdminControllerForMandB",
		method : "get",
		data : { type : 0 , listsize : 15, page : page} ,
		success : function f(r){
			console.log("회원관리 통신성공 : ")
			console.log(r)
			
			document.querySelector('.menu_R_box').innerHTML=`
				<h2> 회원 목록 </h2>
				<table class="memberTable"> </table>
				<div class="pagebox" ></div>
			`;
			
			let memberTable = document.querySelector('.memberTable');
			let HTML = `<tr>
							<th style="width: 8%;"> 회원번호 </th> 
							<th style="width: 10%;"> 회원아이디 </th> 
							<th style="width: 10%;"> 회원명 </th> 
							<th style="width: 6%;"> 성별 </th> 
							<th style="width: 12%;"> 휴대폰번호 </th>
							<th style="width: 10%;"> 생일 </th> 
							<th style="width: 27%;"> 주소 </th> 
							<th style="width: 9%;"> 마일리지 </th>
							<th style="width: 10%;">  </th>
						</tr>`;
			r.memberlist.forEach( (o) => {
				
				let omil = o.mil.toLocaleString('ko-KR')
				console.log(o)
				HTML += `
					<tr class="memberTd">
						<td style="widtd: 8%;"> ${o.mno} </td> 
						<td style="widtd: 10%;"> ${o.id} </td> 
						<td style="widtd: 10%;"> ${o.name} </td> 
						<td style="widtd: 6%;"> ${o.gender} </td> 
						<td style="widtd: 12%;"> ${o.phone} </td>
						<td style="widtd: 10%;"> ${o.birthdate} </td> 
						<td style="widtd: 27%;"> ${o.address} </td> 
						<td style="widtd: 9%;"> ${omil}원 </td>
						<td style="widtd: 10%;"> <button class="deleteMandBBtn" onclick="deleteMember(${o.mno},'${o.name}')"> 삭제 </button> </td>
					</tr>
					`;
				
				}); // forEach end
			memberTable.innerHTML = HTML;
			
			// -------------- 페이징버튼 출력 --------------
			PageHTML = ``;
			PageHTML += `<button class="pagemove" onclick="member_management_view(${page <= 1 ? page : page-1})" type="button"> ◀ </button>`;
			for( let i = r.startbtn; i <= r.endbtn; i++ ){
				PageHTML += `<button onclick="member_management_view(${i})" class="${page == i ? 'selectpage' : ''} nonselectpage" type="button"> ${i} </button>`;
			}
			PageHTML += `<button class="pagemove" onclick="member_management_view(${page >= r.totalpage ? page : page+1})" type="button"> ▶ </button>`;
			document.querySelector('.pagebox').innerHTML = PageHTML;
		}
	}) // ajax end
}
// 삭제 -------------------------------------------------------
function deleteMember(mno, name){
	console.log('삭제하려고 누른 회원 번호 : '+mno)

	let userConfirmed  = confirm('정말 해당 <'+name+'> 회원을 삭제 하시겠습니까?');
	if(userConfirmed){
		$.ajax({
			url : "/subway/MemberInfoController",
			method : "delete",
			data : { mno : mno } ,
			success : function f(r){
				console.log("통신성공 : "+r)
				if( r ){
					alert('회원이 삭제되었습니다.')
					member_management_view(1)
				} else {
					alert('회원 삭제를 실패했습니다.')
				}
			}
		})
	}
}
function deleteReview(bno){
	console.log('삭제하려고 누른 리뷰 번호 : '+bno)

	let userConfirmed  = confirm('정말 해당 <'+bno+'>번 리뷰를 삭제 하시겠습니까?');
	if(userConfirmed){
		$.ajax({
			url : "/subway/BoardController",
			method : "delete",
			data : { bno : bno } ,
			success : function f(r){
				console.log("통신성공 : "+r)
				if( r ){
					alert('리뷰가 삭제되었습니다.')
					review_management_view(1)
				} else {
					alert('리뷰 삭제를 실패했습니다.')
				}
			}
		})
	}
}
// 리뷰관리 -------------------------------------------------------
function review_management_view(page){
	console.log (' 리뷰관리 도착')
	
	$.ajax({
		url : "/subway/AdminControllerForMandB",
		method : "get",
		data : {type : 1 , listsize : 15, page : page} ,
		success : function f(r){
			console.log("통신성공 : "+r)
			document.querySelector('.menu_R_box').innerHTML=`
			<h2> 리뷰관리 </h2>
			<table class="boardTable"> </table>
			<div class="pagebox" ></div>
			`;
			let boardTable = document.querySelector('.boardTable');
			let HTML = `
			<tr>
				<th style="width: 8%;"> 리뷰번호 </th> 
				<th style="width: 15%;"> 작성자명 </th> 
				<th style="width: 17%;"> 제목 </th> 
				<th style="width: 20%;"> 상품명 </th> 
				<th style="width: 25%;"> 날짜 </th>
				<th style="width: 5%;"> 별점 </th>
				<th style="width: 10%;">  </th>
			</tr>`;
			r.boardlist.forEach( (o) => {
				console.log(o)
				HTML += `
					<tr class="boardTd">
						<td style="widtd: 8%;"> ${o.bno} </td> 
						<td style="widtd: 15%;"> ${o.id} </td> 
						<td style="widtd: 17%;"> ${o.btitle} </td> 
						<td style="widtd: 20%;"> ${o.pname} </td> 
						<td style="widtd: 25%;"> ${o.bdate} </td>
						<td style="widtd: 5%;"> ${o.stars} </td> 
						<td style="widtd: 10%;"> <button class="deleteMandBBtn" onclick="deleteReview(${o.bno})"> 삭제 </button> </td>
					</tr>
					`;
				}); // forEach end
			boardTable.innerHTML = HTML;
			// -------------- 페이징버튼 출력 --------------
			PageHTML = ``;
			PageHTML += `<button class="pagemove" onclick="review_management_view(${page <= 1 ? page : page-1})" type="button"> ◀ </button>`;
			for( let i = r.startbtn; i <= r.endbtn; i++ ){
				PageHTML += `<button onclick="review_management_view(${i})" class="${page == i ? 'selectpage' : ''} nonselectpage" type="button"> ${i} </button>`;
			}
			PageHTML += `<button class="pagemove" onclick="review_management_view(${page >= r.totalpage ? page : page+1})" type="button"> ▶ </button>`;
			document.querySelector('.pagebox').innerHTML = PageHTML;

		}
	})
	
}
