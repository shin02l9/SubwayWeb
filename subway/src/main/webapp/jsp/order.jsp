<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="/subway/css/order.css" rel="stylesheet">
</head>
<body>

	<%@include file = "header.jsp" %>
	
	<div class="wrap"> <!---------------- 커스텀오더 페이지 전체 ---------------->
	
		<div class="productinfo"> <!---------------- 제품이미지 및 제품명 ---------------->
			<!-- itemPrint 함수로 출력  -->
		</div> <!---------------- 제품이미지 및 제품명 end ---------------->
		
		<div class="customBox"> <!---------------- 커스텀 항목 ---------------->
			<!-- optionPrint 함수로 출력 -->
					
		</div> <!---------------- 커스텀 항목 end ---------------->
		
		<div class="orderBtnBox"> <!---------------- 주문하기 버튼 ---------------->
			<!-- optionPrint 함수로 출력 -->
		</div> <!---------------- 주문하기 버튼 end ---------------->
	
	</div> <!---------------- 커스텀오더 페이지 전체 end ---------------->


	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/subway/js/order.js" type="text/javascript"></script>
</body>
</html>