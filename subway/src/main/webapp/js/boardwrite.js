 
 let categoryNumber = sessionStorage.getItem('categoryNumber'); 
 
 
 console.log(categoryNumber)
 
 let title = document.querySelector('.write_title');
 
 if(categoryNumber == 0) { // 공지사항 (관리자)
	 console.log("1")
	 title.innerHTML = `공지사항 작성`;
 	
 }
 else if(categoryNumber == 1) { // 리뷰
	 console.log("2")
	 title.innerHTML = `리뷰 작성`;
	 let starSelect = document.querySelector('.starSelect');
	 starSelect.innerHTML = `
	 		별점 : <select class="stars">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						
					</select>
	 `;
	 
	 $.ajax({
		url : "/subway/ProductController" ,
		method : 'get' ,
		data : { type : 'productAll' } ,
		async: false,
		success: function(r){
			let html = '메뉴 선택 : <select class="menus">';
			let menuSelect = document.querySelector('.menuSelect');
			for(let i = 0 ; i < r.length; i++) {
				if(r[i].pname == 'none') continue; // 제품 샘플 데이타면 건너뛰기 
				html += `<option value="${r[i].pname}"> ${r[i].pname} </option>`;
			}
			menuSelect.innerHTML = html;
		},
		error: function(result){console.log('실패 ' + result)}
	});
	 
 }else{
	 console.log("3")
	 title.innerHTML = `QnA 작성`;
 } 
 
 
 
 /* --------------------- 게시물 작성 ---------------------------- */
 function boardPost(){
	 
	
	let btitlewrite = document.querySelector('.btitlewrite').value;
	let bcontentwrite = document.querySelector('.bcontentwrite').value;
	
	 
	if(categoryNumber == 1) {
		let stars = document.querySelector('.stars').value;
		let menus = document.querySelector('.menus').value;
		
		console.log('menus : ' + menus);
		$.ajax({
			url : "/subway/BoardController" ,
			method : 'post' ,
			data : { 'btitlewrite' : btitlewrite , 'bcontentwrite' : bcontentwrite, 'categoryNumber' : categoryNumber, 'stars' : stars, 'menus' : menus } ,
			success: function(result){ alert('게시물 작성완료되었습니다.'); 
				location.href="/subway/jsp/board.jsp";
			},
			error: function(result){console.log('실패 ' + result)}
		});
	}
	else {
		$.ajax({
		url : "/subway/BoardController" ,
		method : 'post' ,
		data : { 'btitlewrite' : btitlewrite , 'bcontentwrite' : bcontentwrite, 'categoryNumber' : categoryNumber, 'stars' : -1, 'menus' : null} ,
		success: function(result){ alert('게시물 작성완료되었습니다.');
		location.href="/subway/jsp/board.jsp"; },
		error: function(result){console.log('실패 ' + result)}
		})
		
	}
	
	
}
 