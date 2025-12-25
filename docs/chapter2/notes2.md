## 2.1 Polyhedra and Convex Sets

!!! info "Key box"
    Section 2.1 sets up the geometry language used throughout LP:

    1. A **polyhedron** is the feasible set of finitely many linear inequalities  
    2. **Bounded vs unbounded** sets (can the feasible region extend to infinity?)  
    3. **Hyperplanes** (equalities) and **halfspaces** (inequalities)  
    4. **Convexity**: the line segment between feasible points stays feasible  
    5. **Convex combinations** and the **convex hull**  
    6. Closure facts (Theorem 2.1): intersections preserve convexity; polyhedra are convex  

---

### Polyhedra (feasible sets of LP constraints)

!!! tip "Def box — Polyhedron"
    A **polyhedron** is any set that can be written as
    $P=\{x\in\mathbb{R}^n \mid Ax \ge b\},$
    i.e., the set of vectors satisfying finitely many linear inequalities.

**Interpretation:** each inequality is a “cut” of the space; the feasible region is what remains after applying all cuts.

---

### Boundedness

!!! tip "Def box — Bounded set"
    A set $S\subseteq\mathbb{R}^n$ is **bounded** if there exists a constant $K$ such that
    $|x_i|\le K$ for every $x\in S$ and each component $i$.

- **Bounded polyhedron:** trapped inside some big box.  
- **Unbounded polyhedron:** you can move infinitely far in some direction while staying feasible.

**Why it matters later:** unboundedness can lead to LPs with no finite optimum (depending on the objective direction).

---

### Hyperplanes and Halfspaces (single linear constraints)

Let $a\neq 0$ and $b\in\mathbb{R}$.

!!! tip "Def box — Hyperplane"
    The **hyperplane** with normal $a$ and offset $b$ is
    $H=\{x\in\mathbb{R}^n \mid a^\mathsf{T}x=b\}.$

!!! tip "Def box — Halfspace"
    The **halfspace** defined by the inequality is
    $S=\{x\in\mathbb{R}^n \mid a^\mathsf{T}x\ge b\}.$

**Key geometric facts**
- The hyperplane $a^\mathsf{T}x=b$ is the **boundary** of the halfspace $a^\mathsf{T}x\ge b$.  
- The vector $a$ is **perpendicular (normal)** to the hyperplane:

  If $x,y\in H$, then $a^\mathsf{T}x=b$ and $a^\mathsf{T}y=b$, so
  $a^\mathsf{T}(x-y)=0,$
  meaning any direction along the hyperplane is orthogonal to $a$.

**Polyhedron viewpoint**
$P=\{x\mid Ax\ge b\}$
is the **intersection of finitely many halfspaces** (one per row of $A$).

---

### Convex Sets (the main structural property)

!!! tip "Def box — Convex set"
    A set $S\subseteq\mathbb{R}^n$ is **convex** if for any $x,y\in S$ and any $\lambda\in[0,1]$,
    $\lambda x + (1-\lambda)y\in S.$
    (Equivalently: the whole line segment between any two points in $S$ lies in $S$.)

**Why convexity matters for LP**
- If $x$ and $y$ are feasible, then any “mix” of them is feasible.  
- This property is fundamental for later results like “an optimum occurs at a corner/extreme point.”

---

### Convex combinations and convex hull

!!! tip "Def box — Convex combination"
    A vector $z$ is a **convex combination** of $x^1,\dots,x^k$ if
    $z=\sum_{i=1}^k \lambda_i x^i,$
    where $\lambda_i\ge 0$ and $\sum_{i=1}^k \lambda_i = 1.$

!!! tip "Def box — Convex hull"
    The **convex hull** of points $x^1,\dots,x^k$ is the set of all their convex combinations:
    $\mathrm{conv}\{x^1,\dots,x^k\}
    =
    \left\{\sum_{i=1}^k \lambda_i x^i \; \middle|\;
    \lambda_i\ge 0,\ \sum_{i=1}^k\lambda_i=1\right\}.$
    It is the **smallest convex set** containing those points.

---

### Theorem 2.1 (closure properties you’ll use repeatedly)

!!! success "Theorem box — Basic convexity facts"
    1. The **intersection** of convex sets is convex.  
    2. Every **polyhedron** is convex.  
       (Halfspaces are convex, and a polyhedron is an intersection of halfspaces.)  
    3. If $S$ is convex and $x^1,\dots,x^k\in S$, then every **convex combination**
       $\sum_{i=1}^k \lambda_i x^i$ lies in $S$.  
    4. The **convex hull** of finitely many points is convex.

!!! note "Proof idea (what to remember)"
    - Halfspace convexity: if $a^\mathsf{T}x\ge b$ and $a^\mathsf{T}y\ge b$, then  
      $a^\mathsf{T}(\lambda x+(1-\lambda)y)
      =\lambda a^\mathsf{T}x+(1-\lambda)a^\mathsf{T}y
      \ge \lambda b+(1-\lambda)b=b.$  
    - Intersections preserve convexity: if the segment stays in each set, it stays in their intersection.

---

!!! info "Section 2.1 — Exam checklist"
    - A feasible set of linear inequalities is a **polyhedron**: $P=\{x\mid Ax\ge b\}$.  
    - Each inequality defines a **halfspace**; equalities define **hyperplanes**.  
    - Polyhedra are **convex** (intersection of convex halfspaces).  
    - **Bounded** means contained in a box; **unbounded** means it extends to infinity.  
    - **Convex combination** and **convex hull** formalize “mixing” feasible points.

## 2.2 Extreme Points, Vertices, and Basic Feasible Solutions

!!! info "Key box"
    Section 2.2 formalizes what a “corner” of a polyhedron means, in three equivalent ways:

    1. **Extreme point** (purely geometric: cannot be written as a nontrivial convex combination)  
    2. **Vertex** (optimization view: unique optimizer for some linear objective)  
    3. **Basic feasible solution (BFS)** (algebraic test: $n$ linearly independent active constraints)  

    Main result: **Extreme points = vertices = BFS** (Theorem 2.2).  
    It also defines **adjacent** basic solutions (sets up simplex “move along an edge”).

---

### 2.2.1 Extreme points

!!! tip "Def box — Extreme point"
    Let $P$ be a convex set (in particular, a polyhedron). A point $x\in P$ is an **extreme point** of $P$ if it cannot be expressed as a nontrivial convex combination of two distinct points of $P$.

    Equivalently: if $y,z\in P$ and $0\le \lambda \le 1$ satisfy
    $x=\lambda y+(1-\lambda)z,$
    then either $x=y$, or $x=z$, or $\lambda\in\{0,1\}$.

**Geometric meaning:** extreme points are the true “corners” — you cannot obtain them by “mixing” two other feasible points.

---

### 2.2.2 Vertices (supporting-hyperplane / LP viewpoint)

!!! tip "Def box — Vertex"
    Let $P$ be a polyhedron. A point $x\in P$ is a **vertex** of $P$ if it is the **unique optimal solution** of *some* linear program with feasible set $P$.

    That is, there exists a vector $c$ such that $x$ is the unique minimizer of
    $\min\{c^\mathsf{T}u \mid u\in P\}.$

**Geometric meaning:** there is a supporting hyperplane (a level set of a linear objective) that touches $P$ **only at** $x$.

---

### 2.2.3 Active constraints and “enough equalities to pin down a point”

Let the polyhedron be written as
$P=\{x\in\mathbb{R}^n \mid a_i^\mathsf{T}x \ge b_i,\ i=1,\dots,m\}.$

At a point $x\in P$, constraint $i$ is **active** if it holds with equality:
$a_i^\mathsf{T}x=b_i.$

!!! info "Terminology — Active set"
    The **active set** at $x$ is the index set
    $I(x)=\{i\in\{1,\dots,m\} \mid a_i^\mathsf{T}x=b_i\}.$

**Key idea:** if the active constraints at $x$ include $n$ *linearly independent* normals, then those equalities determine $x$ uniquely (they “pin down” the point like a corner).

---

### 2.2.4 Basic solutions and basic feasible solutions

!!! tip "Def box — Basic feasible solution (BFS)"
    A feasible point $x\in P$ is a **basic feasible solution** if among the active constraints at $x$, there exist **$n$ linearly independent** constraints.

    (Equivalently: the active constraint normals span $\mathbb{R}^n$.)

!!! note "Remark — Basic solution vs BFS"
    Often one forms a **basic solution** by selecting $n$ linearly independent constraints, solving them as equalities to obtain a unique candidate $x$, and then checking feasibility.
    
    - If the resulting $x$ satisfies *all* constraints, it is a **basic feasible solution**.  
    - If it violates some constraints, it is a **basic solution** but **not feasible**.

!!! warning "Important remark (representation issue)"
    Whether a point is a *basic solution* can depend on how the polyhedron is written (which constraints you include, redundant constraints, etc.).
    
    However, the main theorem below shows that **BFS are the same as extreme points**, so the property “being a BFS” is ultimately geometric (representation-independent).

---

### 2.2.5 Main equivalence theorem

!!! success "Theorem box — Extreme point = vertex = BFS"
    Let $P$ be a polyhedron. For a point $x\in P$, the following are equivalent:

    1. $x$ is a **vertex** of $P$.  
    2. $x$ is an **extreme point** of $P$.  
    3. $x$ is a **basic feasible solution** of $P$.  

**Why this theorem matters**
- It justifies the “corner” viewpoint in three ways:
  - geometry: extreme point,
  - optimization: vertex,
  - algebra: BFS (what algorithms can test and move between).

---

### 2.2.6 Finiteness of basic solutions

!!! note "Key fact — There are finitely many basic solutions"
    A polyhedron defined by finitely many constraints has only **finitely many** ways to choose $n$ linearly independent constraints.
    
    Therefore, the number of **basic solutions** (and hence BFS / extreme points) is **finite**.

---

### 2.2.7 Adjacency (neighbors) and edges

!!! tip "Def box — Adjacent basic solutions"
    Two **distinct** basic solutions are **adjacent** if they share **$n-1$** linearly independent active constraints.

!!! note "Geometric meaning"
    If two **basic feasible solutions** are adjacent, the line segment joining them lies on an **edge** of the polyhedron.
    (This is the geometric backbone of simplex: move from one BFS to an adjacent BFS along an edge.)

---

!!! info "Section 2.2 — Exam checklist"
    - Know the three corner notions:
      - **Extreme point** = cannot be written as a nontrivial convex combination  
      - **Vertex** = unique optimizer for some linear objective  
      - **BFS** = $n$ linearly independent active constraints at the point  
    - Be able to state: **Extreme point ⇔ Vertex ⇔ BFS**.  
    - Know adjacency: share $n-1$ independent active constraints (neighbors along an edge).


## 2.3 Polyhedra in Standard Form

!!! info "Key box"
    Section 2.3 specializes the geometry of Section 2.2 to the **standard form** feasible set:

    1. Standard form polyhedron: $P=\{x\mid Ax=b,\ x\ge 0\}$  
    2. **Basis** and partition into **basic** vs **nonbasic** variables  
    3. Constructing a **basic solution** by setting $n-m$ variables to zero  
    4. **Basic feasible solution (BFS)** = basic solution that also satisfies $x\ge 0$  
    5. A basic solution has at most $m$ nonzero components  
    6. Adjacent bases (differ by one column) correspond to “neighbor” corners (sets up simplex)  
    7. Assuming $\mathrm{rank}(A)=m$ is **no loss of generality** (redundant equalities can be removed)

---

### Standard form feasible set

!!! tip "Def box — Standard form polyhedron"
    A **standard form** feasible set is
    $P=\{x\in\mathbb{R}^n \mid Ax=b,\ x\ge 0\},$
    where $A\in\mathbb{R}^{m\times n}$ and $b\in\mathbb{R}^m$.

!!! note "Standing assumption (used throughout)"
    Often we assume $\mathrm{rank}(A)=m$ (the $m$ equality constraints are linearly independent) and $m\le n$.

---

### Bases and basic variables

Let $A_1,\dots,A_n$ denote the columns of $A$.

!!! tip "Def box — Basis (column basis)"
    A set of indices $B\subseteq\{1,\dots,n\}$ with $|B|=m$ is a **basis** if the columns $\{A_j\}_{j\in B}$ are linearly independent.

!!! info "Notation"
    - The **basis matrix** is $A_B\in\mathbb{R}^{m\times m}$ formed by the columns indexed by $B$.  
    - The remaining indices are $N=\{1,\dots,n\}\setminus B$.  
    - Variables $\{x_j\}_{j\in B}$ are **basic variables**; variables $\{x_j\}_{j\in N}$ are **nonbasic variables**.

---

### Basic solutions

In standard form, the equalities $Ax=b$ are always active, and the only inequalities are $x\ge 0$.
A “corner candidate” is obtained by activating $n-m$ of the nonnegativity constraints, i.e., setting $n-m$ variables to zero.

!!! tip "Def box — Basic solution (associated with a basis $B$)"
    Given a basis $B$ (so $A_B$ is invertible), define a vector $x$ by
    $x_N=0,$
    and
    $A_B x_B=b,$
    i.e.,
    $x_B=A_B^{-1}b.$
    This $x$ is called the **basic solution** associated with $B$.

!!! note "Key property"
    Any basic solution has **at most $m$ nonzero components**, because $x_N=0$ and only the $m$ basic variables can be nonzero.

---

### Basic feasible solutions (BFS)

!!! tip "Def box — Basic feasible solution (BFS)"
    A **basic feasible solution** is a basic solution that is feasible:
    $x\ge 0.$

!!! info "Interpretation"
    - A **basis** always produces a **basic solution** via $x_B=A_B^{-1}b,\ x_N=0$.  
    - That basic solution may be infeasible (some component negative).  
    - If it satisfies $x\ge 0$, it is a **BFS** (a “corner” of $P$).

---

### Bases vs basic solutions (not always one-to-one)

!!! note "Remark"
    Different bases can sometimes lead to the **same** basic solution.
    This typically happens when the resulting BFS has some basic variables equal to zero (degeneracy).
    (Example: if $b=0$, then every basis yields the basic solution $x=0$.)

---

### Adjacency in standard form (sets up simplex moves)

!!! tip "Def box — Adjacent bases"
    Two bases $B$ and $B'$ are **adjacent** if they differ in exactly one index, i.e.,
    $|B\cap B'|=m-1.$

!!! note "Geometric meaning"
    Adjacent bases correspond to swapping **one** basic variable with **one** nonbasic variable.
    When this changes the basic solution, it moves to a neighboring corner along an edge of the feasible set.

---

### Full row rank assumption is no loss of generality

!!! success "Theorem box — Removing redundant equalities"
    Consider $P=\{x\mid Ax=b,\ x\ge 0\}$ and suppose $P$ is nonempty.
    If $\mathrm{rank}(A)=k<m$, then some equality constraints are redundant.
    There exists a matrix $D\in\mathbb{R}^{k\times n}$ with $\mathrm{rank}(D)=k$ and a vector $f\in\mathbb{R}^k$ such that
    $\{x\mid Ax=b,\ x\ge 0\}=\{x\mid Dx=f,\ x\ge 0\}.$

!!! note "Takeaway"
    We can assume $\mathrm{rank}(A)=m$ (independent equality constraints) without changing the feasible set, as long as the feasible set is nonempty.

---

!!! info "Section 2.3 — Exam checklist"
    - Standard form: $P=\{x\mid Ax=b,\ x\ge 0\}$.  
    - Basis $B$: choose $m$ linearly independent columns $\Rightarrow A_B$ invertible.  
    - Basic solution: $x_N=0$, $x_B=A_B^{-1}b$.  
    - BFS: basic solution with $x\ge 0$.  
    - Any basic solution has at most $m$ nonzeros.  
    - Adjacent bases differ by one column (simplex “pivot” idea).  
    - Redundant equalities can be removed $\Rightarrow$ assume $\mathrm{rank}(A)=m$.

## 2.4 Degeneracy

!!! info "Key box"
    In Section 2.4 we study **degeneracy**, i.e., when a “corner” is pinned down by **more constraints than necessary**.

    1. A basic solution in $\mathbb{R}^n$ is determined by (at least) $n$ active constraints  
    2. **Degenerate** means **more than $n$ constraints** are active at the basic solution  
    3. In standard form $Ax=b,\ x\ge 0$: degeneracy shows up as **extra zero variables** beyond the required $n-m$  
    4. Consequence: **multiple bases can represent the same BFS** (important later for simplex behavior)

---

### Active constraints at a point

For a polyhedron $P=\{x\in\mathbb{R}^n \mid a_i^\mathsf{T}x\ge b_i,\ i=1,\dots,m\}$,
constraint $i$ is **active** at $x$ if $a_i^\mathsf{T}x=b_i$.

---

!!! tip "Def box — Degenerate / nondegenerate basic feasible solution"
    Let $P\subseteq \mathbb{R}^n$ be a polyhedron and let $x$ be a **basic feasible solution** of $P$.

    - $x$ is **nondegenerate** if it has **exactly $n$** active constraints.  
    - $x$ is **degenerate** if it has **more than $n$** active constraints.

!!! note "Standard form interpretation"
    For $P=\{x\mid Ax=b,\ x\ge 0\}$ with $A\in\mathbb{R}^{m\times n}$ and $\mathrm{rank}(A)=m$:
    - The $m$ equalities $Ax=b$ are always active.  
    - You need $n-m$ more active constraints from $x_i\ge 0$, i.e., at least $n-m$ variables equal to $0$.  
    - A BFS is **degenerate** if **more than $n-m$ variables are zero** (i.e., “extra” nonnegativity constraints are active).

---

!!! example "Example (typical degeneracy pattern)"
    In standard form, if $n-m=3$ but at a BFS you observe $4$ (or more) zero components, then the BFS is **degenerate**.

---

!!! warning "Why degeneracy matters"
    Degeneracy is the main reason:
    - distinct bases can yield the **same** BFS, and  
    - Degeneracy of a basic feasible solution is not in general, a geometric property but rather it may depend on the particular representation of polyhedron. 
    - A basic feasible solution which is non-degenerate under one representation can be degenerate under other representatio.(See doubts section)

---

## 2.5 Existence of Extreme Points

!!! info "Key box"
    This section answers: **When does a nonempty polyhedron have at least one extreme point?**

    1. Introduce the idea of a polyhedron **containing a line**  
    2. Main criterion: a nonempty polyhedron has an extreme point **iff** it does **not** contain a line

---

!!! tip "Def box — Polyhedron contains a line"
    A polyhedron $P$ **contains a line** if there exist some $x^0\in P$ and a nonzero direction $d\neq 0$ such that
    $x^0+\lambda d\in P$ for every $\lambda\in\mathbb{R}$.

    (So you can move in both $+d$ and $-d$ directions forever and remain feasible.)

---

!!! success "Theorem box — Existence of extreme points"
    Let $P$ be a **nonempty** polyhedron. Then:

    $P$ has at least one **extreme point**  $\Longleftrightarrow$  $P$ does **not** contain a line.

!!! note "Geometric meaning"
    - If $P$ contains a line, it has a “flat direction” in both ways, so you cannot get a true corner.  
    - If $P does not contain a line$, then $P$ has at least one corner (an extreme point / BFS).

---

## 2.6 Optimality of Extreme Points

!!! info "Key box"
    This section links geometry to optimization:

    1. Under mild conditions, if the LP is not unbounded, an **optimal extreme point exists**  
    2. This is the geometric reason simplex can search over corners

---

!!! success "Theorem box — Optimality at an extreme point (when extreme points exist)"
    Let $P$ be a **nonempty** polyhedron that has at least one extreme point.
    Consider the LP
    $\min\{c^\mathsf{T}x \mid x\in P\}.$

    Then exactly one of the following holds:

    1. The optimal cost is $-\infty$ (the problem is unbounded below), or  
    2. There exists an **optimal solution that is an extreme point** of $P$.

---

!!! success "Corollary box — Existence of an optimal solution (general nonempty polyhedron)"
    Let $P$ be a **nonempty** polyhedron and consider $\min\{c^\mathsf{T}x \mid x\in P\}$.
    Then either:

    1. The optimal cost is $-\infty$, or  
    2. There exists at least one **optimal solution** (not necessarily unique).

!!! note "How to read this"
    - If a finite optimum is attained and $P$ has extreme points, you can look for an **optimal extreme point**.  
    - If $P$ has no extreme points, the geometry is “line-like,” and the behavior is governed by that line direction.

---

## 2.7 Representation of Bounded Polyhedra*

!!! info "Key box"
    This section gives a powerful “vertex representation” of bounded feasible sets:

    1. A bounded polyhedron (a polytope) is completely determined by its **extreme points**  
    2. Every point in a bounded polyhedron can be written as a **convex combination** of extreme points  
    3. This gives the **V-representation** (by vertices) vs **H-representation** (by inequalities)

---

!!! success "Theorem box — Bounded polyhedron = convex hull of extreme points"
    Let $P$ be a **nonempty bounded** polyhedron.
    Let $V$ be the set of extreme points of $P$.

    Then:
    1. $V$ is **finite**, and  
    2. $P=\mathrm{conv}(V)$, i.e., every $x\in P$ can be written as a convex combination of extreme points:
       $x=\sum_{k=1}^K \lambda_k v^k,$
       where $v^k\in V$, $\lambda_k\ge 0$, and $\sum_{k=1}^K\lambda_k=1$.

!!! note "Meaning"
    For bounded LP feasible regions, “the whole shape” is exactly the convex hull of its corners.

---

## 2.8 Projections of Polyhedra: Fourier–Motzkin Elimination

!!! info "Key box"
    This section explains how eliminating variables preserves polyhedral structure:

    1. Define coordinate **projection** $\Pi_k(S)$  
    2. Key fact: **projection of a polyhedron is a polyhedron**  
    3. Provide an explicit elimination procedure: **Fourier–Motzkin elimination**  
    4. Note: constraint count can blow up (often exponentially across many eliminations)

---

### Projection

!!! tip "Def box — Projection map and projected set"
    Let $\pi_k:\mathbb{R}^n\to\mathbb{R}^k$ be the map that keeps the first $k$ coordinates:
    $\pi_k(x_1,\dots,x_n)=(x_1,\dots,x_k).$

    For a set $S\subseteq\mathbb{R}^n$, its projection onto the first $k$ coordinates is
    $\Pi_k(S)=\{\pi_k(x)\mid x\in S\}\subseteq\mathbb{R}^k.$

---

!!! success "Theorem box — Projection of a polyhedron is a polyhedron"
    If $P\subseteq\mathbb{R}^n$ is a polyhedron, then $\Pi_k(P)\subseteq\mathbb{R}^k$ is also a polyhedron.

---

### Fourier–Motzkin elimination (eliminate one variable)

Suppose we have a system of inequalities in variables $(x_1,\dots,x_{n-1},x_n)$ and we want to eliminate $x_n$.

!!! tip "Algorithm box — Fourier–Motzkin elimination (eliminate $x_n$)"
    Start with inequalities of the form
    $a_i x_n + \sum_{j=1}^{n-1} a_{ij}x_j \ge b_i,\quad i=1,\dots,m.$

    1. Split constraints into three groups by the coefficient of $x_n$:

       - $P=\{i\mid a_i>0\}$  
       - $N=\{i\mid a_i<0\}$  
       - $Z=\{i\mid a_i=0\}$

    2. For $i\in P$, solve for a **lower bound** on $x_n$:
       $x_n \ge \dfrac{b_i-\sum_{j=1}^{n-1}a_{ij}x_j}{a_i}.$

    3. For $i\in N$, solve for an **upper bound** on $x_n$ (note inequality flips when dividing by $a_i<0$):
       $x_n \le \dfrac{b_i-\sum_{j=1}^{n-1}a_{ij}x_j}{a_i}.$

    4. To eliminate $x_n$, enforce that every lower bound is $\le$ every upper bound:
       for each $(i\in P,\ k\in N)$ impose
       $\dfrac{b_i-\sum_{j=1}^{n-1}a_{ij}x_j}{a_i}
       \le
       \dfrac{b_k-\sum_{j=1}^{n-1}a_{kj}x_j}{a_k}.$

       These are inequalities involving only $(x_1,\dots,x_{n-1})$.

    5. Keep all inequalities in $Z$ unchanged (they already do not involve $x_n$).

    The resulting system describes the projection onto $(x_1,\dots,x_{n-1})$.

!!! warning "Complexity note"
    One elimination step can create up to $|P|\cdot|N|$ new inequalities.
    Repeating across many variables may cause a rapid growth in the number of constraints.

---

## 2.9 Summary

!!! info "Key box"
    Chapter 2 main takeaways:

    1. A polyhedron is an intersection of halfspaces and is **convex**  
    2. Corner notions are equivalent: **vertex = extreme point = BFS**  
    3. **Degeneracy**: a BFS can have more than $n$ active constraints (extra zeros in standard form)  
    4. A nonempty polyhedron has an extreme point **iff** it does not contain a line  
    5. If the LP is not unbounded below and extreme points exist, an **optimal extreme point exists**  
    6. Every nonempty **bounded** polyhedron is the **convex hull of its extreme points**  
    7. Projections of polyhedra are polyhedra; **Fourier–Motzkin elimination** performs projection by eliminating variables


