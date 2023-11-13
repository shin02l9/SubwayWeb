<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>map</title>
<link href="/subway/css/map.css" rel="stylesheet">
</head>
<body>
<%@include file = "header.jsp" %>


	<div class="map_wrap"> <!-- 지도 부분 -->
	    <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
	
	    <div id="menu_wrap" class="bg_white">
	        <div class="option">
	            <div>
	                <form onsubmit="searchPlaces(); return false;">
	                    키워드 : <input type="text" value="써브웨이 안산" id="keyword" size="15"> 
	                    <button type="submit">검색하기</button> 
	                </form>
	            </div>
	        </div>
	        <hr>
	        <ul id="placesList"></ul>
	        <div id="pagination"></div>
	    </div>
	</div>
	
	<div>
	
	
	
	</div>


<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=827217b7ddc513af82155b97606cd13a&libraries=services"></script>
<script src="/subway/js/map.js" type="text/javascript"></script>

</body>
</html>