package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.member.MemberDao;
import model.order.OrderDao;
import model.order.OrderDto;

/*
기능 : 
	[R] : 주문하기 (주문테이블, 주문 디테일 테이블 저장)
*/
@WebServlet("/OrderController")
public class OrderController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public OrderController() {
        // TODO Auto-generated constructor stub
    }

	// 주문하기 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		ObjectMapper objectMapper = new ObjectMapper();
		int mno = -1;
		
		// 세션 호출 : .getAttribute("세션명");
		Object object = request.getSession().getAttribute("id");
		if( object != null ) {
			mno = MemberDao.getInstance().getMno((String)object);
		}
		if(type.equals("order")) { // 주문 테이블에 저장
			
			int result = 0;
			int total = Integer.parseInt(request.getParameter("totalPrice")); // 총 금액
			boolean r = OrderDao.getInstance().orderPost(mno, total);
			System.out.println("r : " + r );
			if(r) {
				result = OrderDao.getInstance().onoGet(mno);
			}
				
			
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print(result);
		}else if(type.equals("order_details")) { // 주문 디테일 테이블에 저장 
			
			boolean result = false;
			
			int ono = Integer.parseInt(request.getParameter("ono")); // 주문 번호 가져오기
			
			System.out.println("ono : " + ono);
			String orderList = request.getParameter("orderList"); // 주문 리스트 가져오기 
			
			System.out.println("orderList : " + orderList);
			
			ArrayList<OrderDto> orderDtoList = new ArrayList<>();
			
			try {
				
			    // JSON 문자열을 ArrayList<OrderDto>로 변환
			    List<LinkedHashMap<String, Object>> jsonList = objectMapper.readValue(orderList, new TypeReference<List<LinkedHashMap<String, Object>>>() {});

			    for (LinkedHashMap<String, Object> json : jsonList) {
			        // LinkedHashMap을 OrderDto로 변환
			        OrderDto orderDto = objectMapper.convertValue(json, OrderDto.class);
			        System.out.println("orderDto.getBread() : " + orderDto.getBread() );
			        OrderDao.getInstance().orderDetailsPost(orderDto, ono);
			    }

				
			} catch (Exception e) {
			    e.printStackTrace();
			}
			
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print(result);
		}
		

	}

}
