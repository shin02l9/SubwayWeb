package model.admin;


import java.util.List;

import model.board.BoardDto;
import model.member.MemberDto;
import model.order.OrderDto;

public class PageDto {

	
	// DB 필드를 사용하지 않음
	// 현재 페이지
	private int page;
	// 페이지당 최대 게시물
	private int listsize;
	// 전체 게시물 수 
	private int totalsize;
	// 전체 페이지 수 
	private int totalpage;
	// 페이지 버튼 시작번호
	private int startbtn;
	// 페이지 버튼 끝번호
	private int endbtn;
	
	List<OrderDto> orderlist;
	List<MemberDto> memberlist;
	List<BoardDto> boardlist;
	
	
	
	
	
	
	public PageDto(int page, int listsize, int totalsize, int totalpage, int startbtn, int endbtn,
			List<OrderDto> orderlist) {
		super();
		this.page = page;
		this.listsize = listsize;
		this.totalsize = totalsize;
		this.totalpage = totalpage;
		this.startbtn = startbtn;
		this.endbtn = endbtn;
		this.orderlist = orderlist;
	}
	
	
	public PageDto(int page, int listsize, int totalsize, int totalpage,
			List<MemberDto> memberlist , int startbtn, int endbtn) {
		super();
		this.page = page;
		this.listsize = listsize;
		this.totalsize = totalsize;
		this.totalpage = totalpage;
		this.memberlist = memberlist;
		this.startbtn = startbtn;
		this.endbtn = endbtn;
	}
	
	public PageDto(List<BoardDto> boardlist, int page, int listsize, int totalsize, int totalpage,
			 int startbtn, int endbtn) {
		super();
		this.boardlist = boardlist;
		this.page = page;
		this.listsize = listsize;
		this.totalsize = totalsize;
		this.totalpage = totalpage;
		this.startbtn = startbtn;
		this.endbtn = endbtn;
	}
	


	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getListsize() {
		return listsize;
	}
	public void setListsize(int listsize) {
		this.listsize = listsize;
	}
	public int getTotalsize() {
		return totalsize;
	}
	public void setTotalsize(int totalsize) {
		this.totalsize = totalsize;
	}
	public int getTotalpage() {
		return totalpage;
	}
	public void setTotalpage(int totalpage) {
		this.totalpage = totalpage;
	}
	public int getStartbtn() {
		return startbtn;
	}
	public void setStartbtn(int startbtn) {
		this.startbtn = startbtn;
	}
	public int getEndbtn() {
		return endbtn;
	}
	public void setEndbtn(int endbtn) {
		this.endbtn = endbtn;
	}
	public List<OrderDto> getOrderlist() {
		return orderlist;
	}
	public void setOrderlist(List<OrderDto> orderlist) {
		this.orderlist = orderlist;
	}
	public List<MemberDto> getMemberlist() {
		return memberlist;
	}
	public void setMemberlist(List<MemberDto> memberlist) {
		this.memberlist = memberlist;
	}
	public List<BoardDto> getBoardlist() {
		return boardlist;
	}
	public void setBoardlist(List<BoardDto> boardlist) {
		this.boardlist = boardlist;
	}
	@Override
	public String toString() {
		return "PageDto [page=" + page + ", listsize=" + listsize + ", totalsize=" + totalsize + ", totalpage="
				+ totalpage + ", startbtn=" + startbtn + ", endbtn=" + endbtn + ", orderlist=" + orderlist
				+ ", memberlist=" + memberlist + ", boardlist=" + boardlist + "]";
	}
	
	
	
	
}
