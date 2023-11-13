<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IntroduceMenu</title>
<link href="/subway/css/introducemenu.css" rel="stylesheet">
</head>
<body>

	<%@include file = "header.jsp" %>
	<div class="intro_wrap">
		<div class="intro_top">
			<div class="midUl_div">
				<ul class="midUl">
				</ul>
			</div>
			
			<div class="intro_top_content">
				<h1 class="top_h1">Sandwich</h1>
				<p class="top_p">전세계 넘버원 브랜드 Subway! <br>
				50년 전통의 세계 최고의 샌드위치를 맛보세요!</p>
			</div>
			
			<div class="menuUl_div">
				<ul class="menuUl">
					<li class="s_all">All</li>
					<li class="s_classic">클래식</li>
					<li class="s_premium">프리미엄</li>
				</ul>
			</div>
		</div>
		
		<div class="intro_bottom">
		
			<div class="products">
			
				<!-- <div class="product">
					<img src="/subway/img/BBQ.png">
					<h3>쉬림프 샌드위치</h3>
					<p>test</p>
					<p>★☆ 1.5/5</p>
				</div>
				
				<div class="product">
					<img src="/subway/img/BBQ.png">
					<h3>쉬림프 샌드위치</h3>
					<p>test</p>
					<p>★★★ 3/5</p>
				</div>
				
				<div class="product">
					<img src="/subway/img/BBQ.png">
					<h3>쉬림프</h3>
					<p>Shrimp</p>
					<p>★★★★ 4/5</p>
				</div>
				
				<div class="product">
					<img src="/subway/img/BBQ.png">
					<h3>쉬림프</h3>
					<p>Shrimp</p>
					<p>★★★★ 4/5</p>
				</div> -->
				
			</div>
			
			<div class="cartbox"> <!-- 장바구니구역 -->
			
				<div class="cartcontent"> <!-- 선택정보구역 -->
					<div class="carttop"> <!-- 선택 제품개수/가격 출력 구역 -->
						<div> 카트 <span class="ccount">0</span> </div>
						<div> 총 주문금액 <span class="ctotal">0 원<span></span> </div>
					</div>
					<div class="cartbottom">
						<!-- cartPrint 함수가 HTML 내용 JS로 출력 -->
					</div>
				</div> <!-- 선택정보구역 end -->
				
				<div class="cartbtn"> <!-- 버튼구역 -->

					<button onclick="cartCancel()" class="cencelbtn"> 취소하기 </button>
					<button onclick="productOrder()" class="orderbtn"> 주문하기 </button>

				</div> <!-- 버튼구역 end -->
				
				
			</div> <!-- 장바구니구역 end -->
			
		</div>
		
	</div>
	
		
	<%@include file = "footer.jsp" %>

	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/subway/js/introducemenu.js" type="text/javascript"></script>
</body>
</html>