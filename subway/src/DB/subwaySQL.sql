show databases;
#1. 데이터베이스 존재하면 삭제부터 하고 시작하기
drop database if exists subway;
#2. 데이터베이스 생성 
create database subway;
#3. 데이터베이스 사용 준비
use subway;

	show tables;
    
    drop database if exists subway_member;
    create table subway_member( # ------------회원정보------------
		mno int auto_increment,          # 회원 넘버
        id varchar(10),  		# 회원 이름
		pw varchar(10),   		# 회원 비밀번호
		mname varchar(10),  	# 회원 이름
        birthdate int,          # 회원 생일
		gender varchar(2),      # 회원 성별
		address varchar(50),    # 회원 주소
        phone varchar(14),      # 회원 전화번호 
        mil int default 0,      # 회원 마일리지
      primary key( mno )  # <<회원 넘버 PK>>
    );

   drop table if exists products_category;
    create table products_category ( # ------------상품 카테고리------------
		cateno int auto_increment,         # 상품 카테고리 넘버
        catename varchar(10), # 상품 카테고리 이름
        primary key( cateno ) # <<상품 카테고리 넘버 PK>>
   );
    
    drop table if exists products;
    create table products ( # ------------상품 정보------------
		cateno int,         # 상품 카테고리 넘버
        pno int auto_increment,          # 상품 넘버
        pname varchar(20) unique,   # 상품 이름
        pimg varchar(100), # 상품 img
        pname_e varchar(100), # 상품 영어 이름
        category int, # 상품 카테고리 1, 2, 3
        pprice int,			# 상품 가격
        primary key( pno ), # <<상품 넘버 PK>>
        foreign key( cateno ) references products_category( cateno ) # <<상품 카테고리 넘버 FK>>
   );
    select * from products;
    drop table if exists subway_order;
    create table subway_order(# ------------주문 정보------------
		ono int auto_increment,          # 주문 넘버
        mno int,          # 회원 넘버
        odate datetime default now(),      # 주문일
        ostatus int default 0,      # 주문상태
        ototalpaid int,				# 총 주문금액 	
        primary key( ono ), # <<주문 넘버 PK>>
        foreign key( mno ) references subway_member( mno ) # <<회원 넘버 FK>>
   );
    
	drop table if exists custom_category;
    create table custom_category ( # ------------커스텀 카테고리------------
		ccno int auto_increment,              # 커스텀 카테고리 넘버 
        ccname varchar(10),     			 # 커스텀 카테고리 이름 (데이터 | 빵, 치즈, 토스팅, 야채, 소스)
        primary key(ccno) # <<커스텀 카테고리 PK>>
   );
    
    drop table if exists custom_list;
    create table custom_list( # ------------커스텀 아이템 상세리스트------------
		customitemno int auto_increment,      # 커스텀 아이템 넘버 
		ccno int,                  # 커스텀 카테고리 넘버
        customitemname varchar(20),      # 커스텀 아이템 이름 
        primary key( customitemno ),
        foreign key( ccno ) references custom_category( ccno )  # <<커스텀 카테고리 FK>>
   );
    
   drop table if exists subway_order_details;
   create table subway_order_details ( # ------------주문 상세 정보------------
      odno int auto_increment,             # 주문 상세 넘버
        ono int,             # 주문 넘버
      pno int,             # 상품 넘버
        braed int,             # 빵 커스텀
        cheese int,          # 치즈 커스텀
        toasting int,          # 토스팅 커스텀
        vagetable int,          # 야채 커스텀
        sauce int,            # 소스 커스텀 // 문제 발생.............................
        primary key(odno),
        foreign key( pno ) references products( pno ), # <<상품 넘버 FK>>
        foreign key( ono ) references subway_order( ono ), # <<주문 넘버 FK>>
        foreign key( braed ) references custom_list( customitemno ),  # <<커스텀 아이템 넘버 FK>>  
        foreign key( cheese ) references custom_list( customitemno ),
        foreign key( toasting ) references custom_list( customitemno ),
        foreign key( vagetable ) references custom_list( customitemno ),
        foreign key( sauce ) references custom_list( customitemno )
   );
    

    
    drop table if exists board_category;
    create table board_category( # ------------게시판 카테고리------------
      bcno int ,          # 게시판 카테고리 넘버 
        bcname varchar(10),  # 게시판 카테고리 이름 
        primary key( bcno )  # <<게시판 카테고리 넘버 PK>>
   );  
   alter table board_category auto_increment = 0;

	drop table if exists board;
    create table board(  # ------------게시판 글------------
		bcno int, 			# 게시판 카테고리 넘버 
		bno int auto_increment, 	# 글 넘버 
        mno int, 			# 회원 넘버 
        btitle varchar(20), # 게시판 제목
        bdate datetime default now(),  	# 게시판 작성일 
        bcontent text, 		# 게시판 내용 
        pname varchar(20), # 제품 이름
        hits int default 0, 			# 게시판 조회수 
        star int default -1,				# 별점
        primary key( bno ),	 # <<글 넘버 PK>>
        foreign key( mno ) references subway_member( mno ), # <<회원 넘버 FK>>
        foreign key( bcno ) references board_category( bcno ), # <<게시판 카테고리 넘버 FK>>
        foreign key(pname) references products(pname)
	);
    
drop table if exists comments;
create table comments( # ------------댓글------------
	cno int auto_increment,          # 댓글 넘버
	mno int,          # 회원 넘버
	cdate datetime default now(),    # 댓글 작성일
	content text,       # 댓글 내용
    bno int,
	primary key(cno),
	foreign key( mno ) references subway_member( mno ) on delete cascade, # <<회원 넘버 FK>>
    foreign key(bno) references board(bno) on delete cascade
);