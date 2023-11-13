// 카테고리 리스트
let categoryList = [ '공지사항', '한줄 리뷰', '문의사항'];
let categoryImgList = [ 'subways_notice.png', 'subways_review.png', 'subways_qna.png'];

// 리뷰 리스트 가져오기
let categoryNumber = sessionStorage.getItem('categoryNumber'); 
if(categoryNumber == null) {
	categoryNumber = 0;
	sessionStorage.setItem('categoryNumber', categoryNumber ); // 저장
}






categoryPrint(categoryNumber); // 최초 1번 실행 [ 가장 앞에 있는 카테고리 선택 가정]
tablePrint(categoryNumber);
 function categoryPrint(selectNo) {
	
	 console.log('categoryPrint')
	 // 1. 어디에
	 let board_category = document.querySelector('.board_category');
	 // 2. 무엇을
	 let html = '';
	 	// HTML 구성 : 배열 내 데이터(for)를 li 형식으로 출력
	 for(let i = 0; i < categoryList.length; i++) {
		 if(i == selectNo) {  html+=`<li onclick="categorySelect( ${ i })" class="categoryselect"> ${categoryList[i]} </li>`
		}
		 else{ 
			 
			 html+=`<li onclick="categorySelect( ${ i })"> ${categoryList[i]} </li>` 
		}
	 }
	 
	 board_category.innerHTML = html;
 }
 
 
 // 3. 카테고리 클릭 함수 [ 실행조건 : . li에서 클릭했을때 ]
 function categorySelect(selectNo) {
	 categoryNumber = selectNo;
	 sessionStorage.setItem("categoryNumber", categoryNumber ); // 저장
	 console.log('categorySelect')
	 // <li> 여러개 존재 하는데 무엇 선택했는지 식별
	 console.log(selectNo);
	 // 0. 카테고리의 모든 li 호출
	 let categoryli = document.querySelectorAll('.board_category li'); // 해당 클래스 ul안에 있는 모든 li 호출
	 	console.log(categoryli);
	 // 1. 해당 선택된 인덱스의 class 추가 // !!! JS에서 class 추가 / 삭제 가능
	 for(let i = 0 ; i < categoryList.length; i++) {
		 // 2. 선택된 인덱스[selectNo]의 i번째 카테고리 찾기
		 if( selectNo == i ) {
			 // 해당 li에 class 추가	DOM객체명.classList.add('새로운클래스명')
			 categoryli[i].classList.add('categoryselect');
		 }else{
			 // 해당 li에 class 삭제 DOM객체명.classList.remove('새로운클래스명')
			 categoryli[i].classList.remove('categoryselect');
		 }
	 }
	 //categoryPrint(selectNo);
	 console.log("----" + selectNo);
	 // 3.
	 tablePrint(selectNo);
 }
 
 // 테이블 출력 함수
 function tablePrint(selectNo) {
	console.log('selectNo : ' + selectNo)
	let board_title = document.querySelector('.board_title');
	board_title.src =`/subway/img/${categoryImgList[selectNo]}`;
 	// src="/subway/img/green-check.png
 	
 	$.ajax({
		url : "/subway/BoardController" ,
		method : 'get' ,
		data : { 'selectNo' : selectNo, 'resultType' : 'tablePrint' } ,
		success: function(result){ 
			let board_list =  document.querySelector('.board_list');
 			let html = ``;
 			
 			if(selectNo == 0 || selectNo == 2) {
				 
				 html += `
				 		<tr> 
		                  	<th style="width: 12.5%;" class="no"> 번호 </th>
		                    <th style="width: 17.5%;" class="name"> 작성자 </th>
		                    <th style="width: 40%;" class="title"> 제목 </th>
		                	<th style="width: 12.5%;" class="hits"> 조회수 </th>
		               		<th style="width: 17.5%;" class="time"> 날짜 </th>
		              	</tr>
				 `;
				 
				 for(let i = 0; i < result.length; i++) {
					html += `
						<tr>
			                <td style="width: 12.5%;" class="no"> ${result[i].bno}  </td>
			                <td style="width: 17.5%;" class="name"> ${result[i].id} </td>
			                <th style="width: 40%;" onclick="boardDetailsChange(${result[i].bno})" class="title"> ${result[i].btitle} </a> </th>
			            	<td style="width: 12.5%;" class="hits"> ${result[i].hits} </td> 
			           		<td style="width: 17.5%;" class="time"> ${result[i].bdate} </td>                
		               	</tr>`;
				 }
				
			}
			else if(selectNo == 1) {
				
				html += ` <tr> 
		                  <th style="width: 7.5%;" class="no"> 번호 </th>
		                  <th style="width: 17.5%;" class="name"> 작성자 </th>
		                  <th style="width: 15%;" class="menu"> 상품명 </th>
		                  <th style="width: 20%;" class="title"> 제목 </th>
		                  <th style="width: 12.5%;" class="star"> 별점 </th>
		                  <td style="width: 12.5%;" class="hits"> 조회수 </td> 
		                  <th style="width: 15%;" class="time"> 날짜 </th>
		               </tr>`;
		               
		        for(let i = 0; i < result.length; i++) {
					
					let num = result[i].stars;
					let sum = '';
					for(let i = 0; i < Math.floor(num); i++) {
						sum+='★';
					}
					let num2 = (num-Math.floor(num))*10;
					if(num2 > 4) {
						sum+='☆';
					}
					
					html +=	` <tr>
		                  <td style="width: 7.5%;" class="no"> ${result[i].bno} </td>
		                  <td style="width: 17.5%;" class="name"> ${result[i].id} </td>
		                  <th style="width: 15%;" class="menu"> ${result[i].pname} </th>
		                  <td style="width: 20%;" onclick="boardDetailsChange(${result[i].bno})" class="title">${result[i].btitle} </td>
		                  <td style="width: 12.5%;" class="star"> ${sum} ( ${num} / 5) </td> 
		                  <td style="width: 12.5%;" class="hits"> ${result[i].hits} </td> 
		                  <td style="width: 15%;" class="time">  ${result[i].bdate} </td>                
		               </tr>
		               `
				}       
			}
			board_list.innerHTML = html;
 			

		} // success end
	});
 	
 	
 	
 	
	//else if(selectNo)
 }
 
 // 로그인 확인 함수 
 function loginCheck() {
	 
	 $.ajax({
		url : "/subway/BoardController" ,
		method : 'get' ,
		data : { 'resultType' : 'loginCheck' } ,
		success: function(result){ 
			
			if(result == "true"){
				location.href='boardwrite.jsp'
			}
			else {
				alert("로그인을 먼저 해주시길 바랍니다.")
			}
		}
	});
 }
 
 function boardDetailsChange(bno) {
	 console.log('boardDetailsChange')
	 //request.getSession().setAttribute( "bno", bno ); 
	 localStorage.setItem('bno', bno);
	 
	 
	 
	 location.href='boarddetails.jsp';
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 