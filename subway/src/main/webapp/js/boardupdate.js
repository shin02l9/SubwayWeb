boardDetilsPrint();

// 읽기 
function boardDetilsPrint() {
	


	let categoryNumber = 0;
	categoryNumber = sessionStorage.getItem('categoryNumber'); 
	let bno = 0;
	bno = localStorage.getItem('bno');
	
 	$.ajax({
		url : "/subway/BoardController" ,
		method : 'get' ,
		data : {'bno' : bno, 'selectNo' : categoryNumber+1, 'resultType' : 'boardDetilsPrint' } ,
		success: function(result){ 
			
			let btitle = document.querySelector('.btitle');
			let bno = document.querySelector('.bno');
			let id = document.querySelector('.id');
			let bdate = document.querySelector('.bdate');
			let bcontent = document.querySelector('.bcontent');
			let menuSelect = document.querySelector('.menuSelect');
			let starSelect = document.querySelector('.starSelect');
			
			
			// 관리자 and Qna / 리뷰인지에 따라 보여주는 화면이 다름
			if(categoryNumber == 0 || categoryNumber == 2) {
				 
				 btitle.value = `${result.btitle}`;
				 bno.innerHTML = `게시물 번호 : ${result.bno}`;
				 id.innerHTML = `아이디 : ${result.id}`;
				 bdate.innerHTML = `작성일 : ${result.bdate}`;
				 bcontent.innerHTML = `${result.bcontent}`;
				
			}
			
			else if(categoryNumber == 1) {
				
				let num = result.stars;
					let sum = '';
					for(let i = 0; i < Math.floor(num); i++) {
						sum+='★';
					}
				
				btitle.value = `${result.btitle}`;
				bno.innerHTML = `게시물 번호 : ${result.bno}`;
				id.innerHTML = `아이디 : ${result.id}`;
				bdate.innerHTML = `작성일 : ${result.bdate}`;
				bcontent.innerHTML = `${result.bcontent}`;
				menuSelect.innerHTML = `
					메뉴 선택 : <select class="menus">
							<option> 에그마요 샌드위치 </option>
							<option> 참치 샌드위치 </option>
							<option> 햄 샌드위치 </option>
							<option> 쉬림프 샌드위치 </option>
							<option> 바비큐 샌드위치 </option>
							<option> 치킨데리야끼 샌드위치 </option>
							<option> 스테이크&치즈아보카도 랩 </option>
							<option> 쉬림프 에그마요 랩 </option>
							<option> 치킨 베이컨 미니 랩 </option>
							<option> 이탈리안 비엠티 샐러드 </option>
							<option> 비엘티 샐러드 </option>
							<option> 햄 샐러드 </option>
							<option> 풀드포크바비큐 샐러드 </option>
							<option> 스파이시 이탈리안 샐러드 </option>
							<option selected>${result.pname}  </option>
						</select>
				`;
				starSelect.innerHTML = `
			 		별점 : <select class="stars">
								<option>1</option>
								<option selected>${num}</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								
						</select>
	 			`;    
		      
			}
			
		} // success end
	})
}

// 수정 
function boardUpdate() {
	
	let categoryNumber = 0;
	categoryNumber = sessionStorage.getItem('categoryNumber'); 
	let bno = 0;
	bno = localStorage.getItem('bno');
	
	
	let btitle = document.querySelector('.btitle').value;
	let bcontent = document.querySelector('.bcontent').value;
	
	let pname;
	let star;
   	
   	if(categoryNumber != 1){ // 리뷰 페이지가 아니면 기본 설정으로 변경
		pname = 'none';
		star = -1;	   
	}else{
		pname = document.querySelector('.menus').value;
		star = document.querySelector('.stars').value;
	}
   	
   	
    $.ajax({
      url : "/subway/BoardController",
      method : "put",
      data : {'bcontent' : bcontent, 'bno': bno, 'star' : star, 'pname' : pname, 'btitle' : btitle} ,
      success : function f(r){ 
		if(r == true) {
			  alert('수정이 완료되었습니다');
			  location.href="/subway/jsp/board.jsp";
		}
		  else console.log('수정 실패')
	  },
      error : function f(r){ console.log('boardUpdate 오류'+r)}
   })
}

