package model.board;

public class CommentsDto { // 게시판 댓글 Dto
	
	private int cno; // 댓글 넘버
	private int bno; // 글 넘버
	private int mno; // 회원 넘버
	private String cdate; // 댓글 작성일
	private String content; // 댓글 내용
	private String mid; // 회원 이름
	
	public CommentsDto() {
		// TODO Auto-generated constructor stub
	}

	public CommentsDto(int cno, int mno, String cdate, String content, int bno, String mid) {
		super();
		this.cno = cno;
		this.bno = bno;
		this.mno = mno;
		this.cdate = cdate;
		this.content = content;
		this.mid = mid;
	}

	public int getCno() {
		return cno;
	}

	public void setCno(int cno) {
		this.cno = cno;
	}

	public int getBno() {
		return bno;
	}

	public void setBno(int bno) {
		this.bno = bno;
	}

	public int getMno() {
		return mno;
	}

	public void setMno(int mno) {
		this.mno = mno;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}
	
	public String getCdate() {
		return cdate;
	}

	public void setCdate(String cdate) {
		this.cdate = cdate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
}
