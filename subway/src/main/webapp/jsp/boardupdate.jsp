
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>게시물 상세 정보</title>
	<link href="/subway/css/boardupdate.css" rel="stylesheet">
     <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>-->
</head>
<body>
	
	<%@include file = "header.jsp" %>

	
	
	<div class="bdwrap">
	
		<h1>게시물 수정 페이지</h1>
		<div class="board">
		    제목 : <input class="info btitle" type="text"/>
		    <div class="info bno"></div>
		    <div class="info id"></div>
		    <div class="info bdate"></div>
		    내용 : <textarea class="content bcontent" rows="20" cols="30"> </textarea>
		    <div class="info menuSelect"></div>
		    <div class="info starSelect"></div>
		
		    <div class="btn-group">	
		    	<button class="btn btn-update" onclick="boardUpdate()">수정</button>
		       	<button class="btn btn-delete" onclick="location.href='/subway/jsp/board.jsp'">뒤로가기</button>
		    </div>
		    
	    </div>

	</div>
	
	<%@include file = "footer.jsp" %>
	
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/subway/js/boardupdate.js" type="text/javascript"></script>
	
</body>
</html>