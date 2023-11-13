boardDetilsPrint();
commentPrint();

// 읽기 
function boardDetilsPrint() {
	
	let bno = 0;
	bno = localStorage.getItem('bno');
	let categoryNumber = 0;
	categoryNumber = sessionStorage.getItem('categoryNumber'); 
	
	
 	$.ajax({
		url : "/subway/BoardController" ,
		method : 'get' ,
		data : {'bno' : bno, 'selectNo' : categoryNumber+1, 'resultType' : 'boardDetilsPrint' } ,
		success: function(result){ 
			 
			let btitle = document.querySelector('.btitle');			// 제목
			let bno = document.querySelector('.bno');				// 게시물 식별번호
			let id = document.querySelector('.id');					// 작성자 아이디
			let bdate = document.querySelector('.bdate');			// 작성일
			let bcontent = document.querySelector('.bcontent');		// 내용
			let hits = document.querySelector('.hits');				// 조회수
			let pname = document.querySelector('.pname');			// 제품명
			let stars = document.querySelector('.stars');			// 별점
			
			if(categoryNumber == 0 || categoryNumber == 2) { // 0 : 관리자, 2 : QnA
				 
				 btitle.innerHTML = `<span> 제목 : </span> ${result.btitle}`;
				 bno.innerHTML = `<span> 게시물 번호 : </span>${result.bno}`;
				 id.innerHTML = `<span> 아이디 : </span>${result.id}`;
				 bdate.innerHTML = `<span> 작성일 : </span>${result.bdate}`;
				 bcontent.innerHTML = `<span> 내용 : </span>${result.bcontent}`;
				 hits.innerHTML = `<span> 조회수 : </span>${result.hits}`;
				
				
			}
			else if(categoryNumber == 1) { // 1 : 리뷰
				// 별점 구하기
				let num = result.stars;
					let sum = '';
					for(let i = 0; i < Math.floor(num); i++) {
						sum+='★';
					}
					let num2 = (num-Math.floor(num))*10;
					if(num2 > 4) {
						sum+='☆';
					}
				
				btitle.innerHTML = `<span>제목 :</span>  ${result.btitle}`;
				bno.innerHTML = `<span>게시물 번호 :</span> ${result.bno}`;
				id.innerHTML = `<span>아이디 :</span> ${result.id}`;
				bdate.innerHTML = `<span>작성일 :</span> ${result.bdate}`;
				bcontent.innerHTML = `<span>내용 :</span> ${result.bcontent}`;
				hits.innerHTML = `<span>조회수 :</span> ${result.hits}`;
				pname.innerHTML = `<span>제품 : </span>${result.pname}`;
		        stars.innerHTML = `<span>별점 :</span> ${sum} ( ${num} / 5)`;         
		      
			}
			
			if(result.ishost) {
				let btn_group = document.querySelector('.btn-group');
				btn_group.innerHTML = `
					 <button class="btn btn-update" onclick="boardUpdate()">게시물 수정</button>
		       		 <button class="btn btn-delete" onclick="boardDelete()">게시물 삭제</button>
				`;
			}
		} // success end
	})
}

// 수정 
function boardUpdate() {
	
	location.href="/subway/jsp/boardupdate.jsp"
}

// 삭제
function boardDelete() {
   
    let bno = 0;
	bno = localStorage.getItem('bno');
   
    $.ajax({
      url : "/subway/BoardController",
      method : "delete",
      data : {'bno' : bno} ,
      success : function f(r){
        if(r == 'true') {
			alert('삭제 완료');
			location.href="/subway/jsp/board.jsp";
		}
        
        else 
        console.log('삭제 실패')
        } ,
      error : function f(r){console.log('boardDelete 에러'+r)}
   })
}

// 댓글 작성
function commentWrite() {
	
	let bno = 0;
	bno = localStorage.getItem('bno');
	let content = document.querySelector('.commentinput');
    $.ajax({
      url : "/subway/CommentsController",
      method : "post",
      data : {bno : bno, content : content.value} ,
      success : function f(r){
        if(r) {
			alert('댓글 작성 완료')
			content.innerHTML = '';
		}
        
        else console.log('댓글 작성 실패');
      
        commentPrint();
        } ,
      error : function f(r){console.log('commentWrite 에러'+r)}
   })	
	
}

// 댓글 보기 
function commentPrint() {
	
	let bno = 0;
	bno = localStorage.getItem('bno');
    $.ajax({
	  url : "/subway/CommentsController",
	  method : "get",
	  data : {bno : bno} ,
	  success : function f(r){
		  	
		  	console.log('comment Print : ' + r)
		  
			let comment_view = document.querySelector('.comment_view');
			let html = '';
			
			for(let i = 0;  i < r.length; i++) {
				html += `
					<div class="comment_box">
			    		<div class="comment_top">
			    			<span class="mno">${r[i].mid}</span>
			    		</div> 
			    		<div class="content">
			    			${r[i].content}
			    		</div>
			    		<div class="cdate">
			    			${r[i].cdate}
			    		</div>
	    			</div>
				`;
			}
			comment_view.innerHTML = html;
	  } ,
      error : function f(r){console.log('commentPrint 에러'+r)}
   })	
}