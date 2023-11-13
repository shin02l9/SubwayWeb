package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.admin.AdminDao;
import model.admin.PageDto;
import model.board.BoardDto;
import model.order.OrderDto;

@WebServlet("/AdminController")
public class AdminController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AdminController() {super();}


    // 관리자 화면에 주문 내역 출력하기 ( 전체, 상세 )
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println(" Admin doGet 입장 ");
		
		Object result = null;
		
		// 요청한다.
		// type : 0 전체출력
		// type : 1 개별출력 (오더번호로 필요함!)
		int type = Integer.parseInt(request.getParameter("type"));
		
		// 타입별로 다르게 DAO 처리 하기.
			// 1. 전체출력
		if( type == 0 ) {
			String date = request.getParameter("date");
			// 한페이지 최대 출력 수 15개 고정
			int listsize = Integer.parseInt(request.getParameter("listsize"));
			int page = Integer.parseInt(request.getParameter("page"));
			// 총 출력해야하는 수 가져오기
			int total = AdminDao.getInstance().countPrint(0, date);
			// 페이지 개수 몇개 만들지 구하기
			int totalpage = total%listsize == 0 ?
							total/listsize :
							(total/listsize)+1;
			// 페이지번호 버튼 시작번호, 마지막번호
			int btnsize = 10;
			int startbtn = ((page/btnsize)*btnsize)+1;
			int endbtn = startbtn+(btnsize-1);
			if( endbtn >= totalpage ) { endbtn = totalpage; }
			
			//  DAO에게 주문 리스트 받아오기
			List<OrderDto> r = AdminDao.getInstance().order_status_view(page, listsize, date);
			
			PageDto pageDto = new PageDto(page, listsize, total, totalpage, startbtn, endbtn, r  );
			result = pageDto;
			
			
			System.out.println("전체출력 : "+result);
			
			// 2. 개별출력
		} else if ( type == 1 ) {
			int ono = Integer.parseInt(request.getParameter("ono"));
			OrderDto details = AdminDao.getInstance().order_status_view_details(ono);
			List<OrderDto> customs = AdminDao.getInstance().order_status_view_custom(ono);
			
			result = new OrderDto(details, customs);
			System.out.println("커스텀 출력 : "+result);
		}
		
		// 매핑한다.
		ObjectMapper mapper = new ObjectMapper();
		String jsonData = mapper.writeValueAsString(result); // JSON 형식으로 변환할 객체 넣기
		System.out.println(jsonData);

		// 응답한다.
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print( jsonData );
		
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
