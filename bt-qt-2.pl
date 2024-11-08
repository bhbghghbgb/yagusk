% 2 chil left--> right
trans((P,C,B,left),(P,Y,B,right)):-
    C > 1,

    Y is C - 2 .
% 2 chil right --> left
trans((P,C,B,right),(P,Y,B,left)):-
    C <1 ,

    Y is C + 2 .
% 1 chil left--> right
trans((P,C,B,left),(P,Y,B,right)):-
    C > 0,

    Y is C - 1 .
% 1 chil right --> left
trans((P,C,B,right),(P,Y,B,left)):-
    C <2 ,

    Y is C + 1 .
% 1 Parent left--> right
trans((P,C,B,left),(X,C,B,right)):-
    P > 0,

    X is P - 1 .
% 1 Parent right--> left
trans((P,C,B,right),(X,C,B,left)):-
    P < 2,

    X is P + 1 .

% Ng lai thuyen left--> right
trans((P,C,left,left),(P,C,right,right)).

% Nguoi lai thuyen right--> left
trans((P,C,right,right),(P,C,left,left)).

initial((2,2,left,left)).
goal((0,0,left,left)).

solution(Path) :-
    initial(Start),
    dfs(Start , [Start], Path).

dfs(X , Visited , [X|Visited]) :- goal(X) , ! .
dfs(X , Visited , Path) :-
    trans(X,Y),
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
