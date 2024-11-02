s --> np , vp .
s --> np , vp , pp.
s --> np , advp , vp.
s --> np , advp , vp , pp .

vp --> v , np , np.
vp --> v , vp .
vp --> v , np .
vp --> v .
pp --> p , np.
np --> q , np , advp , adjp.
np --> q , np , adjp.
np --> n , pp .
np --> propenn .
np --> n .
advp --> adv.
adjp --> adj.

propenn --> [nam];[lan] .
adv --> [thuong];[rat];[moi] .
adj --> [hay] ; [moi] .
n -->[thu-vien] ; [truong] ; [sach] ; [cuon-sach] ; [nha] .
v --> [o] ; [doc] ; [den] ; [mua] ; [tang] ; [thich] .
q --> [may] ; [mot] .
p --> [cua] ; [gan] ; [o] .


s(sent(X,Y)) --> np(X) , vp(Y) .
s(sent(X,Y,Z)) --> np(X) , vp(Y) , pp(Z).
s(sent(X,Y,Z)) --> np(X) , advp(Y) , vp(Z).
s(sent(X,Y,Z,T)) --> np(X) , advp(Y) , vp(Z) , pp(T) .
vp(verbp(X,Y,Z)) --> v(X) , np(Y) , np(Z).
vp(verbp(X,Y)) --> v(X) , vp(Y) .
vp(verbp(X,Y)) --> v(X) , np(Y) .
vp(verbp(X)) --> v(X) .
pp(pp(X,Y)) --> p(X) , np(Y).
np(nounp(X,Y,Z,T)) --> q(X) , np(Y) , advp(Z) , adjp(T).
np(nounp(X,Y,Z)) --> q(X) , np(Y) , adjp(Z).
np(nounp(X,Y)) --> n(X) , pp(Y) .
np(nounp(X)) --> propenn(X) .
np(nounp(X)) --> n(X) .
advp(advp(X)) --> adv(X).
adjp(adbj(X)) --> adj(X).
propenn(propenn(nam)) --> [nam] .
propenn(propenn(lan)) --> [lan] .
adv(adv(thuong)) --> [thuong] .
adv(adv(rat)) --> [rat] .
adv(adv(moi)) --> [moi] .
adj(adj(hay)) --> [hay] .
adj(adj(moi)) --> [moi] .
n(noun(thu-vien)) -->[thu-vien] .
n(noun(truong)) --> [truong] .
n(noun(sach)) --> [sach] .
n(noun(cuon-sach)) --> [cuon-sach] .
n(noun(nha)) --> [nha] .
v(verb(o)) --> [o] .
v(verb(doc)) --> [doc] .
v(verb(den)) --> [den] .
v(verb(mua)) --> [mua] .
v(verb(tang)) --> [tang] .
v(verb(thich)) --> [thich] .
q(q(may)) --> [may] .
q(q(mot)) --> [mot] .
p(p(cua)) --> [cua] .
p(p(gan)) --> [gan] .
p(p(o)) --> [o] .

