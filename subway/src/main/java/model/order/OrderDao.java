package model.order;

import java.util.ArrayList;

import model.Dao;

/*
기능 : 
	[C] : order 테이블 저장, order_details 테이블 저장 
	[R] : 식별번호 가져오기
*/

public class OrderDao extends Dao {
	private static OrderDao orderDao = new OrderDao();
	public static OrderDao getInstance() { return orderDao;}
	private OrderDao() {}
	
	// order 테이블 저장
	public boolean orderPost(int mno, int total) {
		
		try {
			System.out.println("mno : " + mno);
			System.out.println("total : " + total);
			String sql = "insert into subway_order(mno,ototalpaid) values(?,?)";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, mno);
			ps.setInt(2, total);
			int row = ps.executeUpdate();
			if(row == 1) return true;
		}catch(Exception e) {
			System.out.println("orderPost DB 오류 : " + e);
		}
		
		return false;
	}
	
	// ono 가져오기
	public int onoGet(int mno) {
		
		try {
			String sql = "select ono from subway_order where mno = " + mno + " order by odate desc limit 1";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			if(rs.next()) {
				return rs.getInt(1);
			}
		}catch(Exception e) {
			System.out.println("onoGet DB 오류 : " + e);
		}
		
		return -1;
	}
	
	// order_details 테이블 저장 
	public boolean orderDetailsPost(OrderDto dto, int ono) {
		
		try {
			System.out.println("dto.getBread() : " + dto.getBread());
			String sql = "insert into subway_order_details(ono, pno, bread, cheese, toasting, vegetable, sauce) values(?, ?, ?, ?, ?, ?, ?)";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, ono);
			ps.setInt(2, dto.getPno());
			ps.setInt(3, dto.getBread());
			ps.setInt(4, dto.getCheese());
			ps.setInt(5, dto.getToasting());
			ps.setString(6,dto.getVegetable().toString());
			ps.setInt(7, dto.getSauce());
			int row =  ps.executeUpdate();
			if(row == 1) System.out.println("row는 자유에요!!");
			return true;
		}catch(Exception e) {
			System.out.println("orderDetailsPost DB 오류 : " + e);
		}
		
		return false;
	}
	
	
}
