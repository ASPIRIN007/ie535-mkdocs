# Doubt for theorem 2.5

## Example A (Good case): redundant equalities can be removed when the feasible set is nonempty

We build a $4\times 7$ matrix $A$ with dependent rows (rank $2<4$). Rows 3 and 4 are linear combinations of rows 1 and 2.

Let
- $r_1 = [1,\ 0,\ 2,\ 0,\ 0,\ 0,\ 0]$
- $r_2 = [0,\ 1,\ 1,\ 0,\ 0,\ 0,\ 0]$
- $r_3 = r_1+r_2 = [1,\ 1,\ 3,\ 0,\ 0,\ 0,\ 0]$
- $r_4 = 2r_1-r_2 = [2,\ -1,\ 3,\ 0,\ 0,\ 0,\ 0]$

So
$A=
\begin{bmatrix}
1&0&2&0&0&0&0\\
0&1&1&0&0&0&0\\
1&1&3&0&0&0&0\\
2&-1&3&0&0&0&0
\end{bmatrix}.$

Now choose a feasible point $x\ge 0$, for example
$x=
\begin{bmatrix}
2\\
1\\
3\\
0\\
0\\
0\\
0
\end{bmatrix}.$

Compute $b=Ax$:
- Row 1: $1(2)+2(3)=8$
- Row 2: $1(1)+1(3)=4$
- Row 3: $8+4=12$
- Row 4: $2\cdot 8-4=12$

Hence
$b=
\begin{bmatrix}
8\\
4\\
12\\
12
\end{bmatrix}.$

Define
$P=\{x\in\mathbb{R}^7 \mid Ax=b,\ x\ge 0\}.$

The equality system $Ax=b$ corresponds to:
1. $x_1+2x_3=8$
2. $x_2+x_3=4$
3. $x_1+x_2+3x_3=12$
4. $2x_1-x_2+3x_3=12$
and $x\ge 0$.

Now define the reduced system (keep only rows 1 and 2):
$Q=\{x\in\mathbb{R}^7 \mid r_1x=8,\ r_2x=4,\ x\ge 0\}.$

**Why $P=Q$ (key point):**
- If $x\in P$, then $x$ satisfies all four equations, so it satisfies the first two $\Rightarrow P\subseteq Q$.
- If $x\in Q$, then:
  - Adding eqn (1)+(2) gives $(r_1+r_2)x=8+4=12$, but $r_1+r_2=r_3$, so eqn (3) holds automatically.
  - Taking $2\cdot$(1)$-$(2) gives $(2r_1-r_2)x=16-4=12$, but $2r_1-r_2=r_4$, so eqn (4) holds automatically.
  Hence $x$ satisfies all four equations $\Rightarrow Q\subseteq P$.

Therefore $P=Q$.

---

## Example B (Bad case): if the feasible set is empty, dropping “redundant” rows can change the set

Use the same $A$ as above (rows 3 and 4 are linear combinations of rows 1 and 2):
$A=
\begin{bmatrix}
1&0&2&0&0&0&0\\
0&1&1&0&0&0&0\\
1&1&3&0&0&0&0\\
2&-1&3&0&0&0&0
\end{bmatrix}.$

Now choose an inconsistent right-hand side $b$ by violating $b_3=b_1+b_2$:
$b=
\begin{bmatrix}
8\\
4\\
13\\
12
\end{bmatrix}.$

Define
$P=\{x\in\mathbb{R}^7 \mid Ax=b,\ x\ge 0\}.$

**Why $P=\emptyset$:**
- From rows 1 and 2, any $x$ satisfying them must satisfy $(r_1+r_2)x=8+4=12$.
- But $r_1+r_2=r_3$, so this forces $r_3x=12$.
- Row 3 also requires $r_3x=13$.
- Contradiction ($12\ne 13$), so no $x$ can satisfy $Ax=b$.

Now drop rows 3 and 4 and define
$Q=\{x\in\mathbb{R}^7 \mid r_1x=8,\ r_2x=4,\ x\ge 0\}.$

**$Q$ is nonempty:**
Take $x_3=0$, then eqn (1) gives $x_1=8$ and eqn (2) gives $x_2=4$.
Set the remaining variables to zero:
$x=
\begin{bmatrix}
8\\
4\\
0\\
0\\
0\\
0\\
0
\end{bmatrix}\ge 0.$

So $Q\ne\emptyset$ but $P=\emptyset$.

**Conclusion:** If the original feasible set is empty, removing “dependent” equality constraints can create new feasible points, so the nonempty assumption in Theorem 2.5 is necessary.
