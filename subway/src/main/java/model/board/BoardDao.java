package model.board;

import java.sql.DriverManager;
import java.util.ArrayList;

import model.Dao;

/*
기능 : 
	[C] : 게시물 작성
	[R] : 게시물 전체 출력, 게시물 개별 출력
	[U] : 게시물 수정, 조회수 증가
	[D] : 게시물 삭제
*/

public class BoardDao extends Dao {
	private static BoardDao boardDao = new BoardDao();
	public static BoardDao getInstance() { return boardDao;}
	private BoardDao() {}
	
	// 게시물 작성
	public boolean boardWriteSQL(int bcno, String title, String content, int mno, String pname, int stars) {
		System.out.println("pname : " +pname);
		try {
			if(pname.equals("")) {
				String sql = "insert into board(bcno, btitle,bcontent,mno, star) values(?,?,?,?,?)";
				ps = conn.prepareStatement(sql);
				ps.setInt(1, bcno);
				ps.setString(2, title);
				ps.setString(3, content);
				ps.setInt(4,mno); // mno
				ps.setInt(5, stars);
				int row = ps.executeUpdate();
				if(row == 1) return true;
			}else {
				String sql = "insert into board(bcno, btitle,bcontent,pname,mno, star) values(?,?,?,?,?,?)";
				ps = conn.prepareStatement(sql);
				ps.setInt(1, bcno);
				ps.setString(2, title);
				ps.setString(3, content);
				ps.setString(4, pname);
				ps.setInt(5,mno); // mno
				ps.setInt(6, stars);
				int row = ps.executeUpdate();
				if(row == 1) return true;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	} 
	
	// 게시물 리스트 출력 
	public ArrayList<BoardDto> boardPrintSQL(int bcno) {
		
		String sql = "select b.*, m.id from board b, subway_member m where bcno = ? and b.mno = m.mno";
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bcno);
			rs = ps.executeQuery();
			ArrayList<BoardDto> list = new ArrayList<>();
			while(rs.next()) {
				BoardDto dto = new BoardDto(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getString(5)
						, rs.getString(6), rs.getString(7),rs.getInt(8), rs.getInt(9), rs.getString(10));
				
				list.add(dto);
			}
			
			return list;
		}catch(Exception e) {
			System.out.println("boardPrintSQL에서 오류 발생 : " + e);
		}
		
		return null;
	}
	
	// 게시물 수정 
	public boolean boardUpdateSQL(int bno, String bcontent, String btitle, String pname, int star) {
		String sql = "update board set bcontent = ?, btitle = ?, pname=?, star = ? where bno = ?";
		try {
			ps = conn.prepareStatement(sql);
			ps.setString(1, bcontent);
			ps.setString(2, btitle);
			ps.setString(3, pname);
			ps.setInt(4, star);
			ps.setInt(5, bno);
			int row = ps.executeUpdate();
			if(row == 1) return true;
		}catch(Exception e) {
			System.out.println("boardUpdateSQL오류 : " + e);
		}
		
		return false;
	}
	
	// 게시물 삭제 
	public boolean boardDeleteSQL(int bno) {
		
	      try {
	         String sql  = "delete from board where bno = ?";
	         ps = conn.prepareStatement(sql);
	         ps.setInt(1, bno);
	         int row = ps.executeUpdate();
	         
	         if(row == 1) return true;
	         
	      } catch (Exception e) {
	         System.out.println("boardDeleteSQL오류 : "+e);
	      }
	      return false;  
	}
	
	// 게시물 상세 출력 
	public BoardDto boardDetailsPrintSQL(int bno) {
		
		hitsUp(bno);
		
		String sql = "select b.*, m.id from board b, subway_member m where bno = ? and b.mno = m.mno";
		
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bno);
			rs = ps.executeQuery();
			if(rs.next()) {
				BoardDto dto = new BoardDto(rs.getInt(1), rs.getInt(2), rs.getInt(3), rs.getString(4), rs.getString(5)
						, rs.getString(6), rs.getString(7),rs.getInt(8), rs.getInt(9), rs.getString(10));
				
				return dto;
			}
			
		}catch(Exception e) {
			System.out.println("boardDetailsPrintSQL에서 오류 발생 : " + e);
		}
		
		return null;
	}
	
	// 조회수 올리기
	public void hitsUp(int bno) {
		String sql = "update board set hits = hits+1 where bno = ?";
		
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bno);
			ps.execute();
		}catch(Exception e) {
			System.out.println("hitsUp DB 오류 : " + e);
		}
	}
}
