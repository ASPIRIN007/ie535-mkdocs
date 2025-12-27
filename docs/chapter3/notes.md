# Chapter 3 — The Simplex Method


## 3.1 Optimality conditions

We consider the **standard form** linear program:

$$
\min \; c^\top x \quad \text{s.t.}\quad Ax=b,\; x\ge 0,
$$

- $A$ is $m\times n$ and its **rows are linearly independent** (rank $m$).  
- $P=\{x\in\mathbb{R}^n\mid Ax=b,\;x\ge 0\}$ is the feasible set.  
- $A_i$ denotes the *i-th column* of $A$; $a_i^\top$ denotes the *i-th row* of $A$.

### 3.1.1 Local improvement is enough in LP
Many algorithms try to improve the objective by searching “nearby” feasible points.  
For general nonconvex problems, “no improving nearby move” only implies *local* optimality.  

For LP, **local optimality implies global optimality**, because:
- the objective $c^\top x$ is convex (actually linear), and
- the feasible set $P$ is convex.

So if, at a feasible point, you cannot move in any feasible direction that decreases cost, that point is optimal.

---

### 3.1.2 Feasible directions

**Definition (Feasible direction at $x$)**  
A vector $d\in\mathbb{R}^n$ is a feasible direction at $x\in P$ if there exists $\varepsilon>0$ such that
$$
x+\theta d \in P \quad \text{for all } \theta\in[0,\varepsilon].
$$

**Key constraints for a feasible direction**
- Equality constraints: since $Ax=b$, moving must keep $Ax$ unchanged:
  $$
  A(x+\theta d)=b\ \forall \theta \ \Rightarrow\ Ad=0.
  $$
- Nonnegativity: for each component where $x_i=0$, you cannot decrease it:
  $$
  x_i=0 \ \Rightarrow\ d_i\ge 0.
  $$
(That second condition is formalized later as an exercise in the book; it’s the clean algebraic description of Figure 3.1.)

---

### 3.1.3 Basic feasible solutions and “basic directions”

Let $x$ be a **basic feasible solution (BFS)**. That means:
- There is an index set of **basic variables** $B=\{B(1),\dots,B(m)\}$.
- The corresponding **basis matrix**
  $$
  B=[A_{B(1)}\ \cdots\ A_{B(m)}]
  $$
  is invertible.
- All **nonbasic** variables are at zero: $x_j=0$ for $j\notin B$.
- The basic variables satisfy:
  $$
  x_B = B^{-1}b.
  $$

Now pick a **nonbasic** index $j\notin B$.  
A natural “edge move” from a BFS is: increase $x_j$ from 0, while keeping all other nonbasic variables at 0.

Construct a direction $d$ by:
- $d_j=1$,
- $d_i=0$ for all other nonbasic $i\neq j$,
- choose $d_B$ so that $Ad=0$.

Since $Ad = Bd_B + A_j = 0$, we get the **basic-direction formula**:
$$
d_B = -B^{-1}A_j.
$$
This is equation (3.1) in the text.

> Intuition: increasing $x_j$ forces a compensating change in the basic variables so that $Ax=b$ remains true.

---

### 3.1.4 Degeneracy: a “basic direction” might not be feasible

Even if $Ad=0$, the move can violate $x\ge 0$.

- **Nondegenerate BFS**: $x_B>0$.  
  Then for small enough $\theta>0$, $x_B+\theta d_B\ge 0$ automatically, so the basic direction is feasible.

- **Degenerate BFS**: some basic variable is 0.  
  If that zero basic variable has a negative component in $d_B$, then $x_B+\theta d_B$ becomes negative immediately, so that basic direction is **not** feasible.  
  (This is what Figure 3.2 illustrates.)

**Subtle point:** Degeneracy breaks the “easy test” that “negative reduced cost ⇒ there is a feasible improving edge,” because the edge might point out of $P$.

---

### 3.1.5 Reduced costs

Suppose we move along the $j$-th basic direction $d$.  
The objective change rate is:

$$
c^\top d = c_B^\top d_B + c_j.
$$

Using $d_B=-B^{-1}A_j$,

$$
c^\top d = c_j - c_B^\top B^{-1}A_j.
$$

This motivates:

**Definition (Reduced cost of variable $x_j$)**
$$
\bar c_j \;=\; c_j - c_B^\top B^{-1}A_j.
$$

Interpretation:
- $c_j$: direct cost per unit increase in $x_j$.
- $-c_B^\top B^{-1}A_j$: induced cost from adjusting the basic variables to keep feasibility.

**Important fact:** reduced costs of *basic* variables are zero.  
Reason: if $j=B(i)$ is basic, then $B^{-1}A_{B(i)}=e_i$ (the $i$-th unit vector), so:
$$
\bar c_{B(i)} = c_{B(i)} - c_B^\top e_i = c_{B(i)}-c_{B(i)}=0.
$$

---

### 3.1.6 Example (as in the book’s Example 3.1)

For the LP:

$$
\min\ c_1x_1+c_2x_2+c_3x_3+c_4x_4
$$
$$
\text{s.t.}\quad 
x_1+x_2+x_3+x_4=2,\quad
2x_1+3x_3+4x_4=2,\quad x\ge 0,
$$

Choose $x_1,x_2$ basic. Then:

$$
B=\begin{bmatrix}1&1\\2&0\end{bmatrix},\qquad x_3=x_4=0.
$$
Solve $Bx_B=b$ to get $x_1=1,\ x_2=1$ (nondegenerate).

For entering $x_3$: $A_3=(1,3)^\top$.  
Direction:
$$
d_3=1,\ d_4=0,\ d_B=-B^{-1}A_3.
$$
The objective rate along this direction equals the reduced cost $\bar c_3$.

---

### 3.1.7 Optimality conditions (nondegenerate case)

**Theorem (Optimality conditions via reduced costs)**  
Let $x$ be a basic feasible solution associated with a basis $B$, and let $\bar c$ be the vector of reduced costs.

1. If $\bar c\ge 0$, then $x$ is optimal.  
2. If $x$ is optimal and **nondegenerate**, then $\bar c\ge 0$.

**Why it makes sense**
- $\bar c_j$ is the “slope” of the objective along the $j$-th basic direction.
- If every slope is $\ge 0$, then none of the edge directions improves the cost, so $x$ is optimal.
- If $x$ is nondegenerate and some $\bar c_j<0$, then that direction is feasible and decreases cost ⇒ $x$ cannot be optimal.

**Subtle but crucial warning (degeneracy):**  
An optimal **degenerate** BFS may still have some negative reduced costs, because the corresponding basic directions might not be feasible.

---


---

## 3.4 Anticycling: lexicography and Bland’s rule

### 3.4.1 Why cycling happens (degeneracy)

In the **nondegenerate** case, every pivot gives $\theta^*>0$, so the objective value strictly decreases and no basis can repeat (Theorem 3.3).

In the **degenerate** case, it can happen that the ratio test gives $\theta^*=0$.
Then:
- the **basis changes**, but
- the **basic feasible solution (the point $x$)** does not change, and
- the objective value does not improve.

After a sequence of such “zero-length pivots,” the algorithm can return to a previous basis and then repeat forever.  
This infinite loop is called **cycling**.

So, in degenerate problems, we need **pivoting rules** that guarantee:
- no basis is repeated, hence
- termination in finitely many pivots.

A key corollary of any anticycling rule is:

> If the optimal cost is finite, then there exists an **optimal basis**, i.e. a basis with  
> $B^{-1}b\ge 0$ and reduced costs $\bar c = c^\top - c_B^\top B^{-1}A \ge 0$.

---

### 3.4.2 Lexicographic order (definitions)

Let $u,v\in\mathbb{R}^k$.

- We say $u$ is **lexicographically smaller** than $v$ (write $u \prec v$) if, at the first index where they differ,
  the component of $u$ is smaller:
  - find the smallest $t$ such that $u_t\ne v_t$,
  - then $u\prec v$ iff $u_t < v_t$.

- We say $u$ is **lexicographically positive** if $u\succ 0$ (i.e., the first nonzero component of $u$ is positive).

Example comparisons (same style as in the book):
- $(0,2,3,0) \succ (0,2,1,4)$ because at the first difference (third component), $3>1$.
- $(0,4,5,0) \prec (1,2,1,2)$ because at the first component, $0<1$.

---

### 3.4.3 The lexicographic pivoting rule (full tableau form)

Assume we are using a **full tableau** (so each basic row is visible).

Fix an entering column $j$.  
Let the pivot column entries in the constraint rows be
$$
u_i = (B^{-1}A_j)_i.
$$

Among rows with $u_i>0$, the usual ratio test looks at $\dfrac{x_{B(i)}}{u_i}$ and chooses the minimum.
If there is a tie, the lexicographic rule breaks ties as follows:

**Lexicographic leaving rule:** choose the pivot row $\ell$ such that $u_\ell>0$ and
$$
\frac{\text{row }\ell}{u_\ell} \prec \frac{\text{row }i}{u_i}
\quad \text{for every } i\ne \ell \text{ with } u_i>0.
\tag{3.5}
$$

In words: divide each candidate row by its pivot-column entry, then pick the row whose normalized row is **lexicographically smallest**.

---

### 3.4.4 Example 3.7 (how tie-breaking works)

Suppose the pivot column is $j=3$.

Assume two rows tie in the ratio test:
$$
\frac{x_{B(1)}}{u_1} = \frac{1}{3},
\qquad
\frac{x_{B(3)}}{u_3} = \frac{3}{9} = \frac{1}{3}.
$$

So we divide the candidate rows by their pivot entries:
- row 1 divided by $u_1=3$,
- row 3 divided by $u_3=9$,

and then compare the normalized rows lexicographically.
If the comparison yields (as in the book) something like
$$
\frac{7}{9} < \frac{5}{3},
$$
then row 3 is lexicographically smaller, so **row 3 leaves**.

**Important subtle point:** under the standing assumption that $A$ has linearly independent rows, this rule leads to a **unique** leaving row.  
Reason (book’s argument): if two candidate normalized rows were identical, two rows of $B^{-1}A$ would be proportional, forcing $\mathrm{rank}(B^{-1}A)<m$, hence $\mathrm{rank}(A)<m$, contradicting independence of rows of $A$.

---

### 3.4.5 Why lexicographic pivoting prevents cycling (main idea)

The proof uses three facts (book’s structure):

1. **If constraint rows start lexicographically positive, they stay lexicographically positive.**  
   - Pivot row is divided by a positive number ⇒ stays lex-positive.  
   - For any other row with $u_i<0$, we add a **positive** multiple of the pivot row to eliminate the pivot entry ⇒ lex-positive stays lex-positive.  
   - For $u_i>0$ (and $i\ne \ell$), the lexicographic choice (3.5) guarantees the update keeps the row lex-positive.

2. **The objective (zeroth) row increases lexicographically at each pivot.**  
   At the start of an iteration, the reduced cost in the entering column is negative.
   To make it zero, we add a positive multiple of the pivot row to the objective row.
   Since the pivot row is lexicographically positive, the objective row becomes lexicographically larger.

3. **Therefore, no tableau repeats, hence no basis repeats.**  
   Because the objective row strictly increases lexicographically each iteration, it cannot return to a previous value.
   But for a fixed basis, the tableau (and objective row) is uniquely determined.
   So the basis can never repeat ⇒ **no cycling** ⇒ termination.

---

### 3.4.6 Bland’s rule (smallest-subscript pivoting)

Lexicographic pivoting is clean in a full tableau setting, but it is not very convenient in sophisticated revised simplex codes (where $B^{-1}$ is not explicitly formed).

A simpler anticycling rule is **Bland’s rule**:

**Bland’s entering rule:** among all eligible entering variables (for minimization: $\bar c_j<0$), choose the one with the **smallest index** $j$.

**Bland’s leaving rule:** apply the ratio test; among all ties for the minimum ratio, choose the leaving basic variable with the **smallest index**.

**Theorem (Bland).** If Bland’s rule is used, the simplex method cannot cycle and must terminate in finitely many pivots.

Practical meaning:
- Bland’s rule is easy to implement in revised simplex.
- It may take more iterations than aggressive pricing rules, but it gives a theoretical guarantee.

---

### 3.4.7 Practical notes

- **Lexicographic pivoting** is naturally expressed with a **full tableau** (where you can literally compare rows).
  It can be used with revised simplex only if you maintain enough tableau-like information (e.g., explicit $B^{-1}$), which many modern sparse implementations avoid.

- **Bland’s rule** is the simplest “always safe” fallback when degeneracy causes stalling/cycling concerns.




---

## 3.5 Finding an initial basic feasible solution (initial BFS)

### 3.5.1 The problem: simplex needs a starting BFS

The simplex method (Sections 3.2–3.4) assumes we start from a **basic feasible solution** (BFS):
- choose a basis matrix $B$ (invertible),
- set $x_N=0$,
- compute $x_B=B^{-1}b$,
- and require $x_B\ge 0$.

Sometimes a BFS is **obvious**; often it is not.

---

### 3.5.2 Easy case: inequalities with nonnegative right-hand side

If the original constraints are of the form
$$
Ax \le b, \quad b\ge 0,
$$
introduce **slack variables** $s\ge 0$:
$$
Ax+s=b.
$$

Then the point
- $x=0$,
- $s=b$,

is feasible, and the basis matrix is the identity (columns of $s$).  
So we immediately have a BFS.

---

### 3.5.3 General case: use an auxiliary (Phase I) problem

Now consider standard form
$$
\min\ c^\top x \quad \text{s.t.}\quad Ax=b,\; x\ge 0,
$$
and assume (after possibly multiplying some equalities by $-1$) that
$$
b\ge 0.
$$

If there is no obvious BFS, we introduce **artificial variables**
$$
y\in\mathbb{R}^m,\quad y\ge 0,
$$
and solve the **auxiliary problem** (Phase I):

$$
\min\ \sum_{i=1}^m y_i
\quad \text{s.t.}\quad
Ax + y = b,\;
x\ge 0,\; y\ge 0.
\tag{Phase I}
$$

#### Why this works (the key logic)

1) **Phase I is always easy to initialize.**  
Set $x=0$ and $y=b$.
Then $Ax+y=b$ holds and $y\ge 0$.  
The basis matrix is the identity (columns of $y$), so this is a BFS.

2) **If the original problem is feasible, Phase I optimum is 0.**  
If there exists some $x\ge 0$ with $Ax=b$, then choosing that $x$ and $y=0$ is feasible for Phase I and gives objective 0.  
Since $\sum y_i\ge 0$ always, the optimal Phase I value must be 0.

3) **If Phase I optimum is positive, the original problem is infeasible.**  
Because we could not drive all $y_i$ to zero, there is no $x\ge 0$ that satisfies $Ax=b$.

So Phase I is a **feasibility detector** and also provides a feasible point for the original LP when feasible.

---

### 3.5.4 The two-phase simplex method (algorithm form)

**Phase I**
1. Multiply some equalities by $-1$ so that $b\ge 0$.
2. Add artificial variables $y_1,\dots,y_m$ and solve the auxiliary LP
   $$
   \min\ \sum_{i=1}^m y_i
   \quad \text{s.t.}\quad
   Ax+y=b,\; x\ge 0,\; y\ge 0.
   $$
3. If the optimal value is $>0$, stop: the original LP is **infeasible**.
4. If the optimal value is $0$, we have found a feasible solution with $y=0$.
   - If **no artificial variable is basic** in the final basis, drop the $y$-columns and start Phase II.
   - If **some artificial variable is still basic** (necessarily with value 0), proceed to Step 5.
5. **Drive artificial variables out of the basis** (or remove redundant constraints):
   - Let the $\ell$-th basic variable be artificial ($y_\ell$).
   - Look at the $\ell$-th row of the current tableau (equivalently the $\ell$-th row of $B^{-1}A$).
     - If all entries in that row for the original columns are zero, then that equality is **redundant** and can be eliminated (drop the row).
     - Otherwise, pick a column $A_j$ whose entry in that row is nonzero and pivot so that $x_j$ enters and $y_\ell$ leaves.
   - Repeat until all artificial variables are nonbasic.

**Phase II**
1. Use the final basis from Phase I (containing only columns of $A$) as the starting basis.
2. Recompute reduced costs using the original cost vector $c$.
3. Run simplex on the original LP.

---

### 3.5.5 A complete worked example (two-phase, full tableau style)

Consider the LP
$$
\min\ z = x_1 + 2x_2
$$
subject to
$$
\begin{aligned}
x_1 - x_2 &= 1,\\
x_1 + x_2 + x_3 &= 3,\\
x_1,x_2,x_3 &\ge 0.
\end{aligned}
$$

There is no obvious BFS for $Ax=b$ (you cannot set $x=0$).

#### Phase I: add artificial variables
Introduce $y_1,y_2\ge 0$:
$$
\begin{aligned}
x_1 - x_2 + y_1 &= 1,\\
x_1 + x_2 + x_3 + y_2 &= 3.
\end{aligned}
$$
Phase I objective:
$$
\min\ w = y_1+y_2.
$$

Start BFS: $x=0$, $y=b=(1,3)$.

Running tableau pivots (as shown earlier in chat), Phase I ends at
$$
(x_1,x_2,x_3,y_1,y_2)=(2,1,0,0,0),
$$
so $w^*=0$ and the original constraints are feasible.

#### Phase II: drop $y$ and optimize original $z$
Using the Phase I final basis as the starting basis, Phase II yields the optimal solution
$$
(x_1,x_2,x_3)=(1,0,2),\qquad z^*=1.
$$

**What to remember from this example**
- Phase I is only about forcing $y\to 0$ (feasibility).
- Phase II reuses the found feasible basis and then optimizes the true cost.

---

### 3.5.6 The big-$M$ method (single-phase alternative)

Instead of two phases, we combine them by penalizing artificial variables in the objective:

$$
\min\ \sum_{j=1}^n c_j x_j + M\sum_{i=1}^m y_i,
$$

subject to
$$
Ax+y=b,\quad x\ge 0,\ y\ge 0,
$$
where $M$ is a “very large” positive constant.

**Meaning**
- The term $M\sum y_i$ makes it extremely expensive to keep $y_i>0$.
- If the original problem is feasible and has a finite optimum, the algorithm drives $y\to 0$ and then behaves like minimizing $c^\top x$.

**Important implementation idea (used in the book):**  
Treat $M$ symbolically as a parameter and compare expressions like $-8M+1$ as negative for “$M$ large enough,” without fixing a numeric value.

---

### 3.5.7 Comparison: two-phase vs big-$M$

Two-phase simplex:
- Clean separation: Phase I finds feasibility, Phase II optimizes.
- Numerically stable and standard in solvers.

Big-$M$:
- One phase, simpler conceptually.
- Can be numerically troublesome if $M$ is taken as a huge number in floating point arithmetic.
- Using symbolic $M$ avoids choosing a specific value but is mainly a textbook device.




---

## 3.6 The geometry of the simplex method (column geometry)

This section gives a geometric interpretation of simplex that explains (i) what a **basis** means geometrically, and (ii) why reduced costs control the choice of entering variables.

### 3.6.1 Add a convexity constraint

The book considers the problem

$$
\min\ c^\top x
\quad \text{s.t.}\quad
Ax=b,\; e^\top x=1,\; x\ge 0,
\tag{3.6}
$$

where $e$ is the all-ones vector.

- The constraint $e^\top x=1$ is called the **convexity constraint**.
- Although it looks restrictive, the book notes that **any bounded feasible set** can be transformed into this form (Exercise 3.28).  
  The point is: the geometry they build is easiest to see when $x$ is a **convex combination**.

Define an auxiliary scalar variable
$$
z=c^\top x.
$$

---

### 3.6.2 Lift the columns into one higher dimension

Let $A_1,\dots,A_n$ be the columns of $A$ and $c_1,\dots,c_n$ be the cost coefficients.

Because $x\ge 0$ and $\sum_i x_i=1$,
$$
Ax = \sum_{i=1}^n x_i A_i = b,
$$
so $b$ is a **convex combination** of the column vectors $A_i$.

Also
$$
z=c^\top x = \sum_{i=1}^n x_i c_i.
$$

So the pair $(b,z)$ is a convex combination of the lifted points
$$
(A_i,c_i)\in\mathbb{R}^{m+1}.
$$

This is the **column geometry** picture:
- Horizontal space: $\mathbb{R}^m$ containing the columns $A_i$ and the point $b$.
- Vertical axis: the cost coordinate $z$.

Each feasible solution corresponds to a point $(b,z)$ on a vertical line above $b$.

---

### 3.6.3 Requirement line and feasibility

The vertical line through $(b,\cdot)$ is the **requirement line**.

Let $H$ be the convex hull of the lifted points:
$$
H = \mathrm{conv}\{(A_1,c_1),\dots,(A_n,c_n)\}.
$$

- The LP is feasible iff the requirement line intersects $H$.
- Among all intersection points, the optimal solution corresponds to the **lowest** point on that intersection (smallest $z$).

So:

**Feasibility:** requirement line intersects $H$.  
**Optimality:** lowest intersection point.

(This is exactly what Figure 3.6 is showing.)

---

### 3.6.4 Affine independence and simplices (Definition 3.6)

A collection of vectors $y^1,\dots,y^{k+1}\in\mathbb{R}^n$ is **affinely independent** if
$$
y^1-y^{k+1},\ y^2-y^{k+1},\ \dots,\ y^k-y^{k+1}
$$
are linearly independent.

The convex hull of $k+1$ affinely independent points is a **$k$-dimensional simplex**:
- $k=1$: line segment
- $k=2$: triangle
- $k=3$: tetrahedron/pyramid
- etc.

---

### 3.6.5 BFS and the “basic simplex”

In problem (3.6), there are $m+1$ equality constraints ($Ax=b$ gives $m$, plus $e^\top x=1$ gives one more).
So a BFS corresponds to choosing $m+1$ basic variables (equivalently $m+1$ basic points).

Geometrically:
- A basis corresponds to selecting $m+1$ lifted points $(A_{B(i)},c_{B(i)})$ that are affinely independent.
- Their convex hull is an **$m$-dimensional simplex**, called the **basic simplex**.
- The current point $(b,z)$ is written as a convex combination of these basic points; the coefficients are the basic variables.

The remaining points are **nonbasic points**.

---

### 3.6.6 Change of basis = move to an adjacent simplex

A simplex pivot replaces one basic point by one nonbasic point:
- one point enters the basic simplex (entering variable),
- one point leaves it (leaving variable).

So simplex “walks” from one basic simplex to a neighboring one along the boundary of the convex hull.

---

### 3.6.7 Dual plane and reduced costs (key link)

Take the current basic simplex. The lifted basic points lie on an $m$-dimensional hyperplane in $\mathbb{R}^{m+1}$.
The book calls the hyperplane through these basic points the **dual plane**.

Now pick a candidate entering point $(A_j,c_j)$.
- If $(A_j,c_j)$ lies **below** the dual plane, then moving to a new basis that includes it can lower the achieved height (cost).
- If it lies **above** the dual plane, it is not profitable.

The book states the geometric equivalence:

> “Point $(A_j,c_j)$ is below the dual plane”  
> $\Longleftrightarrow$  
> “Reduced cost of $x_j$ is negative” (for minimization).

So reduced cost is literally a **signed vertical distance** from the dual plane to the candidate point.

---

### 3.6.8 Pivoting as “hinging” (physical analogy)

Think of the current basic simplex as a rigid face (triangle/pyramid/etc.).
- The requirement line intersects it at the current BFS point.
- When a new point enters, the simplex changes by “hinging” about a shared edge (face),
  moving the intersection point up or down.

A profitable pivot is one that makes the new simplex **lower** (decreases cost).

---

### 3.6.9 Example 3.10 (why simplex can be fast)

For the case $m=1$, the geometry becomes two-dimensional.
The book gives an example where the optimal basis is found in **two pivots**, even though there may be many variables $n$.

This motivates the practical observation:
- simplex often needs **few pivots** relative to problem size, despite worst-case examples.

---

## 3.7 Computational efficiency of the simplex method

The computational effort of simplex depends on:

1. **Work per iteration**
2. **Number of iterations**

Section 3.3 already discussed (1). Here the focus is mostly on (2), while summarizing (1).

---

### 3.7.1 Work per iteration (recap)

- Full tableau: about $O(mn)$ arithmetic per iteration (updating a size $m\times n$ tableau).
- Revised simplex: basis solves and updates are about $O(m^2)$ per iteration, with reduced-cost computation ranging from $O(m)$ to $O(mn)$ depending on pricing strategy and sparsity.

So per-iteration cost can be controlled; the main theoretical difficulty is the number of pivots.

---

### 3.7.2 Worst-case number of iterations can be exponential

The book discusses a construction where simplex visits an exponentially long path of adjacent vertices.

Start with the $n$-dimensional unit cube:
$$
0\le x_i\le 1,\quad i=1,\dots,n,
$$
which has $2^n$ vertices.

There exists a **spanning path** that visits all $2^n$ vertices by moving along edges (Figures 3.8(a),(b) illustrate this for $n=2,3$).
With an appropriate objective and a suitable pivot rule, simplex can be forced to follow such a path.

To make the objective strictly decrease each step, the book perturbs the cube with constraints (for some small $\varepsilon\in(0,1/2)$):

$$
\varepsilon\le x_1\le 1,
\tag{3.7}
$$

$$
\varepsilon x_{i-1} \le x_i \le 1-\varepsilon x_{i-1},
\quad i=2,\dots,n.
\tag{3.8}
$$

Then one can choose a cost (book uses $-x_n$) so that the simplex method decreases cost at every move along that spanning path.

**Theorem 3.3 (worst case).**  
For the LP that minimizes $-x_n$ subject to (3.7)–(3.8):
- the feasible set has $2^n$ vertices,
- there is a pivot rule under which simplex requires $2^n-1$ basis changes before terminating.

So worst-case pivots are exponential in $n$.

---

### 3.7.3 Diameter of polyhedra and the Hirsch conjecture

To relate “number of pivots” to geometry, define adjacency graph distance.

- Two vertices are **adjacent** if connected by an edge.
- Let $d(x,y)$ be the minimum number of edges in a path from $x$ to $y$.
- The **diameter** of a polyhedron $P$ is
  $$
  D(P) = \max_{x,y\text{ vertices}} d(x,y).
  $$

Define:
- $\Delta(n,m)$ = maximum possible diameter over all **bounded** polyhedra in $\mathbb{R}^n$ described by $m$ linear inequalities.
- $\Delta_u(n,m)$ = same but allowing **unbounded** polyhedra.

If every bounded polyhedron had diameter polynomial in $m,n$, then there would always exist a short vertex-to-vertex path, suggesting that an edge-following method might be polynomial with a good rule.
However, simplex’s pivot rule might still fail to find the short path.

**Hirsch conjecture (as stated in the book):**
$$
\Delta(n,m) \le m-n.
$$

The book notes:
- Hirsch is **false for unbounded** polyhedra (Klee and Walkup, 1967), and gives a lower bound:
  $$
  \Delta_u(n,m) \ge m-n+\left\lfloor\frac{n}{5}\right\rfloor.
  $$
- Worst-case upper bounds exist but are still large; the book quotes bounds of the form
  $$
  \Delta(n,m) \le \Delta_u(n,m) \le m^{1+\log_2 n} = (2n)^{\log_2 m}.
  $$

So the true growth of diameters (and its relation to polynomial-time behavior) is subtle.

---

### 3.7.4 Average-case behavior (why practice looks good)

Worst-case results do not explain practical performance.

The “average-case” question is hard because:
- we must define a probability distribution over LP instances,
- different distributions give different behavior.

The book mentions positive results under certain random models:
- randomly chosen $c$, $A$, and $b$,
- constraints of the form $a_i^\top x\le b_i$ or $a_i^\top x\ge b_i$ with equal probability,
- conditioned on feasibility, simplex can have expected pivot count that grows moderately (often near linear in $n$ for fixed $m$).

Main point:
- **simplex is not polynomial in the worst case**, but
- **it is often efficient in practice**, and explaining this rigorously is a major research topic.




---

## 3.8 Summary (what to memorize for exams)

This chapter developed the simplex method as a complete algorithm for LPs in standard form.

### 3.8.1 The “big picture” of simplex

- The feasible set $P=\{x\mid Ax=b,\ x\ge 0\}$ is a polyhedron.
- Simplex moves from one **basic feasible solution** (vertex/extreme point) to another along **edges**.
- Each pivot is a **basis change**: one nonbasic variable enters, one basic variable leaves.

---

### 3.8.2 Core mathematical ingredients

#### (a) Reduced costs and optimality (Section 3.1)

For a basis $B$:

- Basic solution: $x_B=B^{-1}b$, $x_N=0$.
- Reduced cost:
  $$
  \bar c_j = c_j - c_B^\top B^{-1}A_j.
  $$

Key optimality condition:
- If $\bar c_j\ge 0$ for all nonbasic $j$, the BFS is optimal.
- If BFS is nondegenerate and some $\bar c_j<0$, then there is a feasible improving edge.

#### (b) Pivot mechanics (Section 3.2)

Given an entering index $j$:

- Direction: $d_B=-B^{-1}A_j$ and $d_j=1$.
- Ratio test:
  $$
  \theta^* = \min_{i: (B^{-1}A_j)_i>0}\ \frac{(x_B)_i}{(B^{-1}A_j)_i}.
  $$

- Leaving variable is the one achieving the minimum.
- If no component of $B^{-1}A_j$ is positive, then $d\ge 0$ and $c^\top d<0$ ⇒ objective is unbounded below ($-\infty$).

---

### 3.8.3 Implementation styles (Section 3.3)

Three equivalent bookkeeping styles:

1. **Naive:** form $B^{-1}$ explicitly each iteration (mostly educational).
2. **Revised simplex:** store $B$ (or its factorization) and compute:
   - $x_B$ by solving $Bx_B=b$,
   - simplex multipliers $p$ by solving $B^\top p=c_B$,
   - reduced costs by $\bar c_j=c_j-p^\top A_j$,
   - pivot column by solving $Bu=A_j$.
3. **Full tableau:** maintain a tableau containing $B^{-1}A$ and $B^{-1}b$, update by row operations.

Memory/time tradeoff:
- Full tableau uses $O(mn)$ storage and about $O(mn)$ work per pivot.
- Revised simplex uses $O(m^2)$ basis storage (plus sparse $A$) and can be much more efficient in large problems.

---

### 3.8.4 Degeneracy, cycling, and anticycling (Section 3.4)

Degeneracy causes:
- $\theta^*=0$ pivots (basis changes without moving in $x$),
- potential **cycling** (infinite repetition of bases).

Anticycling rules:
- **Lexicographic pivoting:** break ratio ties by lexicographic row comparison; guarantees no repetition.
- **Bland’s rule:** smallest-index entering variable; smallest-index leaving among ratio ties; guarantees termination.

---

### 3.8.5 How to start: initial BFS (Section 3.5)

If a BFS is not obvious:
- Solve a **Phase I auxiliary LP** using artificial variables $y\ge 0$:

$$
\min\ \sum_{i=1}^m y_i
\quad \text{s.t.}\quad
Ax+y=b,\;
x\ge 0,\ y\ge 0.
$$

- If the optimal Phase I value is $>0$: original LP infeasible.
- If Phase I optimum is $0$: obtain a feasible basis for Phase II (drive artificial variables out if needed).

Alternative: **big-$M$ method** (one-phase), but can be numerically delicate.

---

### 3.8.6 Geometry intuition (Section 3.6)

With the convexity constraint $e^\top x=1$:
- feasible solutions correspond to intersections of a vertical **requirement line** through $b$ with the convex hull of lifted points $(A_i,c_i)$,
- each basis corresponds to an $m$-dimensional **basic simplex** (simplex face),
- reduced costs determine whether a candidate point lies below the **dual plane** (profitable entering variable).

---

### 3.8.7 Efficiency story (Section 3.7)

Simplex performance depends on:
- work per iteration (tableau vs revised simplex),
- number of iterations.

Theory:
- worst-case number of pivots can be exponential ($2^n-1$ for certain families),
- geometric concepts like polyhedron **diameter** relate to shortest possible vertex paths,
- average-case behavior is more subtle and depends on the distribution of instances, but simplex is often efficient in practice.

---

## 3.2–3.8 Placeholders (to be filled next)

*(Removed — Chapter 3 notes are now complete from 3.1 to 3.8.)*

