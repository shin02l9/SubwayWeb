// 카테고리 리스트 
let hcategoryList = ['메뉴소개', '이용방법', '새소식', '관리자'];
/*let hcategoryListBottom = [
	{name : '샌드위치', category : 0}, {name : '랩', category : 0}, {name : '샐러드', category : 0},
	{name : '써브웨이 이용방법', category : 1}, {name : '단체메뉴 이용방법', category : 1}, {name : '신선한 재료 소개', category : 1},
	{name : '이벤트&프로모션', category : 2}, {name : '뉴스&공지사항', category : 2}, {name : '광고영상', category : 2},
	{name : '주문확인', category : 3}, {name : '리뷰관리', category : 3}
];*/


let loginId;
console.log('loginId ▼')
console.log(loginId)

member();
function member() {
	$.ajax({
		url: "/subway/header",
		data: { type: "info" },
		async: false,
		method: "get",
		success: function f(r) {
			console.log('헤더 컨트롤러 통신 성공')
			console.log(r)
			if (r != 'null') {
				loginId = r;
			}
		},
		error: function f(r) { }
	})
}

loginPrintHeader();
// 로그인 여부에 따른 헤더 버튼 출력 변경하기 
function loginPrintHeader() {
	// 출력할 위치 
	let header = document.querySelector('.header_right');
	let HTML = ``;
	// 만약에
	if (loginId != null) { // 로그인
		HTML = `
		<a onclick="onlogout()" href="/subway/jsp/join.jsp"> 로그아웃 </a> 
        <span> · </span>
        <a href="/subway/jsp/mypage.jsp"> 마이페이지 </a> <span> · </span>
        <a href="#"><img class="global_icon" src="/subway/img/header_global_icon.PNG"></a>
		`;
	} else { // 비로그인
		HTML = `
		<a href="/subway/jsp/join.jsp"> 로그인 </a> 
        <a href="#"><img class="global_icon" src="/subway/img/header_global_icon.PNG"></a>
		`;
	}
	header.innerHTML = HTML;
}

function onlogout() {
	console.log('output')
	$.ajax({
		url: "/subway/header",
		method: "get",
		data: { type: "logout" },
		async: false,
		success: function f(r) {
			alert('로그아웃 되었습니다.')
			loginId = null;
			sessionStorage.clear();
			location.href = "/subway/jsp/main.jsp";
		},
		error: function f(r) { console.log('logout 에러 : ' + r) }
	})

}

let html = `
	<li class="drop_menu">
	    <a class="title" href="/subway/jsp/introducemenu.jsp">메뉴주문</a>
	</li>
	<li class="drop_menu">
	      <a class="title" href="#">이용방법</a>
	</li>
	   <li class="drop_menu">
	      <a class="title" href="#">새소식</a>
	   </li>
	   <li class="drop_menu">
	      <a class="title" href="#">써브웨이</a>
	   </li>
	   <li class="drop_menu">
	      <a class="title" href="/subway/jsp/board.jsp">게시판</a>
	   </li>`;
	   
if(loginId == 'admin') {
	html += `
	<li class="drop_menu">
	      <a class="title" href="/subway/jsp/admin.jsp">관리자</a>
	   </li>
	`;
}
html += `
               <li class="sub_menuBox">
               		<div class="sub_menuDiv">
                        <ul class="sub_menu">
                        </ul>
                        
                        <ul class="sub_menu">
                           <li><a href="#">써브웨이 이용방법</a></li>
                           <li><a href="#">단체메뉴 이용방법</a></li>
                           <li><a href="#">신선한 재료 소개</a></li>
                        </ul>
                        
                        <ul class="sub_menu">
                           <li><a href="#">이벤트 / 프로모션</a></li>
                           <li><a href="#">뉴스 / 공지사항</a></li>
                           <li><a href="#">광고 영상</a></li>
                        </ul>
                        
                        <ul class="sub_menu">
                           <li><a href="#">써브웨이 역사</a></li>
                           <li><a href="#">써브웨이 약속</a></li>
                           <li><a href="/subway/jsp/map.jsp">매장 찾기</a></li>
                        </ul>
                        
                        <ul class="sub_menu">
                        </ul>
      `;
if(loginId == 'admin') {
	html += `
	<ul class="sub_menu">
                         
                        </ul>`;
}                        
html += `                   	
                   </div>
               </li>
`;

let headerBottom = document.querySelector('.headerBottom');
headerBottom.innerHTML = html;

