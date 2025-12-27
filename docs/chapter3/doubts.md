```md
# Quick fixes for recurring confusions

## 1) “How can a vector $x$ have a rank? It’s not a matrix.”
**Fix:** A *vector* doesn’t have rank (in the matrix-rank sense).  
When notes say something like “rank of $x$ is $k$”, they almost always mean one of these:

- **Rank of a matrix built from vectors**, e.g., rank of $[v_1\ \cdots\ v_k]$.
- **Number of linearly independent active constraint normals** at $x$.
- **Dimension of the affine hull** of a set (sometimes loosely called “rank” in informal lecture talk).

If you show me the exact sentence again, we can map it to the correct interpretation.

---

## 2) “Why does local optimality imply global optimality in LP?”
Because:
- $P$ is a **convex set** (intersection of a plane $Ax=b$ with halfspaces $x\ge 0$), and
- the objective $c^\top x$ is **convex** (linear).

So if there is no feasible direction with $c^\top d<0$ at a feasible point, you are globally optimal.

---

## 3) “They say $c^\top y \ge v$ and $c^\top z \ge v$ implies $c^\top y=v$ and $c^\top z=v$. Why?”
That implication is **not automatically true** for arbitrary $y,z$. It’s true only if:
- $v$ is defined as the **optimal value** (the minimum of $c^\top x$ over the feasible set), and
- $y$ and $z$ are both **optimal solutions** (i.e., they *attain* the minimum).

Then by definition:

$$
v \le c^\top y,\quad v \le c^\top z,
$$

and if $y,z$ are optimal, equality holds:

$$
c^\top y=v,\quad c^\top z=v.
$$

---

## 4) “What do we gain by writing $c^\top y=v$? Isn’t it just choosing $\lambda=1$ so $y=x^*$?”
The gain is that $y$ and $z$ can be **distinct** optimal points.  
If the objective is flat along a face, there are infinitely many optimal points on that face. Showing multiple points achieve the same $v$ is a key step in arguments about:
- optimal faces,
- extreme points,
- expressing an optimal point as a convex combination of corners.

---

## 5) “How does ‘$x^*$ is a corner/extreme point’ solve a contradiction?”
Typical structure of those proofs:
- Assume an optimal solution is **not** at a corner.
- Then you can write it as a strict convex combination of two distinct feasible points.
- Because the objective is linear, the objective value at the combination is the same convex combination of objective values.
- If the combination is optimal, that forces the endpoints to be optimal too.
- This contradicts “not a corner” (or forces a descent direction), depending on the theorem.

So “corner” matters because corners cannot be decomposed nontrivially into two different feasible points.

---

## 6) “If an LP has $m$ constraints and $n$ variables, what does rank tell us about existence?”
Careful: there are multiple “systems” here.

- For **equality constraints** $Ax=b$, feasibility depends on whether $b$ lies in the column space of $A$.  
  - If $\mathrm{rank}(A)<m$, it does **not** automatically mean infeasible. It means some rows are dependent (constraints redundant or inconsistent depending on $b$).  
  - In general: feasibility $\iff$ $Ax=b$ is consistent.

- For standard form $Ax=b, x\ge 0$, feasibility is stricter: even if $Ax=b$ is consistent, you may have **no nonnegative** solution.

---

## 7) “Set $S$ is convex — what exactly does that mean?”
Definition:

$$
S \text{ convex } \iff \forall x,y\in S,\ \forall \lambda\in[0,1],\ \lambda x+(1-\lambda)y\in S.
$$

Geometric meaning: line segment between any two points in $S$ stays inside $S$.

---

## 8) “Why do we introduce reduced costs in simplex?”
Reduced cost $\bar c_j$ is the **instantaneous rate** of objective change when we try to increase a nonbasic variable $x_j$ from zero while keeping feasibility:

$$
\bar c_j = c_j - c_B^\top B^{-1}A_j.
$$

- If $\bar c_j < 0$ and the BFS is nondegenerate, then moving in that basic direction decreases cost (profitable entering variable).
- If all $\bar c_j \ge 0$, no edge from that BFS improves the cost $\Rightarrow$ optimal (nondegenerate case).

---

### Add more doubts as we go
Whenever you ask a question that feels like a “recurring confusion,” I’ll append it here with the cleanest explanation + any small example we used.

---

## 11) “What is cycling in simplex and how do anticycling rules fix it?”
Cycling happens only in **degenerate** LPs.

- In a degenerate BFS, the ratio test can give $\theta^*=0$.
- Then the **basis changes** but the **point $x$ does not move**.
- After several such zero-length pivots, simplex can return to an earlier basis and repeat forever.

Anticycling rules guarantee that **no basis repeats**, so the method must terminate.

Two standard anticycling rules in this chapter:
- **Lexicographic pivoting:** break ratio-test ties by comparing normalized tableau rows lexicographically; this makes the objective row increase lexicographically each pivot, so repetition is impossible.
- **Bland’s rule:** choose the entering variable with smallest index, and among tied leaving choices choose the smallest index; this also prevents cycling.

---

## 12) “What is the auxiliary-variable (Phase I) method, and why minimize $\sum y_i$?”
When the LP is in standard form

$$
Ax=b,\quad x\ge 0,
$$

we may not have an obvious starting BFS. We introduce artificial variables $y\ge 0$ and solve:

$$
\min\ \sum_{i=1}^m y_i
\quad \text{s.t.}\quad
Ax+y=b,\;
x\ge 0,\ y\ge 0.
$$

- This auxiliary LP always has an easy BFS: $x=0$, $y=b$ (assuming $b\ge 0$).
- If the original system has a feasible $x\ge 0$ with $Ax=b$, then $(x,0)$ is feasible for the auxiliary LP and gives objective 0.
- Because $\sum y_i\ge 0$, the auxiliary optimum is 0 **iff** the original problem is feasible.

So Phase I is both a **feasibility test** and a way to produce a feasible starting basis for Phase II.

---

## 13) “Phase I ended with an artificial variable still basic (value 0). What do we do?”
This happens under degeneracy. If an artificial variable $y_\ell$ is basic but equals 0 at the end of Phase I:

- Look at the corresponding row (the $\ell$-th row) of $B^{-1}A$.
- If all entries in that row (for original columns) are 0, the equality constraint is **redundant**, so you can drop that row.
- Otherwise, pick a column with a nonzero entry in that row and pivot so that an original variable enters and the artificial variable leaves.

Repeat until all artificial variables are out of the basis.

---

## 14) “Big-$M$ vs two-phase simplex — what’s the difference?”
- **Two-phase simplex:** solve Phase I (minimize $\sum y_i$) to get feasibility; then Phase II solves the original objective starting from that feasible basis.
- **Big-$M$:** solve one LP with objective $c^\top x + M\sum y_i$ where $M$ is huge, so the method prioritizes driving $y$ to zero.

In practice, two-phase is often preferred for numerical stability (big-$M$ can require dangerously large constants in floating point arithmetic).

---

## 15) “Why do they add the convexity constraint $e^\top x=1$ in the geometry section?”
With $x\ge 0$ and $e^\top x=1$, the vector $x$ becomes a set of **convex combination weights**.

Then:

$$
b=Ax=\sum_i x_i A_i
$$

means $b$ lies in the convex hull of the columns $A_i$, and

$$
z=c^\top x=\sum_i x_i c_i
$$

means $(b,z)$ lies in the convex hull of the lifted points $(A_i,c_i)$.

That makes the geometry clean: feasibility becomes “does the vertical requirement line through $b$ intersect the convex hull?”
The book notes that any bounded LP can be transformed into this form (exercise), so this picture still has general meaning.

---

## 16) “What is the requirement line?”
It is the vertical line in $(m+1)$-dimensional space:

$$
\{(b,z)\mid z\in\mathbb{R}\},
$$

where $b$ is fixed by the constraints $Ax=b$.
Feasible solutions correspond to intersection points of this line with the convex hull of $(A_i,c_i)$, and the optimal solution is the lowest intersection point.

---

## 17) “What is the dual plane, and why is ‘below the plane’ the same as negative reduced cost?”
The basic points $(A_{B(i)},c_{B(i)})$ lie on an $m$-dimensional hyperplane (dual plane).
A candidate point $(A_j,c_j)$ lying below that plane means that swapping it into the basis can lower the intersection height on the requirement line.

Algebraically, “below the plane” is equivalent to $\bar c_j<0$ (for minimization), so reduced cost is a signed vertical distance from the dual plane.

---

## 18) “How can simplex be fast in practice if worst-case is exponential?”
Worst-case examples force simplex to walk an exponentially long path of vertices.
But typical real LPs have structure and good pivot rules often reach optimality in far fewer pivots.

Theory section 3.7 separates:
- **per-iteration work** (handled by revised simplex / sparsity), and
- **number of iterations** (can be exponential in worst case).

Average-case behavior depends on the probabilistic model for “random LP,” so it’s harder to state universal guarantees.
```
