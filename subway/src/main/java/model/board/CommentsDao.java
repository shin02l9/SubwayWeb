package model.board;

import java.util.ArrayList;

import model.Dao;

/*
기능 : 
	[C] : 댓글 작성
	[R] : 댓글 출력
	[D] : 댓글 삭제
*/

public class CommentsDao extends Dao {
	private static CommentsDao commentDao = new CommentsDao();
	public static CommentsDao getInstance() { return commentDao;}
	private CommentsDao() {}
	
	// 댓글 작성
	public boolean writeComment(int mno, String content, int bno) {
		String sql = "insert into comments(mno, content, bno) values(?,?,?);";
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, mno);
			ps.setString(2, content);
			ps.setInt(3, bno);
			int row = ps.executeUpdate();
			if(row == 1) return true;
		}catch(Exception e) {
			System.out.println("writeComment DB 오류 : " + e);
		}
		
		return false;
	}
	
	// 댓글 출력
	public ArrayList<CommentsDto> showComment(int bno) {
		String sql = "select c.*, m.id from comments c, subway_member m where bno = ? and c.mno = m.mno order by cno desc";
		ArrayList<CommentsDto> list = new ArrayList<>();
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bno);
			rs = ps.executeQuery();
			while(rs.next()) {
				CommentsDto dto = new CommentsDto(rs.getInt(1), rs.getInt(2), rs.getString(3), rs.getString(4), rs.getInt(5), rs.getString(6));
				list.add(dto);
			}
			System.out.println("showComment db : " + list);
			return list;
		}catch(Exception e) {
			System.out.println("showComment DB 오류 : " + e);
		}
		
		return null;
	}
	
	// 댓글 삭제 
	public boolean deleteComment(int cno) {
		String sql = "delete from comments where cno = ? ";
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, cno);
			int row = ps.executeUpdate();
			if(row == 1) return true;
		}catch(Exception e) {
			System.out.println("deleteComment DB 오류 : " + e);
		}
		return false;
	}
}
