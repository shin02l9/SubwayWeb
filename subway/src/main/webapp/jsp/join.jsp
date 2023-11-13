<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="UTF-8">
	<title>join</title>
	<link href="/subway/css/join.css" rel="stylesheet">
	</head>
<body>
	<!-- 헤더 JSP 파일 호출 -->
	<%@ include file="./header.jsp" %>
	
	
	<div class="joinwrap"> <!-- 로그인/회원가입 페이지 s -->
		<div class="contentBox"> <!-- 초기화면 로그인 폼 부터 출력 s -->
		    <div class="content">
				<!-- innerHTML로 화면 출력 -->
				
				

		    </div>
		</div> <!-- 초기화면 로그인 폼 부터 출력 e -->
	</div> <!-- 로그인/회원가입 페이지 e -->
	
	
	
	
	<!-- 푸터 JSP 파일 호출 -->
	<%@ include file="./footer.jsp" %>
	<!-- 해당 페이지 JS 호출 -->
	<script src="/subway/js/join.js" type="text/javascript"></script>
	<!-- 다음 주소 찾기 API  -->
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

	<!-- Java 서블릿이랑 통신하기위해 호출했음 -->
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
</body>
</html>