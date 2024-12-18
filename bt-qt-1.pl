% 1 ng 1 quy left-->right
trans((M,D,M1,D1,left),(X,Y,Z,T,right)):-
    M > 0,
    D > 0,

    X is M - 1 ,
    Y is D - 1 ,
    Z is M1 + 1 ,
    T is D1 + 1 .
% 1 ng 1 quy right --> left
trans((M,D,M1,D1,right),(X,Y,Z,T,left)):-
    M1 > 0,
    D1 > 0,

    X is M + 1 ,
    Y is D + 1 ,
    Z is M1 - 1 ,
    T is D1 - 1 .
% 1ng left--> right
trans((M,D,M1,D1,left),(X,D,Z,D1,right)):-
    M > 0,

    X is M - 1 ,
    Z is M1 + 1 .
% 1ng right --> left
trans((M,D,M1,D1,right),(X,D,Z,D1,left)):-
    M1 > 0,

    X is M + 1 ,
    Z is M1 - 1 .
% 1quy left --> right
trans((M,D,M1,D1,left),(M,Y,M1,T,right)):-
    D > 0,

    Y is D - 1 ,
    T is D1 + 1 .
% 1quy right --> left
trans((M,D,M1,D1,right),(M,Y,M1,T,left)):-
    D1 >= 0,

    Y is D + 1 ,
    T is D1 - 1 .
% 2ng left --> right
trans((M,D,M1,D1,left),(X,D,Z,D1,right)):-
    M > 1,

    X is M - 2 ,
    Z is M1 + 2 .
% 2ng right --> left
trans((M,D,M1,D1,right),(X,D,Z,D1,left)):-
    M1 > 1,

    X is M + 2 ,
    Z is M1 - 2 .
% 2 quy left --> right
trans((M,D,M1,D1,'left'),(M,Y,M1,T,'right')):-
    D > 1,

    Y is D - 2 ,
    T is D1 + 2 .
% 2 quy right --> left
trans((M,D,M1,D1,right),(M,Y,M1,T,left)):-
    D1 > 1,

    Y is D + 2 ,
    T is D1 - 2 .

dangers((M,D,_,_,_)) :-  M < D , M >0  .
dangers((_,_,M1,D1,_)) :- M1 < D1 , M1 >0 .

%TT start
initial((3,3,0,0,left)).
goal((0,0,3,3,_)).

solution(Path) :-
    initial(Start),
    dfs(Start , [Start], Path).

dfs(X , Visited , [X|Visited]) :- goal(X) , ! .
dfs(X , Visited , Path) :-
    trans(X,Y),
    \+ dangers(Y),
    \+ member(Y,Visited) ,
    dfs(Y,[X|Visited],Path).
% In ra đường đi
print_solution :-
    solution(Path),
    reverse(Path, OrderedPath),
    print_path(OrderedPath),
    !.
print_path([]).
print_path([State|Rest]) :-
    write(State), nl,
    print_path(Rest).


