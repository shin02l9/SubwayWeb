package model.admin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import model.Dao;
import model.board.BoardDto;
import model.member.MemberDto;
import model.order.OrderDto;

public class AdminDao extends Dao{
	
	private static AdminDao dao = new AdminDao();
	public static AdminDao getInstance() { return dao;}
	private AdminDao() {}

	
	
	// 1. 전체 주문내역 출력 -----------------------------------------------
	public List<OrderDto> order_status_view(int page,int listsize, String date){
		List<OrderDto> list = new ArrayList<>();
		try {
			String sql = "select o.*, m.mname, m.phone"
					+ "	from subway_order o"
					+ "		natural join subway_member m "
					+ " where o.odate like ? "
					+ "	order by o.odate desc limit ?, ?;";
			ps = conn.prepareStatement(sql);
			ps.setString(1, "%" + date + "%");
			ps.setInt( 2 , ((page-1)*listsize) );
			ps.setInt( 3 , listsize );
			rs = ps.executeQuery(); 
			while( rs.next() ) {
				OrderDto dto = new OrderDto(
						rs.getInt( 1 ),		 // ono
						rs.getInt( 2 ), 	 // mno
						rs.getString( 3 ),	 // odate
						rs.getInt( 4 ), 	 // ostatus
						rs.getInt( 5 ),		 // ototalpaid
						rs.getString( 6 ), 	 // mname
						rs.getString( 7 ) 	 // phone
						);
			list.add(dto);
			}
		}catch (Exception e) {System.out.println(e);}
		
		return list; 

	}
	
	
	// 2-1. 개별 주문내역 출력 ( 상세 ) ----------------------------------------
	
	public OrderDto order_status_view_details(int ono) {
		System.out.println(" 개별 주문내역 상세 SQL 입장 ");
		System.out.println("ono : "+ono);

		try {
			String sql = " select sm.mno, sm.mname, sm.phone, sm.address, "
					+ "so.ono, so.odate, so.ostatus, so.ototalpaid "
					+ "from subway_order so "
					+ "natural join subway_member sm "
					+ "where ono = ?";
			System.out.println("sql : "+sql);
			
			ps = conn.prepareStatement(sql);
			ps.setInt( 1 , ono );
			
			rs = ps.executeQuery(); 
			if ( rs.next() ) {
				OrderDto dto = new OrderDto(
						rs.getInt( 1 ), 	// 주문자 회원번호
						rs.getString( 2 ),	// 주문자 명
						rs.getString( 3 ),	// 주문자 휴대폰번호
						rs.getString( 4 ),		// 주문자 주소
						rs.getInt( 5 ),		// 주문번호
						rs.getString( 6 ),	// 주문날짜
						rs.getInt( 7 ),		// 주문상태
						rs.getInt( 8 )		// 총주문금액
						);
				System.out.println("상세주문페이지에 갈 DTO : "+dto);
				return dto; 
			}
		} catch (Exception e) {System.out.println(e);}
		
		return null;
	}
	
	// 2-2. 개별 주문내역 출력 ( 상세 + 커스텀 내역 ) ----------------------------------------
		public List<OrderDto> order_status_view_custom(int ono) {
			System.out.println(" 주문 커스텀내역 SQL 입장 ");
			System.out.println("ono : "+ono);

			List<OrderDto> list = new ArrayList<>();
			
			try {
				String sql = "select sod.*, p.pname "
						+ " from subway_order_details sod "
						+ " natural join products p "
						+ " where ono = ?";
				
				ps = conn.prepareStatement(sql);
				ps.setInt( 1 , ono );
				rs = ps.executeQuery(); 
				while( rs.next() ) {
					String vegetableStr = rs.getString(7);  
					List<String> vegetable = Arrays.asList(vegetableStr.split(","));
					OrderDto dto = new OrderDto(
							rs.getInt( 2 ),		// ono
							rs.getInt( 1 ),  	// odno
							rs.getInt( 3 ), 	// pno
							rs.getString( 9 ),	// pname
							rs.getInt( 4 ),		// bread
							rs.getInt( 5 ),		// cheese
							rs.getInt( 6 ),		// toasting
							vegetable,			// vegetable
							rs.getInt( 8 )		// sauce
							);
					list.add(dto);
					System.out.println("ono "+ono+"번의 커스텀 내역 :"+list);
				}
			}catch (Exception e) {System.out.println(e);}
			
			return list;
		}
	
	// 3. 주문상태변경 ---------------------------------------------------------
	public void change_Order_Status() {

		
	}
	
	// 4. 전체 회원 출력 ---------------------------------------------------------
	public List<MemberDto> member_management_view(int page, int listsize) {
		System.out.println(" 전체 회원 출력 SQL 입장 ");
		
		List<MemberDto> list = new ArrayList<>();
		
		try {
			String sql = "select * from subway_member limit ?, ?;";
			ps = conn.prepareStatement(sql);
			ps.setInt( 1 , ((page-1)*listsize) );
			ps.setInt( 2 , listsize );
			rs = ps.executeQuery(); 
			while( rs.next() ) {
				MemberDto dto = new MemberDto(
						rs.getInt( 1 ), 	//mno
						rs.getString( 2 ),	//id
						rs.getString( 4 ),	//mname
						rs.getInt( 5 ),		//birthdate
						rs.getString( 6 ),	//gender
						rs.getString( 7 ),	//address
						rs.getString( 8 ),	//phone
						rs.getInt( 9 ) 		//mil
						);
			list.add(dto);
			}
		} catch (Exception e) {System.out.println(e);}

		return list;
	}

	// 5. 리뷰 출력 ---------------------------------------------------------
	public List<BoardDto> review_management_view(int page, int listsize) {
		System.out.println(" 리뷰 출력 SQL 입장 ");
		
		List<BoardDto> list = new ArrayList<>();
		
		try {
			String sql = "select b.*, m.mname "
					+ "from board b "
					+ "natural join subway_member m "
					+ "where bcno = 1 "
					+ "limit ?, ?";
			ps = conn.prepareStatement(sql);
			ps.setInt( 1 , ((page-1)*listsize) );
			ps.setInt( 2 , listsize );
			rs = ps.executeQuery(); 
			while( rs.next() ) {
				BoardDto dto = new BoardDto(
						rs.getInt( 1 ), 	// bcno
						rs.getInt( 2 ),		// bno
						rs.getInt( 3 ),		// mno
						rs.getString( 4 ),	// btitle
						rs.getString( 5 ),  // bdate
						rs.getString( 6 ),	// bcontent
						rs.getString( 7 ),	// pname
						rs.getInt( 8 ), 	// hits
						rs.getInt( 9 ), 	// star
						rs.getString( 10 ) 	// mname
						);
			list.add(dto);
			}
		} catch (Exception e) {System.out.println(e);}

		return list;
	}
	
	// 6. 총 출력수 구하기 ---------------------------------------------------------
	public int countPrint(int type, String date) {
		System.out.println("countPrint Dao 입장");
		System.out.println("type : "+type+" date : "+date);
		try {
			// 앞부분 공통 SQL문
			String sql = "select count(*) from";
			
				// 조건 type이 0이면 주문출력수
				if( type == 0 ) { sql += " subway_order ";
					if( !date.equals("0")) {
						sql += " where odate like ?";
					}
				 }
	
				// 조건 type이 1이면 회원출력수
				else if( type == 1 ) { sql += " subway_member"; }
				
				// 조건 type이 2이면 게시글출력수
				else if( type == 2 ) { sql += " board"; }
				
				

			ps = conn.prepareStatement(sql);
				if( type == 0 && !date.equals("0")) {
					ps.setString(1, "%" + date + "%");
				}
			rs = ps.executeQuery();
			if( rs.next() ) { 
				System.out.println("countPrint Dao return값 : "+rs.getInt(1));
				return rs.getInt(1); 
			}
		} catch ( Exception e ) {System.err.println(e);}
		return 0;
	}
}
