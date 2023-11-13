<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<title>mypage</title>
	<link href="/subway/css/mypage.css" rel="stylesheet">
	</head>
<body>
	<!-- 헤더 JSP 파일 호출 -->
	<%@ include file="./header.jsp" %>
	
	
	<div class="mywrap"> <!-- 마이 페이지 s -->
		<div class="contentBox"> <!-- contentBox s -->
		    <h1> MY SUB </h1>
		    <div class="content">
				<!-- innerHTML로 화면 출력 -->
				
				
		    </div>
		</div> <!-- contentBox e -->
	</div> <!-- 마이 페이지 e -->
	

	<!-- 푸터 JSP 파일 호출 -->
	<%@ include file="./footer.jsp" %>
	<!-- Java 서블릿이랑 통신하기위해 호출했음 -->
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<!-- 해당 페이지 JS 호출 -->
	<script src="/subway/js/mypage.js" type="text/javascript"></script>
	<!-- 다음 주소 찾기 API  -->
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

</body>
</html>