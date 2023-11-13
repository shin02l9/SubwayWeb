package model.board;

public class BoardDto {// 게시판 Dto
	
	
	private int bcno; // 게시판 카테고리 넘버
	private String bcname; // 게시판 카테고리 이름
	
	private int bno; // 글 넘버
	private int mno; // 회원 넘버
	private String mname;
	private String btitle;
	private String bdate; // 게시판 작성일
	private String bcontent; // 게시판 내용
	private int hits; // 게시판 조회수
	private String pname; // 제품 이름
	private int stars; // 게시판 별점 
	private String id; // 멤버 아이디
	// - 조회대상자와 게시물 작성자대상자 일치여부 [ 본인글 체크여부 ]
    private boolean ishost;
    
	public BoardDto() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	

	public BoardDto(int bcno, int bno, int mno, String btitle, String bdate, String bcontent, String pname, int hits, 
			int stars) {
		super();
		this.bcno = bcno;
		this.bno = bno;
		this.mno = mno;
		this.btitle = btitle;
		this.bdate = bdate;
		this.bcontent = bcontent;
		this.pname = pname;
		this.hits = hits;
		this.stars = stars;
		
	}






	public BoardDto(int bcno, String bcname, int bno, int mno, String btitle, String bdate, String bcontent, int hits, String pname, int stars, String mname) {
		super();
		this.bcno = bcno;
		this.bcname = bcname;
		this.bno = bno;
		this.mno = mno;
		this.btitle = btitle;
		this.bdate = bdate;
		this.bcontent = bcontent;
		this.hits = hits;
		this.pname = pname;
		this.stars = stars;
		this.mname = mname;
		
		
	}
	
	public BoardDto(int bcno, int bno, int mno, String btitle, String bdate, String bcontent,  String pname,int hits, int stars, String id) {
		super();
		this.bcno = bcno;
		this.bno = bno;
		this.mno = mno;
		this.btitle = btitle;
		this.bdate = bdate;
		this.bcontent = bcontent;
		this.hits = hits;
		this.pname = pname;
		this.stars = stars;
		this.id = id;
	}
	
	public BoardDto(int bcno, int bno, int mno, String btitle, String bdate, String bcontent, int hits, int stars) {
		super();
		this.bcno = bcno;
		this.bno = bno;
		this.mno = mno;
		this.btitle = btitle;
		this.bdate = bdate;
		this.bcontent = bcontent;
		this.hits = hits;
		this.stars = stars;
	}

	public int getBcno() {
		return bcno;
	}

	public void setBcno(int bcno) {
		this.bcno = bcno;
	}

	public String getBcname() {
		return bcname;
	}

	public void setBcname(String bcname) {
		this.bcname = bcname;
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

	public String getBtitle() {
		return btitle;
	}

	public void setBtitle(String btitle) {
		this.btitle = btitle;
	}
	
	public String getBdate() {
		return bdate;
	}

	public void setBdate(String bdate) {
		this.bdate = bdate;
	}

	public String getBcontent() {
		return bcontent;
	}

	public void setBcontent(String bcontent) {
		this.bcontent = bcontent;
	}

	public int getHits() {
		return hits;
	}

	public void setHits(int hits) {
		this.hits = hits;
	}

	public int getStars() {
		return stars;
	}

	public void setStars(int stars) {
		this.stars = stars;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isIshost() {
		return ishost;
	}

	public void setIshost(boolean ishost) {
		this.ishost = ishost;
	}
	
}