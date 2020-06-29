select *from motorista;
select *from onibus ;
select *from turno;
select *from aluno;
select *from onibus_alunos;
select *from turno_alunos;
select *from usuario;

drop table aluno;
drop table motorista;
drop table onibus;
drop table onibus_alunos;
drop table turno;

insert into onibus_alunos values
('20','35');

insert into turno_alunos values
('22','35');

insert into usuario(id,usuario,senha)
values(1, 'a','1'),
(2, "b",'2');
