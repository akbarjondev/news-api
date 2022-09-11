create table users(
	user_id serial primary key,
	user_fullname varchar(150),
	user_login varchar(150),
	user_password varchar(255),
  user_created timestamp default current_timestamp
);
insert into users(user_fullname, user_login, user_password) values('Adminchik', 'Admin', 'nimadir');

create table news(
	news_id serial primary key,
	news_title varchar(150),
	news_desc text,
	news_picture varchar(100),
  news_created timestamp default current_timestamp
);
insert into news(news_title, news_desc, news_picture) values('News title1', 'lorem ipsum dolor sit', 'nimadir.png');

create table loved(
	loved_id serial primary key,
	loved_news_id int,
  loved_user_id int,
	loved_added boolean default true,
  loved_created timestamp default current_timestamp
);
insert into loved(loved_news_id, loved_user_id) values(1, 3);

