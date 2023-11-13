<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="/subway/css/boardwrite.css" rel="stylesheet">
</head>
<body>
	<%@include file = "header.jsp" %>
	
	<div class="wrap">
		<div class="write_content">
			<h1 class="write_title">title</h1>
			<input class="btitlewrite" type="text" >
			<textarea class="bcontentwrite" rows="20" cols="30"></textarea>
			<div class="starSelect">
	<!--		별점 : <select class="stars">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						
					</select>   -->	
			</div>
			<div class="menuSelect">
	<!-- 			메뉴 선택 : <select class="menus">
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
							<option> 쉬림프 샐러드 </option>
						</select> -->
			</div>
			<button class="boardwrite" onclick="boardPost()">게시물 등록</button>
			
		</div>
	</div>
	
	<%@include file = "footer.jsp" %>
	
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/subway/js/boardwrite.js" type="text/javascript"></script>
</body>
</html>