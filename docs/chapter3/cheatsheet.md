# Chapter 3 (Bertsimas) — Simplex Method Cheat Sheet

## 1) Standard form + notation
We study the LP in standard form:
minimize $c^\top x$
subject to $Ax=b$, $x\ge 0$,
where $A\in\mathbb{R}^{m\times n}$ has rank $m$ (rows independent).

- Choose a basis index set $B$ with $|B|=m$ and columns $A_B$ linearly independent.
- Let $B:=A_B$ (basis matrix), $N:=A_N$ (nonbasic columns).
- Split variables and costs: $x=(x_B,x_N)$ and $c=(c_B,c_N)$.

Constraint becomes: $Bx_B + Nx_N = b$.

## 2) Basic solution / BFS
A basic solution for basis $B$ is obtained by setting $x_N=0$:
- $x_B = B^{-1}b$ and $x_N=0$.

Basic feasible solution (BFS) condition:
- BFS exists for basis $B$ iff $B^{-1}b \ge 0$ (componentwise).

Geometric meaning: BFS corresponds to a vertex (extreme point) of the feasible polyhedron.

## 3) Feasible directions (local moves)
A direction $d$ is feasible at a feasible point $x$ if $\exists \epsilon>0$ such that $x+\theta d$ is feasible for all $\theta\in[0,\epsilon]$.

For standard form $P=\{x\mid Ax=b, x\ge 0\}$:
- $Ad=0$
- and $d_i\ge 0$ for all indices with $x_i=0$.

“Cone of feasible directions” at $x$: all feasible directions (closed under nonnegative scaling and addition).

## 4) Optimality via feasible directions
For minimizing $c^\top x$ over a polyhedron:
- A feasible $x$ is optimal iff $c^\top d \ge 0$ for every feasible direction $d$ at $x$.
- Unique optimal iff $c^\top d > 0$ for every nonzero feasible direction $d$ at $x$.

Intuition: if some feasible direction has negative slope, you can move a bit and improve.

## 5) Reduced costs (the simplex optimality test)
Given a basis $B$ with BFS $x_B=B^{-1}b$:

Simplex multipliers:
- $p^\top = c_B^\top B^{-1}$ (equivalently solve $B^\top p = c_B$)

Reduced cost of variable $j$ (column $A_j$):
- $\bar c_j = c_j - p^\top A_j = c_j - c_B^\top B^{-1}A_j$.

Vector form (all columns at once):
- $\bar c^\top = c^\top - c_B^\top B^{-1}A$.

Facts:
- For basic variables $j\in B$, $\bar c_j=0$.
- For minimization: if some nonbasic $\bar c_j<0$, objective can be decreased by letting $x_j$ enter.
- If all reduced costs $\bar c_j\ge 0$, the current BFS is optimal.

Definition (optimal basis matrix):
(a) $B^{-1}b\ge 0$ (feasible BFS)
(b) $\bar c^\top = c^\top - c_B^\top B^{-1}A \ge 0^\top$ (optimality)

## 6) One simplex iteration (mechanics)
Start with a feasible basis $B$ (so $x_B=B^{-1}b\ge 0$, $x_N=0$).

Step 1: Choose entering variable $x_j$ with $\bar c_j<0$ (any rule; often most negative).

Step 2: Compute pivot column (direction effect on basics):
- $u = B^{-1}A_j$.
If $u\le 0$ componentwise, then increasing $x_j$ keeps $x_B$ nonnegative forever:
- LP is unbounded (objective $\to -\infty$ for minimization).

Step 3: Ratio test (step size to maintain $x_B\ge 0$):
- $\theta^* = \min_{i: u_i>0} \frac{(B^{-1}b)_i}{u_i}$.
Leaving basic variable corresponds to the minimizing index $i$.

Update along direction:
- $x_j \leftarrow \theta^*$,
- $x_B \leftarrow x_B - \theta^* u$,
- and pivot: replace leaving column in $B$ by $A_j$.

## 7) Degeneracy and cycling
Degenerate BFS: at least one basic variable is zero.

Consequences:
- Ratio test can give $\theta^*=0$ (pivot changes basis but not the point or objective).
- Repeated degenerate pivots can cause cycling (in theory).

Avoid cycling: Bland’s rule or lexicographic pivoting (anti-cycling rules).

## 8) Implementations (bookkeeping)
Naive / full tableau:
- Stores $B^{-1}A$ and $B^{-1}b$ explicitly.
- Easy but high memory; per-iteration updates can be expensive.

Revised simplex:
- Does not store full $B^{-1}A$.
- Stores/factorizes $B$ and computes $B^{-1}A_j$ by solving linear systems.
- Much better for large sparse problems.

Key comparison:
- Full tableau: memory roughly $O(mn)$.
- Revised: memory for basis info roughly $O(m^2)$ (plus storing sparse $A$).

## 9) Finding an initial BFS (Phase I / Big-M)
If no obvious BFS:

Two-phase (Phase I):
- Add artificial variables $y\ge 0$:
  $Ax + y = b$, $x\ge 0$, $y\ge 0$.
- Minimize $w=\sum_i y_i$.
- Start with basis $y=b$ (identity basis).
Outcomes:
- If optimal $w^*>0$: original LP infeasible.
- If $w^*=0$: feasible solution found with $y=0$.
Then remove artificial columns (pivot them out if still basic) and use the final Phase I basis as the starting basis for Phase II.

Phase II:
- Keep the final constraint tableau/basis from Phase I.
- Replace objective by original $c^\top x$ and recompute reduced costs.
- Continue simplex pivots.

Big-M:
- Minimize $c^\top x + M\sum_i y_i$ with $M$ “very large”.
Conceptually similar, but Phase I is cleaner numerically.

## 10) Geometry (column geometry intuition)
With added convexity constraint $e^\top x=1$:
- $b$ becomes a convex combination of columns: $b=\sum_i x_i A_i$.
- Each basis corresponds to a simplex formed by $m+1$ points $(A_i,c_i)$.
Pivot = swap one vertex of the simplex (move to adjacent simplex).
Reduced costs correspond to “height below the dual plane”; negative reduced cost means a column lies below the dual plane and can improve.

## 11) Complexity (what to remember)
Per-iteration work is polynomial (depends on implementation), but:
- Number of pivots can be exponential in worst case (e.g., Klee–Minty-type).
In practice, simplex is typically fast; theory focuses on worst-case vs average-case behavior.

## 12) Minimal exam-ready checklist
- Given $B$: compute $x_B=B^{-1}b$ and decide feasibility.
- Compute reduced costs $\bar c_j=c_j-c_B^\top B^{-1}A_j$ and test optimality.
- If not optimal: compute $u=B^{-1}A_j$, do ratio test, pivot.
- Detect unboundedness: $u\le 0$.
- Explain degeneracy, $\theta^*=0$, and cycling avoidance.
- Explain Phase I logic: $w^*=0$ gives feasibility; then Phase II optimizes original objective.
