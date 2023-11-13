

# --------------- board_category --------------------
insert into board_category(bcno, bcname) values(0, '공지사항');
insert into board_category(bcno,bcname) values(1, '한줄리뷰');
insert into board_category(bcno, bcname) values(2, '문의사항');

# --------------- admin 계정 생성 ---------------------
insert into subway_member(id, pw, mname, birthdate, gender, address, phone, mil) values('admin', '1234', 'admin', 20230811, 'a', '11111', '010-1234-1234', 0);

# --------------- products_category ----------------
insert into  products_category(catename) values('샌드위치');
insert into  products_category(catename) values('랩');
insert into  products_category(catename) values('샐러드');
insert into  products_category(catename) values('없음'); # ------ 공지사항 & QnA 게시판 작성 시 필요

# --------------- products -------------------------
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(1, '에그마요', 'eggmayo.png', 'EggMayo', 1, 5500);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(1, '햄', 'ham.png', 'Ham', 1, 5800);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(1, '쉬림프', 'shrimp.png', 'Shrimp', 2, 7600);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(1, '바비큐', 'BBQ.png', 'BBQ', 2, 7300);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(1, '치킨 데리야끼', 'chicken_teriyaki.png', 'Chicken Teriuaki', 2, 7000);

insert into products(cateno, pname, pimg, pname_e, category, pprice) values(2, '쉬림프 에그마요 랩', 'shrimp_egg_mayo_wrap.jpg', 'Shrimp Egg Mayo Wrap', 1, 6200);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(2, '스테이크 & 치즈 아보카도 랩', 'steak_n_cheese_avocado_wrap.jpg', 'Steak & Cheese Avocado Wrap', 1, 6600);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(2, '치킨 베이컨 미니 랩', 'chicken_bacon_mini_wrap.jpg', 'Chicken Bacon Mini Wrap', 2, 3900);

insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '비엘티 샐러드', 'S_BLT.png', 'B.L.T.', 1, 8400);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '햄 샐러드', 'S_ham.png', 'Ham', 1, 7600);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '이탈리안 비엠티 샐러드', 'S_italian_BMT.png', 'Italian B.M.T', 1, 8500);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '풀드 포크 바비큐 샐러드', 'S_pulled_pork_BBQ.png', 'Pulled Pork Barbecue', 2, 9000);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '스파이시 이탈리안 샐러드', 'S_spicy_italian.png', 'Spicy Italian', 2, 8700);
insert into products(cateno, pname, pimg, pname_e, category, pprice) values(3, '쉬림프 샐러드', 'S_shrimp.png', 'Shrimp', 2, 9400);

insert into products(cateno, pname) values(4, 'none'); # ------ 공지사항 & QnA 게시판 작성 시 필요

# -------------- custom_category -------------------
insert into custom_category(ccname) values('bread');
insert into custom_category(ccname) values('cheese');
insert into custom_category(ccname) values('sauce');
insert into custom_category(ccname) values('toasting');
insert into custom_category(ccname) values('vegetable');

#--------------- custom_list ----------------------
insert into custom_list(ccno, customitemname) values(1, '화이트');
insert into custom_list(ccno, customitemname) values(1, '위트');
insert into custom_list(ccno, customitemname) values(1, '허니오트');
insert into custom_list(ccno, customitemname) values(1, '플랫브레드');
insert into custom_list(ccno, customitemname) values(1, 'x');

insert into custom_list(ccno, customitemname) values(2, '아메리칸');
insert into custom_list(ccno, customitemname) values(2, '슈레드');
insert into custom_list(ccno, customitemname) values(2, '모차렐라');
insert into custom_list(ccno, customitemname) values(2, 'x');

insert into custom_list(ccno, customitemname) values(3, '핫칠리');
insert into custom_list(ccno, customitemname) values(3, '랜치');
insert into custom_list(ccno, customitemname) values(3, '바베큐');
insert into custom_list(ccno, customitemname) values(3, '스위트어니언');
insert into custom_list(ccno, customitemname) values(3, 'x');

insert into custom_list(ccno, customitemname) values(4, 'o');
insert into custom_list(ccno, customitemname) values(4, 'x');

insert into custom_list(ccno, customitemname) values(5, '피망');
insert into custom_list(ccno, customitemname) values(5, '할라피뇨');
insert into custom_list(ccno, customitemname) values(5, '올리브');
insert into custom_list(ccno, customitemname) values(5, '피클');
insert into custom_list(ccno, customitemname) values(5, '양파');
insert into custom_list(ccno, customitemname) values(5, 'x');



select b.*, m.id from board b, subway_member m where bcno = 0 and b.mno = m.mno;

select * from board_category;
select * from subway_member;
select * from board;
select * from products;
select * from products_category;
