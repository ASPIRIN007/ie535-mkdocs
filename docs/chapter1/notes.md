::: keybox
These notes summarize the *important ideas* from Chapter 1: (i) what an
LP is, (ii) how to convert among equivalent forms (especially to
standard form), (iii) modeling tricks (absolute values, piecewise-linear
convex costs, data fitting), (iv) geometric intuition (2D graphical
method), and (v) linear algebra + computational-operation-count
conventions used later.
:::

# What is Linear Programming (LP)?

::: defbox
A **linear program** (LP) optimizes a **linear** objective over a set
defined by **linear** constraints. Typical primitives:

-   **Objective (cost)**: linear form $c^\mathsf{T}x$.

-   **Constraints**: linear equalities/inequalities such as $Ax \le b$,
    $Ax=b$, $Ax \ge b$.
:::

## Common terminology (write these in notes)

Let $x\in\mathbb{R}^n$ be the decision vector.

-   **Feasible set**: all $x$ satisfying the constraints.

-   **Feasible solution**: any $x$ in the feasible set.

-   **Optimal solution**: feasible $x^\star$ with best objective value.

-   **Infeasible**: feasible set is empty.

-   **Unbounded**: objective can be improved without limit while staying
    feasible.

# Variants of the LP and Equivalence Transformations (Section 1.1)

## General inequality/equality forms

You will see many equivalent "faces" of LP: $$\begin{aligned}
\min \ & c^\mathsf{T}x \\
\text{s.t. } & Ax \le b,\quad x \in \mathbb{R}^n,
\end{aligned}$$ or with mixed signs/equalities:
$$Ax \le b,\quad A'x=b',\quad x \ge 0,\quad x_j \ \text{free},\ \text{etc.}$$

::: defbox
A (common) **standard form LP** is $$\begin{aligned}
\min \ & c^\mathsf{T}x\\
\text{s.t. } & Ax=b,\\
& x\ge 0.
\end{aligned}$$ Many algorithms (especially simplex and interior-point
methods) are developed for (or easily reduced to) this form.
:::

## Transformation rules (memorize)

These are the *core modeling moves*.

::: exbox
**(1) Minimization vs maximization**\
$$\max \ c^\mathsf{T}x \quad \Longleftrightarrow \quad \min \ (-c)^\mathsf{T}x.$$
:::

::: exbox
**(2) Equality to two inequalities**\
$$a^\mathsf{T}x = \beta \quad \Longleftrightarrow \quad a^\mathsf{T}x \le \beta \ \text{ and }\ a^\mathsf{T}x \ge \beta.$$
(And similarly for matrix equalities.)
:::

::: exbox
**(3) Inequalities to equalities (slack / surplus)**\

-   If $a^\mathsf{T}x \le \beta$, introduce **slack** $s\ge 0$:
    $$a^\mathsf{T}x + s = \beta,\quad s\ge 0.$$

-   If $a^\mathsf{T}x \ge \beta$, introduce **surplus** $s\ge 0$:
    $$a^\mathsf{T}x - s = \beta,\quad s\ge 0.$$
:::

::: exbox
**(4) Free variable to difference of nonnegatives**\
If $x_i$ is unrestricted in sign, write
$$x_i = x_i^+ - x_i^-,\qquad x_i^+\ge 0,\ \ x_i^-\ge 0.$$ Then replace
$x_i$ everywhere with $x_i^+ - x_i^-$.
:::

::: keybox
**Equivalence idea:** These transformations preserve the feasible set
*in the original variables* (via projection) and preserve the objective
value for corresponding feasible points. The LP lives in a
higher-dimensional space after introducing slacks/surpluses/splits, but
it is representing the same decision problem.
:::

# Modeling Examples and Patterns (Section 1.2)

Chapter 1 uses several examples to show "LP is a modeling language." The
important thing to capture in notes is the **pattern**, not the story.

## Absolute values

We often need to linearize $|u|$ where $u$ is affine (e.g.,
$u=a^\mathsf{T}x - b$).

::: exbox
**Method A (epigraph / $z$-method)**: introduce $z\ge 0$ with
$$z \ge u,\qquad z \ge -u.$$ Then $z\ge |u|$. If you minimize $z$ (or
$z$ appears with nonnegative weight in the objective), the optimum
forces $z=|u|$.
:::

::: exbox
**Method B (split / $u^+,u^-$-method)**: introduce $u^+,u^- \ge 0$ with
$$u = u^+ - u^-,\qquad |u| = u^+ + u^- \ \ (\text{at optimum}).$$ Then
replace $|u|$ with $u^+ + u^-$.
:::

## Piecewise-linear convex costs

If $f(\cdot)$ is piecewise-linear and convex, it can be written as a
maximum of affine functions:
$$f(t) = \max_{k=1,\dots,K}\ \{\alpha_k t + \beta_k\}.$$

::: exbox
**LP epigraph form:** introduce $z$ and enforce
$$z \ge \alpha_k t + \beta_k,\quad k=1,\dots,K.$$ Then minimizing $z$
(or adding $z$ to the objective) models $f(t)$.
:::

## Data fitting (two classic LP norms)

Given data $(a_i,b_i)$ and prediction $\hat b_i = a_i^\mathsf{T}x$:

::: exbox
**$\ell_\infty$ (minimax) fit: minimize worst absolute residual**\
Residual $r_i=b_i-a_i^\mathsf{T}x$. Minimize $\max_i |r_i|$:
$$\min z \quad \text{s.t.}\quad |b_i-a_i^\mathsf{T}x| \le z\ \ (i=1,\dots,m).$$
Linearize each absolute value:
$$b_i-a_i^\mathsf{T}x \le z,\qquad -(b_i-a_i^\mathsf{T}x)\le z.$$
:::

::: exbox
**$\ell_1$ fit: minimize sum of absolute residuals**\
$$\min \sum_{i=1}^m |b_i-a_i^\mathsf{T}x|.$$ Introduce $z_i\ge 0$:
$$b_i-a_i^\mathsf{T}x \le z_i,\qquad -(b_i-a_i^\mathsf{T}x)\le z_i,\qquad i=1,\dots,m,$$
and minimize $\sum_i z_i$.
:::

## Multiperoid planning / capacity expansion pattern (important modeling structure)

Typical ingredients:

-   decision variables for additions (e.g., $x_t$ coal, $y_t$ nuclear),

-   inventory/availability recursion (capacity available is sum of
    recent additions that have not expired),

-   demand satisfaction constraints,

-   policy constraints (e.g., fraction constraints converted to linear
    inequalities).

::: keybox
**Pattern:** time-coupling constraints often look like
$$\text{available}_t = \sum_{s=\max(1,t-L+1)}^t \text{add}_s,$$ where
$L$ is lifetime (windowed sum).
:::

## Discrete-time rocket planning (absolute value objective)

Dynamics: $$x_{t+1}=x_t+v_t,\qquad v_{t+1}=v_t+a_t,$$ with boundary
conditions $(x_0,v_0)$ and $(x_T,v_T)$. Two LP objectives:

-   **Fuel proxy**: $\min \sum_{t=0}^{T-1} |a_t|$

-   **Peak thrust**: $\min \max_{t} |a_t|$

Both become LPs by introducing $u_t\ge |a_t|$ or $M\ge |a_t|$.

# Graphical Representation and Solution (Section 1.4)

## 2D geometry essentials

For $x\in\mathbb{R}^2$:

-   Each inequality $a^\mathsf{T}x \le b$ defines a **half-plane**; the
    boundary $a^\mathsf{T}x=b$ is a **line**.

-   The feasible set (intersection of half-planes) is a **polygonal
    region** (possibly unbounded).

-   Linear objective $c^\mathsf{T}x$ has level sets
    $c^\mathsf{T}x=\alpha$ which are **parallel lines**.

## Graphical solution method (algorithm you can do by hand)

1.  Plot each constraint boundary line and pick the correct feasible
    side.

2.  Identify the feasible region (intersection).

3.  Slide the objective line $c^\mathsf{T}x=\alpha$ in the improving
    direction until it last touches the feasible region.

4.  The last-touch point(s) give optimal solution(s).

::: keybox
**Four outcomes to recognize from geometry:**

1.  **Unique optimum**: objective line touches feasible set at a single
    vertex.

2.  **Multiple optima**: objective line is parallel to an edge (a face);
    every point on that edge segment is optimal.

3.  **Unbounded**: you can move indefinitely in an improving direction
    and remain feasible.

4.  **Infeasible**: feasible region is empty.
:::

## Active/binding constraints intuition

At a point $x$:

-   A constraint $a_i^\mathsf{T}x \le b_i$ is **active/binding** if
    $a_i^\mathsf{T}x=b_i$.

-   In 2D, vertices typically occur where two independent constraints
    are active (unless degeneracy).

# Linear Algebra Background and Notation (Section 1.5)

## Basic notation

-   Vectors are columns by default; $x^\mathsf{T}$ denotes a row vector.

-   $A\in\mathbb{R}^{m\times n}$ has $m$ rows, $n$ columns.

-   Matrix-vector product: $Ax$; entrywise
    $(Ax)_i=\sum_{j=1}^n a_{ij}x_j$.

## Span, linear independence, basis, dimension

::: defbox
Given vectors $x^1,\dots,x^K\in\mathbb{R}^n$:

-   Their **span** is
    $\mathrm{span}\{x^1,\dots,x^K\}=\left\{\sum_{k=1}^K \lambda_k x^k : \lambda_k\in\mathbb{R}\right\}$.

-   They are **linearly independent** if $\sum_{k=1}^K \lambda_k x^k=0$
    implies all $\lambda_k=0$.

-   A **basis** of a subspace $S$ is a linearly independent set that
    spans $S$.

-   The **dimension** of $S$ is the number of vectors in any basis of
    $S$.
:::

::: thmbox
Suppose the span $S$ of the vectors $x^1,\dots,x^K$ has dimension $m$.

1.  There exists a basis of $S$ consisting of $m$ of the vectors
    $x^1,\dots,x^K$.

2.  If $k\le m$ and $x^1,\dots,x^k$ are linearly independent, then we
    can form a basis of $S$ by starting with $x^1,\dots,x^k$ and
    choosing $m-k$ of the vectors among $x^{k+1},\dots,x^K$.
:::

## Column space, row space, rank, nullspace

Let $A\in\mathbb{R}^{m\times n}$.

::: defbox
-   **Column space** of $A$: the subspace of $\mathbb{R}^m$ spanned by
    the columns of $A$.

-   **Row space** of $A$: the subspace of $\mathbb{R}^n$ spanned by the
    rows of $A$.

-   **Rank**: $\mathrm{rank}(A)$ is the dimension of the column space
    (equivalently, row space).

-   **Nullspace**: $\mathcal{N}(A)=\{x\in\mathbb{R}^n: Ax=0\}$.
:::

::: thmbox
$$\dim(\mathcal{N}(A)) = n - \mathrm{rank}(A).$$ Interpretation: $n$
degrees of freedom minus the number of independent linear constraints.
:::

## Affine subspaces (and why $Ax=b$ is affine)

::: defbox
Let $S_0$ be a (linear) subspace of $\mathbb{R}^n$ and let
$x^0\in\mathbb{R}^n$. The set
$$S = S_0 + x^0 \;=\; \{x^0 + s : s\in S_0\}$$ is called an **affine
subspace**. In general, $S$ is not a linear subspace because it may not
contain the origin. The **dimension** of $S$ is defined as
$\dim(S)=\dim(S_0)$.
:::

::: exbox
**Why $Ax=b$ is affine:** If $S=\{x:Ax=b\}$ is nonempty, pick one
solution $x^0$ with $Ax^0=b$. Then $Ax=b \iff A(x-x^0)=0 \iff x=x^0+y$
for some $y\in\mathcal{N}(A)$. So $$\{x:Ax=b\} = x^0 + \mathcal{N}(A),$$
a translation of the nullspace.
:::

# Algorithms and Operation Counts (Section 1.6)

## What counts as "work"?

LP complexity discussions measure work using counts of basic arithmetic
operations: $$+,\ -,\ \times,\ \div$$ on numbers (and later, bit-length
issues may matter, but the chapter starts with arithmetic operation
counts).

## Useful operation-count benchmarks (memorize)

Let $A\in\mathbb{R}^{m\times n}$, $B\in\mathbb{R}^{n\times p}$.

-   Dot product of two $n$-vectors: $\sim n$ multiplications and
    $\sim (n-1)$ additions $\Rightarrow O(n)$.

-   Matrix-vector multiply $Ax$: $m$ dot-products of length $n$
    $\Rightarrow O(mn)$ operations.

-   Matrix-matrix multiply $AB$: $mp$ dot-products of length $n$
    $\Rightarrow O(mnp)$ operations.

## Big-$O$ notation (as used in the book)

::: defbox
We write $g(n)=O(f(n))$ if there exists a constant $C$ and $n_0$ such
that for all $n\ge n_0$, $$|g(n)| \le C\,|f(n)|.$$ Interpretation:
$f(n)$ is an asymptotic upper bound on growth of $g(n)$ up to constant
factors.
:::

::: keybox
**Why this matters:** Later chapters compare algorithms (simplex,
interior-point, decomposition methods) using operation counts as
functions of problem size ($m,n$) and data structure (sparsity, special
structure).
:::

# End-of-Chapter Checklist (What you should be able to do)

1.  Convert any LP with mixed constraints and free variables into
    standard form $Ax=b,\ x\ge 0$.

2.  Linearize absolute values using either $z\ge \pm u$ or split
    variables $u=u^+-u^-$.

3.  Model convex piecewise-linear costs using epigraph form
    $z\ge \alpha_k t+\beta_k$.

4.  Formulate $\ell_\infty$ and $\ell_1$ data fitting as LPs.

5.  Solve 2-variable LPs graphically and recognize
    infeasible/unbounded/multiple-optima cases.

6.  Use linear algebra terms correctly: span, basis, rank, nullspace,
    affine subspace; understand why $Ax=b$ is affine.

7.  Estimate basic operation counts for dot products and matrix
    products; understand Big-$O$ usage.
