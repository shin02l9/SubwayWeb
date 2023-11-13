package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.custom.CustomDao;
import model.custom.CustomDto;
import model.product.ProductsDao;
import model.product.ProductsDto;

/**
 * Servlet implementation class CustomController
  
 	기능 : 커스텀카테고리추가, 삭제, 수정
 		  커스텀아이템추가, 삭제, 수정
 */
@WebServlet("/CustomController")
public class CustomController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public CustomController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		ObjectMapper objectMapper = new ObjectMapper();
		String json = "";

		
		// Ajax 요청에서 전달된 JSON 문자열을 읽어서 ArrayList로 변환
		String ccnoListjson = request.getParameter("ccnoList");
		System.out.println(ccnoListjson);
		//ArrayList<String> ccnoListStr = new ArrayList<>();
		ArrayList<Integer> ccnoList = new ArrayList<>();
		try {
			ccnoList = objectMapper.readValue(ccnoListjson, ArrayList.class);
		} catch (IOException e) {
		    e.printStackTrace();
		}
			
		// 새로운 ArrayList<Integer> 생성
		
			
		/*
		 * System.out.println(ccnoListStr); // ArrayList<String>의 각 요소를 정수로 변환하여
		 * integerList에 추가 for (int i = 1 ; i <= ccnoListStr.size(); i++) { try {
		 * System.out.println("test : " + ccnoListStr.get(i)); int intValue =
		 * Integer.parseInt(ccnoListStr.get(i)); ccnoList.add(intValue); } catch
		 * (NumberFormatException e) { // 정수로 변환할 수 없는 문자열인 경우 예외 처리
		 * System.err.println("정수로 변환할 수 없는 문자열: " + ccnoListStr.get(i)); } }
		 */
		
		
		
		
		ArrayList<CustomDto> list = CustomDao.getInstance().customItemList(ccnoList);
		
		json = objectMapper.writeValueAsString(list);
		
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(json);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		
	}

}
