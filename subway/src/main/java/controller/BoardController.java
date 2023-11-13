package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.board.BoardDao;
import model.board.BoardDto;
import model.member.MemberDao;
import model.member.MemberDto;

/*
 기능 : 
 	[C] : 게시물 작성
 	[R] : 로그인 여부, 게시물 전체 출력, 게시물 개별 출력
 	[U] : 게시물 수정
 	[D] : 게시물 삭제
 */
@WebServlet("/BoardController")
public class BoardController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public BoardController() {
        // TODO Auto-generated constructor stub
    }
    
	// insert
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    // 게시물 작성
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String title = request.getParameter("btitlewrite"); 					// 제목
		String content = request.getParameter("bcontentwrite");					// 내용
		int bcno = Integer.parseInt(request.getParameter("categoryNumber"));	// 게시물 카테고리  0 : 관리자, 1 : 리뷰, 2 : QnA
		int mno = -1;
		String pname = request.getParameter("menus");							// 메뉴, 카테고리가 관리자나 QnA라면 null
		System.out.println(pname);
		int stars = Integer.parseInt(request.getParameter("stars"));			// 별점, 카테고리가 관리자나 QnA라면 -1
		// 로그인중인 회원번호
		// 세션 호출 : .getAttribute("세션명");
		Object object = request.getSession().getAttribute("id");				
		if( object != null ) {
			mno = MemberDao.getInstance().getMno((String)object);
		}
		
		BoardDao.getInstance().boardWriteSQL(bcno, title,content, mno, pname, stars);
		boolean result = true;
		response.getWriter().print( result );
		//request.getAt
	}
    // select
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    // 게시물 불러오기
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String resultType = request.getParameter("resultType");
		
		// 로그인 여부
		if(resultType.equals("loginCheck")) {
			Object object = request.getSession().getAttribute("id");
			if( object == null ) response.getWriter().print(false);
			else response.getWriter().print(true);
		// 게시물 전체 출력	
		}else if(resultType.equals("tablePrint")) {
			int selectNo = Integer.parseInt(request.getParameter("selectNo"));				// 게시물 카테고리 가져오기
			ArrayList<BoardDto> result = BoardDao.getInstance().boardPrintSQL(selectNo);	// 카테고리에 따른 게시물들 가져오기
			
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonArray = objectMapper.writeValueAsString(result);
			
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print(jsonArray);
		// 게시물 개별 출력
		}else if(resultType.equals("boardDetilsPrint")) { 
			
			int bno = Integer.parseInt(request.getParameter("bno"));						// 게시물 식별번호 가져오기
			
			BoardDto result = BoardDao.getInstance().boardDetailsPrintSQL(bno);				// 식별번호에 해당하는 게시물 가져오기
			
			// 만약에 ( 로그인 혹은 비로그인 )요청한한사람과 게시물작성한사람과 동일하면 
			Object object = request.getSession().getAttribute("id");
			if( object == null ) { // 비로그인 
				result.setIshost(false); // 남이 쓴 글 
			}else { // 로그인 
				int mno = -1;
				mno = MemberDao.getInstance().getMno((String)object);
				if( mno == result.getMno() ) { result.setIshost(true); } 	// 내가 쓴 글 
				else { result.setIshost(false);  } 	// 남이 쓴 글 
			}
			
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonArray = objectMapper.writeValueAsString(result);
			
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print(jsonArray);
		}
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	 


	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	
	// 게시물 수정 : 제목, 내용, 상품, 별점 수정 
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int bno = Integer.parseInt(request.getParameter("bno"));
		String bcontent = request.getParameter("bcontent");
		String btitle = request.getParameter("btitle");
		String pname = request.getParameter("pname");
		int star = Integer.parseInt(request.getParameter("star"));
		
		boolean result = BoardDao.getInstance().boardUpdateSQL(bno, bcontent, btitle, pname, star);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().print(result);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	// 게시물 삭제
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		int bno = Integer.parseInt(request.getParameter("bno"));
		
		boolean result = BoardDao.getInstance().boardDeleteSQL(bno);
		
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().print(result);
	}

}
