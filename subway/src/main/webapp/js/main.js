// 광고 이미지 배열
let simgList = ['main_h_img01.jpg', 'main_h_img02.jpg', 'main_h_img03.jpg']; 

// 카테고리 리스트
let categoryList = [ '클래식', '프레쉬&라이트', '랩', '샐러드'];

// 메인메뉴 리스트
let mainMenuList = [
	 				{ name : '에그마요', content: "부드러운 달걀과 고소한 마요네즈의 조합", img : 'eggmayo.png', category : 0}, 
	 				{ name : 'BBQ', content: "써브웨이의 코리안 스타일 샌드위치!", img : 'BBQ.png', category : 0}, 
	 				{ name : '치킨데리야키', content: "담백한 치킨 스트립에 달콤짭쪼름한 써브웨이 특제 데리야끼 소스와의 환상적인 만남", img : 'chicken_teriyaki.png', category : 0},
	 				{ name : '햄', content: "풍부한 햄이 만들어내는 입 안 가득 넘치는 맛의 향연", img : 'ham.png', category : 1},
	 				{ name : '참치', content: "남녀노소 누구나 좋아하는 담백한 참치와 고소한 마요네즈의 완벽한 조화", img : 'tuna.png', category : 1},
	 				{ name : '쉬림프', content: "더 커지고 맛있어진 써브웨이 쉬림프를 만나보세요", img : 'shrimp.png', category : 1},
	 				{ name : '치킨데리야키 미니', content: "담백한 치킨, 바삭한 베이컨 비츠가 쫀득한 통밀 랩에 쏘옥!", img : 'chicken_bacon_mini_wrap.jpg', category : 2},
	 				{ name : '쉬림프에그마요', content: "부드럽고 고소한 에그마요 안에 탱글한 통새우가 푹~!", img : 'shrimp_egg_mayo_wrap.jpg', category : 2},
	 				{ name : '스테이크 & 치즈 아보카도 랩', content: "최상의 야채와 소스 조합으로 탄생한 스테이크 & 치즈 아보카도 랩!", img : 'steak_n_cheese_avocado_wrap.jpg', category : 2},
	 				{ name : 'BLT', content: "오리지널 아메리칸 스타일 베이컨의 풍미와 바삭함 그대로~", img : 'S_BLT.png', category : 3}, 
	 				{ name : '이탈리안BMT', content: "페퍼로니, 살라미 그리고 햄이 만들어내는 최상의 조화!", img : 'S_pulled_pork_BBQ.png', category : 3},
	 				{ name : '스파이시 이탈리안', content: "살라미, 페퍼로니가 입안 한가득! 진짜 이탈리아의 맛 가득한 샐러드", img : 'S_spicy_italian.png', category : 3}
 					];

// 리뷰 리스트 가져오기
/*let reviewList = JSON.parse(sessionStorage.getItem('reviewList'));
if(reviewList == null) {
	reviewList = [
		{no : 1, name : '찬희', content : '에그마요 맛있네요', star: 4, 
		time : `2023-07-10`, menu : '에그마요 샌드위치'},
		{no : 2, name : '민재', content : '서브웨이 최고', star: 5, 
		time : `2023-07-11`, menu : '햄 샐러드'},
		{no : 3, name : '예지', content : '제 취향은 아니네요', star: 2, 
		time : `2023-07-11`, menu : '참치 샌드위치'},
		{no : 4, name : '성호', content : '야채 냠냠', star: 3, 
		time : `2023-07-12`, menu : '비엘티 샐러드'}
	]
}
console.log("reviewList : " + reviewList);*/
/*let reviewList = [
	{ no : 1, name : '찬희', content : '사장님이 친절해요', star : 3, time : '2023-07-09'},
	{ no : 2, name : '희찬', content : '에그마요 짱', star : 5, time : '2023-07-10'},
	{ no : 3, name : '예지', content : '피망 맛 없어요', star : 1, time : '2023-07-10'}
];*/
/*let review = { no : 1, name : '찬희', content : '사장님이 친절해요', star : 1, time : '2023-07-09'};*/


// 광고 이미지 바꿔주기
let viewhimg = 0; 
 setInterval(()=> {
	 
	 // 1. 해당 이미지 태그 객체 호출
	 let mainImg = document.querySelector('.mainImg');
	 // 2. 호출된 객체에서 src 속성 대입/바꿔치기
	 	// 배열 내 이미지 하나씩 바꿔가져서 대입
	 
	 	viewhimg++; // 인덱스 증가시킴 [ 다음 이미지로 변경]
	 	if(viewhimg >= simgList.length) {viewhimg = 0;} 
	 	
	 mainImg.src = `../img/${simgList[viewhimg]}`;
 },2000);
 
 categoryPrint(0); // 최초 1번 실행 [ 가장 앞에 있는 카테고리 선택 가정]
 productPrint(0);
 //reviewPrint();
 function categoryPrint(selectNo) {
	 console.log('categoryPrint')
	 // 1. 어디에
	 let midUl = document.querySelector('.midUl');
	 // 2. 무엇을
	 let html = '';
	 	// HTML 구성 : 배열 내 데이터(for)를 li 형식으로 출력
	 for(let i = 0; i < categoryList.length; i++) {
		 if(i == selectNo) {  html+=`<li onclick="categorySelect( ${ i })" class="categoryselect"> ${categoryList[i]} <sapn class="line">|</sapn> </li>`
		}
		 else{ 
			 
			 html+=`<li onclick="categorySelect( ${ i })"> ${categoryList[i]} <sapn class="line">|</sapn> </li>` 
		}
	 }
	 
	 midUl.innerHTML = html;
 }
 
 
 // 3. 카테고리 클릭 함수 [ 실행조건 : . li에서 클릭했을때 ]
 function categorySelect(selectNo) {
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
		 }else{
			 // 해당 li에 class 삭제 DOM객체명.classList.remove('새로운클래스명')
			 categoryli[i].classList.remove('categoryselect');
		 }
	 }
	 //categoryPrint(selectNo);
	 console.log("----" + selectNo);
	 // 3.
	 productPrint(selectNo);
 }
 // ---------------------------------- //
 
 // 4. 제품 출력 함수 [ 실행 조건 : 1. 카테고리 클릭(변경)하면 ]
 function productPrint(categoryNo) { // 어떤 카테고리의 제품 출력할껀지 인수 판단
	 // 1. 어디에
	 let products = document.querySelector('.products')
	 // 2. 무엇을 [ 선택된 카테고리에 맞는 제품들만 출력 ]
	 let html = ``;
	 	// html 구성 : 
	 	for(let i = 0; i < mainMenuList.length; i++) { // 모든 버거배열/리스트[서랍장] 열어서[하나씩] 확인
	 		// i번째 버거의 카테고리와 선택한 카테고리와 같으면
			if(mainMenuList[i].category == categoryNo) {
				html+=`<div class="product"> 
					<img src="../img/${mainMenuList[i].img}"/>
					<div class="pinfo">
						<div class="pname"> ${mainMenuList[i].name} </div>
						<div class="pcontent"> ${mainMenuList[i].content} </div>
					</div>
				</div>`;
			}
		}
	 // 3. 출력[대입]
 	 products.innerHTML = html;
 }
 

 
 