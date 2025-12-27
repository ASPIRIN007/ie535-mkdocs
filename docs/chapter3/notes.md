# Chapter 3 — The Simplex Method

!!! info "Key box — Standard form + what this chapter does"
    We study the simplex method for the **standard form** LP  
    $\min\; c^\top x \ \text{s.t.}\ Ax=b,\ x\ge 0$,  
    where $A\in\mathbb{R}^{m\times n}$ has **linearly independent rows** (rank $m$).  
    The feasible set is the polyhedron $P=\{x\in\mathbb{R}^n\mid Ax=b,\ x\ge 0\}$.

!!! tip "Notation box"
    - $A_i$ = $i$-th column of $A$  
    - $a_i^\top$ = $i$-th row of $A$  
    - $e$ = all-ones vector  
    - For a basis index set $B=\{B(1),\dots,B(m)\}$, the basis matrix is $B=[A_{B(1)}\ \cdots\ A_{B(m)}]$.

---

## 3.1 Optimality conditions

### 3.1.1 Local improvement is enough in LP

!!! info "Key box — Why local = global in LP"
    For LPs:
    - the objective $c^\top x$ is **linear** (hence convex), and  
    - the feasible set $P$ is **convex** (intersection of an affine set $Ax=b$ with halfspaces $x\ge 0$).
    
    Therefore, if at a feasible point you cannot move in any feasible direction that decreases the cost, that point is **globally optimal**.

---

### 3.1.2 Feasible directions

!!! tip "Definition box — Feasible direction at $x$"
    A vector $d\in\mathbb{R}^n$ is a **feasible direction** at $x\in P$ if there exists $\varepsilon>0$ such that  
    $x+\theta d \in P$ for all $\theta\in[0,\varepsilon]$.

!!! note "Key box — What feasibility forces in standard form"
    Since feasibility means **both** $Ax=b$ and $x\ge 0$:

    - **Equality constraints:** $Ax=b$ must remain true along the move, so  
      $A(x+\theta d)=b\ \forall\theta \ \Longrightarrow\ Ad=0$.

    - **Nonnegativity:** if a component is at zero, you cannot move it negative, so  
      $x_i=0\ \Longrightarrow\ d_i\ge 0$.
    
    (This second condition is the clean algebraic version of Figure 3.1.)

---

### 3.1.3 Basic feasible solutions and “basic directions”

!!! tip "Definition box — Basis and basic solution (standard form)"
    Choose an index set $B=\{B(1),\dots,B(m)\}$ such that the matrix  
    $B=[A_{B(1)}\ \cdots\ A_{B(m)}]$  
    is invertible.  
    Set all **nonbasic** variables to zero: $x_j=0$ for $j\notin B$.  
    Then the **basic variables** satisfy $x_B=B^{-1}b$.  
    This $x$ is a **basic solution**. If additionally $x_B\ge 0$, it is a **basic feasible solution (BFS)**.

!!! note "Key box — Basic direction associated with a nonbasic index $j\notin B$"
    From a BFS, a natural “edge move” is to increase one nonbasic variable $x_j$ from $0$ while keeping all other nonbasic variables at $0$.

    Construct a direction $d$ by:
    - $d_j=1$,
    - $d_i=0$ for all other nonbasic $i\neq j$,
    - choose $d_B$ so that the equality constraints stay satisfied: $Ad=0$.

    Since $Ad = Bd_B + A_j = 0$, we obtain the **basic-direction formula**  
    $d_B=-B^{-1}A_j$.  
    (This is equation (3.1) in the text.)

!!! info "Intuition box"
    Increasing $x_j$ forces a compensating change in the basic variables so that $Ax=b$ remains true.

---

### 3.1.4 Degeneracy: a “basic direction” might not be feasible

!!! tip "Definition box — Degeneracy"
    A BFS is:
    - **nondegenerate** if $x_B>0$ (all basic variables strictly positive),
    - **degenerate** if some basic variable equals $0$.

!!! warning "Key box — Why degeneracy matters for feasibility of directions"
    Even if $Ad=0$, moving along $d$ can violate $x\ge 0$.

    - If the BFS is **nondegenerate** ($x_B>0$), then for sufficiently small $\theta>0$, we still have  
      $x_B+\theta d_B \ge 0$,  
      so the basic direction is feasible.

    - If the BFS is **degenerate** (some basic component is $0$), and the corresponding component of $d_B$ is negative, then $x_B+\theta d_B$ becomes negative immediately for any $\theta>0$.  
      So that “basic direction” is **not** feasible.

!!! note "Subtle point box"
    Degeneracy breaks the naive implication “negative reduced cost $\Rightarrow$ feasible improving edge,” because the candidate edge direction might point out of $P$.

---

### 3.1.5 Reduced costs

!!! tip "Definition box — Reduced cost"
    Along the $j$-th basic direction $d$, the objective change rate is  
    $c^\top d = c_B^\top d_B + c_j$.  
    Using $d_B=-B^{-1}A_j$ gives  
    $c^\top d = c_j - c_B^\top B^{-1}A_j$.  
    This motivates the **reduced cost**  
    $\bar c_j = c_j - c_B^\top B^{-1}A_j$.

!!! info "Key box — Interpretation"
    - $c_j$ = direct cost change from increasing $x_j$  
    - $-c_B^\top B^{-1}A_j$ = induced cost from adjusting basic variables to keep $Ax=b$

!!! note "Key box — Reduced costs of basic variables are zero"
    If $j=B(i)$ is basic, then $B^{-1}A_{B(i)}=e_i$, hence  
    $\bar c_{B(i)} = c_{B(i)} - c_B^\top e_i = c_{B(i)}-c_{B(i)}=0$.

---

### 3.1.6 Example (as in Example 3.1)

!!! note "Key box — Setup"
    Consider $\min\ c_1x_1+c_2x_2+c_3x_3+c_4x_4$ subject to  
    $x_1+x_2+x_3+x_4=2$,  
    $2x_1+3x_3+4x_4=2$, and $x\ge 0$.

!!! note "Key box — Choose a basis and compute the BFS"
    Choose $x_1,x_2$ basic. Then  
    $B=\begin{bmatrix}1&1\\2&0\end{bmatrix}$ and $x_3=x_4=0$.  
    Solve $Bx_B=b$ to get $x_1=1,\ x_2=1$ (nondegenerate).

!!! note "Key box — Entering $x_3$"
    For entering $x_3$, with $A_3=(1,3)^\top$:  
    $d_3=1,\ d_4=0,\ d_B=-B^{-1}A_3$.  
    The objective rate along this direction is $\bar c_3$.

---

### 3.1.7 Optimality conditions (nondegenerate case)

!!! info "Theorem box — Optimality via reduced costs"
    Let $x$ be a BFS associated with a basis $B$, and let $\bar c$ be the vector of reduced costs.

    1. If $\bar c\ge 0$, then $x$ is optimal.  
    2. If $x$ is optimal and **nondegenerate**, then $\bar c\ge 0$.

!!! note "Key box — Why this is true (conceptual)"
    - $\bar c_j$ is the slope of the objective along the $j$-th basic direction.  
    - If every slope is $\ge 0$, no edge direction improves the cost $\Rightarrow$ optimal.  
    - If nondegenerate and some $\bar c_j<0$, that direction is feasible and decreases cost $\Rightarrow$ not optimal.

!!! warning "Key box — Degenerate exception"
    An optimal **degenerate** BFS may still have some negative reduced costs, because the corresponding basic directions might not be feasible.

---

## 3.4 Anticycling: lexicography and Bland’s rule

### 3.4.1 Why cycling happens (degeneracy)

!!! tip "Definition box — Cycling"
    **Cycling** means simplex repeats a previously visited **basis** and can loop forever.

!!! note "Key box — Mechanism"
    - In the **nondegenerate** case, each pivot has $\theta^*>0$, so the objective strictly decreases and no basis repeats.  
    - In the **degenerate** case, the ratio test can give $\theta^*=0$. Then:
      - the basis changes,
      - the point $x$ does not change,
      - the objective does not improve,
      so a sequence of such pivots can return to an earlier basis $\Rightarrow$ cycling.

!!! info "Key box — What anticycling rules guarantee"
    Anticycling pivot rules ensure **no basis repeats**, hence simplex must terminate (assuming finite optimal cost).

!!! note "Key box — Useful corollary"
    If the optimal cost is finite, there exists an **optimal basis**, i.e. a basis with  
    $B^{-1}b\ge 0$ and reduced costs $\bar c = c^\top - c_B^\top B^{-1}A \ge 0$.

---

### 3.4.2 Lexicographic order (definitions)

!!! tip "Definition box — Lexicographic order"
    For $u,v\in\mathbb{R}^k$, we say $u$ is **lexicographically smaller** than $v$ (write $u\prec v$) if:
    - let $t$ be the first index where $u_t\ne v_t$,
    - then $u\prec v$ iff $u_t<v_t$.

!!! tip "Definition box — Lexicographically positive"
    $u$ is **lexicographically positive** if $u\succ 0$ (the first nonzero component of $u$ is positive).

!!! note "Example box"
    - $(0,2,3,0)\succ(0,2,1,4)$ (first difference at index 3: $3>1$).  
    - $(0,4,5,0)\prec(1,2,1,2)$ (first difference at index 1: $0<1$).

---

### 3.4.3 The lexicographic pivoting rule (full tableau form)

!!! note "Key box — Pivot column entries"
    Fix an entering column $j$. Let the pivot column entries be  
    $u_i=(B^{-1}A_j)_i$.

!!! info "Definition box — Lexicographic leaving rule"
    Among rows with $u_i>0$, normalize each candidate row by dividing by $u_i$.  
    Choose the pivot row $\ell$ such that $u_\ell>0$ and  
    $\dfrac{\text{row }\ell}{u_\ell} \prec \dfrac{\text{row }i}{u_i}$ for every $i\ne \ell$ with $u_i>0$. (3.5)

!!! note "Key box — Meaning"
    It is the ratio test **plus** a deterministic tie-break: “pick the lexicographically smallest normalized row.”

---

### 3.4.4 Example 3.7 (how tie-breaking works)

!!! note "Key box — Ratio tie"
    Suppose $j=3$ and two rows tie:  
    $\dfrac{x_{B(1)}}{u_1}=\dfrac{1}{3}$ and $\dfrac{x_{B(3)}}{u_3}=\dfrac{3}{9}=\dfrac{1}{3}$.  
    Divide each candidate row by its pivot entry and compare normalized rows lexicographically.

!!! note "Key box — Uniqueness point used in the book"
    Under the assumption that rows of $A$ are linearly independent, this rule yields a **unique** leaving row; identical normalized rows would contradict $\mathrm{rank}(A)=m$.

---

### 3.4.5 Why lexicographic pivoting prevents cycling (main idea)

!!! info "Key box — Three-step proof structure"
    1. Constraint rows that start lexicographically positive stay lexicographically positive under pivots.  
    2. The objective (zeroth) row increases lexicographically at each pivot.  
    3. Therefore, the tableau (hence the basis) cannot repeat $\Rightarrow$ no cycling.

---

### 3.4.6 Bland’s rule (smallest-subscript pivoting)

!!! tip "Definition box — Bland’s rule"
    - **Entering:** among eligible entering variables (minimization: $\bar c_j<0$), choose the smallest index $j$.  
    - **Leaving:** do the ratio test; among ties, choose the leaving basic variable with smallest index.

!!! info "Theorem box — Bland"
    If Bland’s rule is used, the simplex method cannot cycle and must terminate in finitely many pivots.

!!! note "Practical box"
    Bland’s rule is simple to implement in revised simplex, and is often used as a safe fallback when degeneracy causes stalling.

---

### 3.4.7 Practical notes

!!! note "Key box"
    - Lexicographic pivoting is easiest in a full tableau (explicit rows).  
    - Bland’s rule is the simplest “always safe” anticycling rule in revised simplex implementations.

---

## 3.5 Finding an initial basic feasible solution (initial BFS)

### 3.5.1 The problem: simplex needs a starting BFS

!!! note "Key box — Why Phase I exists"
    Simplex needs an initial BFS:
    - pick invertible basis $B$,
    - set $x_N=0$,
    - compute $x_B=B^{-1}b$,
    - require $x_B\ge 0$.

    Sometimes this BFS is obvious; often it is not.

---

### 3.5.2 Easy case: inequalities with nonnegative right-hand side

!!! note "Key box — Slack variable start"
    If constraints are $Ax\le b$ with $b\ge 0$, introduce slack $s\ge 0$ so $Ax+s=b$.  
    Then $x=0,\ s=b$ is feasible and gives an obvious BFS (slack columns form the identity).

---

### 3.5.3 General case: use an auxiliary (Phase I) problem

!!! note "Assumption box"
    After possibly multiplying some equalities by $-1$, assume $b\ge 0$.

!!! tip "Definition box — Phase I auxiliary LP"
    Introduce artificial variables $y\in\mathbb{R}^m$ with $y\ge 0$ and solve:  
    $\min\ \sum_{i=1}^m y_i \ \text{s.t.}\ Ax+y=b,\ x\ge 0,\ y\ge 0$.  (Phase I)

!!! info "Theorem box — Phase I correctness (core logic)"
    1. Phase I always has an easy BFS: $x=0,\ y=b$.  
    2. If the original LP is feasible, Phase I optimum is $0$ (because $(x,0)$ is feasible).  
    3. If Phase I optimum is $>0$, the original LP is infeasible.

!!! note "Key box — What Phase I returns"
    If the optimal Phase I value is $0$, it produces a feasible basis for the original constraints (after removing artificial basics if needed).

---

### 3.5.4 The two-phase simplex method (algorithm form)

!!! info "Key box — Two-phase simplex"
    **Phase I**
    1. Ensure $b\ge 0$ by sign flips.  
    2. Add $y\ge 0$ and solve Phase I.  
    3. If optimum $>0$: original LP infeasible.  
    4. If optimum $=0$: we have a feasible solution with $y=0$.  
       - If no artificial variable is basic: drop $y$ and start Phase II.  
       - If some artificial variable is still basic (value $0$): clean up (Step 5).  
    5. Drive artificials out or drop redundant constraints (row is zero in original columns).

    **Phase II**
    1. Use the Phase I final basis (with only $A$-columns) as the starting basis.  
    2. Recompute reduced costs for the original $c$.  
    3. Run simplex on the original objective.

---

### 3.5.5 A complete worked example (two-phase, full tableau style)

!!! note "Example box — Original LP"
    $\min\ z=x_1+2x_2$ subject to  
    $x_1-x_2=1$,  
    $x_1+x_2+x_3=3$,  
    $x_1,x_2,x_3\ge 0$.

!!! note "Example box — Phase I formulation"
    Add artificials $y_1,y_2\ge 0$:  
    $x_1-x_2+y_1=1$,  
    $x_1+x_2+x_3+y_2=3$,  
    and minimize $w=y_1+y_2$.

!!! note "Example box — Key conclusion"
    Phase I ends with $w^*=0$ and (example endpoint shown earlier)  
    $(x_1,x_2,x_3,y_1,y_2)=(2,1,0,0,0)$.  
    Then Phase II (dropping $y$) yields  
    $(x_1,x_2,x_3)=(1,0,2)$ and $z^*=1$.

!!! info "Key box — What to remember"
    - Phase I: only feasibility ($y\to 0$).  
    - Phase II: optimize the original cost starting from a feasible basis.

---

### 3.5.6 The big-$M$ method (single-phase alternative)

!!! tip "Definition box — Big-$M$"
    Solve one LP:  
    $\min\ \sum_{j=1}^n c_jx_j + M\sum_{i=1}^m y_i$  
    s.t. $Ax+y=b,\ x\ge 0,\ y\ge 0$, with $M$ “very large”.

!!! warning "Key box — Numerical note"
    Using a huge numeric $M$ can cause numerical trouble in floating point arithmetic; two-phase is typically preferred in practice.

---

### 3.5.7 Comparison: two-phase vs big-$M$

!!! note "Key box"
    - **Two-phase:** clean separation, standard in solvers, numerically stable.  
    - **Big-$M$:** one phase conceptually, but can be numerically delicate unless $M$ is treated symbolically (textbook device).

---

## 3.6 The geometry of the simplex method (column geometry)

!!! info "Key box — Why this section exists"
    This section explains geometrically:
    1) what a **basis** means, and  
    2) why **reduced costs** select entering variables.

### 3.6.1 Add a convexity constraint

!!! tip "Definition box — Convexity constraint"
    Add $e^\top x=1$ so that $x$ becomes convex-combination weights.

!!! note "Key box — The lifted formulation used in the book"
    Consider $\min\ c^\top x$ s.t. $Ax=b,\ e^\top x=1,\ x\ge 0$. (3.6)  
    Define the scalar $z=c^\top x$.

---

### 3.6.2 Lift the columns into one higher dimension

!!! note "Key box — Convex hull picture"
    Because $x\ge 0$ and $\sum_i x_i=1$, we have $Ax=\sum_{i=1}^n x_iA_i=b$, so $b$ is a convex combination of the columns $A_i$.  
    Also $z=c^\top x=\sum_{i=1}^n x_ic_i$.  
    Therefore $(b,z)$ is a convex combination of the lifted points $(A_i,c_i)\in\mathbb{R}^{m+1}$.

---

### 3.6.3 Requirement line and feasibility

!!! tip "Definition box — Requirement line"
    The **requirement line** is the vertical line above $b$: $\{(b,z)\mid z\in\mathbb{R}\}$.

!!! note "Key box — Feasibility and optimality in the picture"
    Let $H=\mathrm{conv}\{(A_1,c_1),\dots,(A_n,c_n)\}$.  
    - Feasible $\Longleftrightarrow$ requirement line intersects $H$.  
    - Optimal solution corresponds to the **lowest** intersection point (smallest $z$).

---

### 3.6.4 Affine independence and simplices (Definition 3.6)

!!! tip "Definition box — Affine independence"
    Points $y^1,\dots,y^{k+1}\in\mathbb{R}^n$ are **affinely independent** if  
    $y^1-y^{k+1},\ y^2-y^{k+1},\ \dots,\ y^k-y^{k+1}$ are linearly independent.

!!! tip "Definition box — Simplex"
    The convex hull of $k+1$ affinely independent points is a **$k$-dimensional simplex** (segment, triangle, tetrahedron, …).

---

### 3.6.5 BFS and the “basic simplex”

!!! note "Key box — Why $m+1$ basic variables here"
    With constraints $Ax=b$ (gives $m$ equations) and $e^\top x=1$ (one more), there are $m+1$ equalities.  
    A BFS corresponds to selecting $m+1$ basic variables (i.e., $m+1$ lifted points).

!!! note "Key box — Geometry"
    The lifted basic points form an $m$-dimensional simplex (the **basic simplex**).  
    The current point $(b,z)$ is a convex combination of those basic points.

---

### 3.6.6 Change of basis = move to an adjacent simplex

!!! info "Key box"
    One pivot replaces one basic point by one nonbasic point.  
    Geometrically, simplex walks from one basic simplex to an adjacent one along the boundary of $H$.

---

### 3.6.7 Dual plane and reduced costs (key link)

!!! tip "Definition box — Dual plane"
    The lifted basic points lie on an $m$-dimensional hyperplane in $\mathbb{R}^{m+1}$ called the **dual plane**.

!!! info "Theorem box — Reduced cost = below/above dual plane (minimization)"
    For a nonbasic index $j$:
    - $(A_j,c_j)$ lies **below** the current dual plane $\Longleftrightarrow\ \bar c_j<0$,  
    - $(A_j,c_j)$ lies **above** the dual plane $\Longleftrightarrow\ \bar c_j>0$.

!!! note "Key box — Meaning"
    Reduced cost is a **signed vertical distance** from the dual plane to the lifted point.

---

### 3.6.8 Pivoting as “hinging” (physical analogy)

!!! note "Key box"
    Think of the basic simplex as a rigid face.  
    Pivoting “hinges” to a neighboring face; the intersection with the requirement line moves up/down.  
    A profitable pivot moves the intersection **down** (decreases $z$).

---

### 3.6.9 Example 3.10 (why simplex can be fast)

!!! note "Key box"
    For $m=1$, the picture is 2D and simplex can reach the optimal basis in very few pivots even when $n$ is large.

---

## 3.7 Computational efficiency of the simplex method

!!! info "Key box — Two drivers of runtime"
    Simplex effort depends on:
    1) **work per iteration**, and  
    2) **number of iterations (pivots)**.

---

### 3.7.1 Work per iteration (recap)

!!! note "Key box"
    - Full tableau: $\mathcal{O}(mn)$ arithmetic per pivot (update an $m\times n$ tableau).  
    - Revised simplex: basis solves/updates about $\mathcal{O}(m^2)$ per pivot, with reduced-cost computation depending on pricing/sparsity.

---

### 3.7.2 Worst-case number of iterations can be exponential

!!! info "Theorem box — Exponential worst-case (Theorem 3.3)"
    There exist LP families where simplex (under some pivot rules) requires $2^n-1$ pivots:
    - feasible set has $2^n$ vertices,
    - simplex can be forced to visit almost all vertices before terminating.

!!! note "Key box — Construction idea"
    Start from the unit cube $0\le x_i\le 1$ and perturb it with constraints like  
    $\varepsilon\le x_1\le 1$,  
    $\varepsilon x_{i-1}\le x_i \le 1-\varepsilon x_{i-1}$ for $i=2,\dots,n$,  
    so the objective decreases along a long edge-walk path.

---

### 3.7.3 Diameter of polyhedra and the Hirsch conjecture

!!! tip "Definition box — Diameter of a polyhedron"
    Vertices $x,y$ are adjacent if connected by an edge.  
    Let $d(x,y)$ be the minimum number of edges in a path from $x$ to $y$.  
    The **diameter** is $D(P)=\max_{x,y\text{ vertices}} d(x,y)$.

!!! note "Key box — $\Delta(n,m)$ and Hirsch"
    Let $\Delta(n,m)$ be the maximum diameter over bounded polyhedra in $\mathbb{R}^n$ described by $m$ inequalities.  
    Hirsch conjectured $\Delta(n,m)\le m-n$.  
    (The book discusses related results and bounds, especially differences between bounded and unbounded cases.)

---

### 3.7.4 Average-case behavior (why practice looks good)

!!! note "Key box"
    Worst-case does not predict typical performance.  
    Average-case claims depend on the probability model for “random LP,” but many models suggest simplex often needs a modest number of pivots in practice.

---

## 3.8 Summary (what to memorize for exams)

!!! info "Key box — Big picture"
    - $P=\{x\mid Ax=b,\ x\ge 0\}$ is a polyhedron.  
    - Simplex moves among **BFSs (vertices/extreme points)** along edges.  
    - Each pivot changes one entering nonbasic variable and one leaving basic variable.

---

### 3.8.2 Core mathematical ingredients

!!! tip "Key box — Reduced costs"
    For basis $B$: $\bar c_j = c_j - c_B^\top B^{-1}A_j$.  
    - If $\bar c_j\ge 0$ for all nonbasic $j$, the BFS is optimal.  
    - If BFS is nondegenerate and some $\bar c_j<0$, there is a feasible improving edge.

!!! tip "Key box — Ratio test"
    For entering index $j$, the step size is  
    $\theta^*=\min_{i:(B^{-1}A_j)_i>0}\dfrac{(x_B)_i}{(B^{-1}A_j)_i}$.  
    - Leaving variable is the minimizer.  
    - If no component of $B^{-1}A_j$ is positive, the objective is unbounded below ($-\infty$).

---

### 3.8.3 Implementation styles (Section 3.3)

!!! note "Key box"
    1. Naive: explicitly form $B^{-1}$ each iteration (educational).  
    2. Revised simplex: solve systems with $B$ / $B^\top$ for $x_B$, multipliers, reduced costs.  
    3. Full tableau: maintain $B^{-1}A$ and $B^{-1}b$ and update by row operations.

---

### 3.8.4 Degeneracy, cycling, and anticycling

!!! warning "Key box"
    Degeneracy can cause $\theta^*=0$ pivots and cycling.  
    Anticycling rules:
    - lexicographic pivoting,
    - Bland’s rule,
    guarantee termination (no basis repetition).

---

### 3.8.5 How to start: initial BFS

!!! info "Key box — Phase I"
    If no obvious BFS exists, use Phase I:  
    $\min\ \sum_{i=1}^m y_i \ \text{s.t.}\ Ax+y=b,\ x\ge 0,\ y\ge 0$.  
    - optimum $>0$ $\Rightarrow$ infeasible original LP  
    - optimum $=0$ $\Rightarrow$ feasible and provides a starting basis for Phase II

---

### 3.8.6 Geometry intuition

!!! note "Key box"
    With $e^\top x=1$, feasibility/optimality can be read from intersections of the requirement line with the convex hull of lifted points $(A_i,c_i)$, and reduced costs correspond to whether a point lies below the current dual plane.

---

### 3.8.7 Efficiency story

!!! note "Key box"
    - Per-iteration work is controlled by tableau vs revised simplex and sparsity.  
    - Pivot count can be exponential in worst case, but is often small in practice.

---
