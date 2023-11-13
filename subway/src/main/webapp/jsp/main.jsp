<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="/subway/css/main.css" rel="stylesheet">
<title>Main</title>
</head>
<body>
	<%@include file = "header.jsp" %>
	<div id = wrap> <!-- 전체 구역 -->
		<img class="mainImg" src="../img/main_h_img01.jpg"> <!-- 메인 광고 -->
		 
		<div class="mainMid"> <!--  메인 중간 부분 -->
			<img class="subwaymenuImg" src="../img/subways_menu.png">
			<ul class="midUl">
				<!-- <li>클래식 <sapn class="line">|</sapn></li><li>클래식 <sapn class="line">|</sapn></li>
				<li>클래식 <sapn class="line">|</sapn></li>  <li>클래식</li> -->
			</ul>
		</div> <!--  메인 중간 부분 end -->
		
		<div class="products">	<!-- 제품들  -->
		<!-- 	<div class="product"> 
					<img src="img/eggmayo.png"/>
					<div class="pinfo">
						<div class="pname"> 에그마요 </div>
						<div class="pcontent"> 부드러운 달걀과 고소한 마요네즈의 조합 </div>
					</div>
			</div> -->
		</div> <!-- 제품들 end  -->
		<div class="nwrap">
			<div class="notice">
				<div class="utilization">
					<div class="util_content">
						<p>써브웨이를<br>제대로 즐기는 방법!</p>
						<a href="#"><input class="how_to_use_btn" type="button" value="이용방법"></a>
					</div>
				</div>
				<div class="history">
					<div class="history_content">
						<p>50년 역사를 가진<br>No.1 프랜차이즈의 성장기</p>
						<a href="#"><input class="history_btn" type="button" value="써브웨이 역사"></a>
					</div>
				</div>
			</div>
		</div>
			
	</div> <!-- 전체 구역 end  -->
	<%@include file = "footer.jsp" %>
	<script src="/subway/js/main.js" type="text/javascript"></script>
</body>
</html>