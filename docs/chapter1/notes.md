!!! info "Key box"
    These notes summarize the *important ideas* from Chapter 1:

    1. What an LP is  
    2. Converting among equivalent forms (especially to standard form)  
    3. Modeling tricks (absolute values, piecewise-linear convex costs, data fitting)  
    4. Geometric intuition (2D graphical method)  
    5. Linear algebra + operation-count conventions used later  

# What is Linear Programming (LP)?

!!! tip "Def box — Linear Program (LP)"
    A **linear program (LP)** optimizes a **linear** objective over **linear** constraints.

    - **Objective (cost):** linear form \(c^\mathsf{T}x\).
    - **Constraints:** linear equalities/inequalities such as \(Ax \le b\), \(Ax=b\), \(Ax \ge b\).

## Common terminology

Let \(x\in\mathbb{R}^n\) be the decision vector.

- **Feasible set:** all \(x\) satisfying the constraints.
- **Feasible solution:** any \(x\) in the feasible set.
- **Optimal solution:** feasible \(x^\star\) with best objective value.
- **Infeasible:** feasible set is empty.
- **Unbounded:** objective can be improved without limit while staying feasible.

# Variants of the LP and equivalence transformations (Section 1.1)

## General inequality/equality forms

You will see many equivalent “faces” of an LP, for example:

$$
\begin{aligned}
\min \ & c^\mathsf{T}x \\
\text{s.t. } & Ax \le b,\quad x \in \mathbb{R}^n.
\end{aligned}
$$

or with mixed signs/equalities:

$$
Ax \le b,\quad A'x=b',\quad x \ge 0,\quad x_j\ \text{free},\ \text{etc.}
$$

!!! tip "Def box — Standard form LP"
    A common **standard form LP** is

    $$
    \begin{aligned}
    \min \ & c^\mathsf{T}x\\
    \text{s.t. } & Ax=b,\\
    & x\ge 0.
    \end{aligned}
    $$

    Many algorithms (simplex, interior-point) are developed for, or easily reduced to, this form.

## Transformation rules (memorize)

These are the core modeling moves.

!!! example "Minimization vs maximization"
    $$
    \max \ c^\mathsf{T}x \quad \Longleftrightarrow \quad \min \ (-c)^\mathsf{T}x.
    $$

!!! example "Equality to two inequalities"
    $$
    a^\mathsf{T}x = \beta \quad \Longleftrightarrow \quad
    a^\mathsf{T}x \le \beta \ \text{and}\ a^\mathsf{T}x \ge \beta.
    $$

!!! example "Inequalities to equalities (slack / surplus)"
    - If \(a^\mathsf{T}x \le \beta\), introduce **slack** \(s\ge 0\):

      $$
      a^\mathsf{T}x + s = \beta,\qquad s\ge 0.
      $$

    - If \(a^\mathsf{T}x \ge \beta\), introduce **surplus** \(s\ge 0\):

      $$
      a^\mathsf{T}x - s = \beta,\qquad s\ge 0.
      $$

!!! example "Free variable as difference of nonnegatives"
    If \(x_i\) is unrestricted in sign, write

    $$
    x_i = x_i^+ - x_i^-,\qquad x_i^+\ge 0,\ \ x_i^-\ge 0.
    $$

    Replace \(x_i\) everywhere with \(x_i^+ - x_i^-\).

!!! info "Key box — Equivalence idea"
    These transformations preserve the feasible set *in the original variables* (via projection) and preserve the objective value for corresponding feasible points.

    After introducing slacks/surpluses/splits, the LP lives in a higher-dimensional space, but it represents the same decision problem.

# Modeling examples and patterns (Section 1.2)

The point of the examples is the **pattern**, not the story.

## Absolute values

We often need to linearize \(|u|\) where \(u\) is affine (e.g., \(u=a^\mathsf{T}x-b\)).

!!! example "Method A (epigraph / z-method)"
    Introduce \(z\ge 0\) with

    $$
    z \ge u,\qquad z \ge -u.
    $$

    Then \(z\ge |u|\). If you minimize \(z\) (or \(z\) has nonnegative weight in the objective), the optimum forces \(z=|u|\).

!!! example "Method B (split / \(u^+,u^-\) method)"
    Introduce \(u^+,u^-\ge 0\) with

    $$
    u = u^+ - u^-,\qquad |u| = u^+ + u^- \ (\text{at optimum}).
    $$

    Replace \(|u|\) with \(u^+ + u^-\).

## Piecewise-linear convex costs

If \(f(\cdot)\) is piecewise-linear and convex, it can be written as a maximum of affine functions:

$$
f(t) = \max_{k=1,\dots,K}\{\alpha_k t + \beta_k\}.
$$

!!! example "LP epigraph form"
    Introduce \(z\) and enforce

    $$
    z \ge \alpha_k t + \beta_k,\quad k=1,\dots,K.
    $$

    Minimizing \(z\) (or adding \(z\) to the objective) models \(f(t)\).

## Data fitting (two classic LP norms)

Given data \((a_i,b_i)\) and prediction \(\hat b_i = a_i^\mathsf{T}x\).

!!! example "\(\ell_\infty\) (minimax) fit"
    Residual \(r_i=b_i-a_i^\mathsf{T}x\). Minimize \(\max_i |r_i|\):

    $$
    \min z \quad \text{s.t.}\quad |b_i-a_i^\mathsf{T}x| \le z,\ \ i=1,\dots,m.
    $$

    Linearize:

    $$
    b_i-a_i^\mathsf{T}x \le z,\qquad -(b_i-a_i^\mathsf{T}x)\le z.
    $$

!!! example "\(\ell_1\) fit"
    $$
    \min \sum_{i=1}^m |b_i-a_i^\mathsf{T}x|.
    $$

    Introduce \(z_i\ge 0\):

    $$
    b_i-a_i^\mathsf{T}x \le z_i,\quad -(b_i-a_i^\mathsf{T}x)\le z_i,\quad i=1,\dots,m,
    $$

    and minimize \(\sum_i z_i\).

## Multi-period planning / capacity expansion pattern

!!! info "Key box — Windowed-sum time coupling"
    Time-coupling constraints often look like

    $$
    \text{available}_t = \sum_{s=\max(1,t-L+1)}^t \text{add}_s,
    $$

    where \(L\) is a lifetime (window length).

## Discrete-time rocket planning (absolute value objective)

Dynamics:

$$
x_{t+1}=x_t+v_t,\qquad v_{t+1}=v_t+a_t,
$$

with boundary conditions \((x_0,v_0)\) and \((x_T,v_T)\).

Two LP objectives:

- Fuel proxy: \(\min \sum_{t=0}^{T-1} |a_t|\)
- Peak thrust: \(\min \max_t |a_t|\)

Both become LPs by introducing \(u_t\ge |a_t|\) or \(M\ge |a_t|\).

# Graphical representation and solution (Section 1.4)

## 2D geometry essentials

For \(x\in\mathbb{R}^2\):

- Each inequality \(a^\mathsf{T}x \le b\) defines a **half-plane**; the boundary \(a^\mathsf{T}x=b\) is a **line**.
- The feasible set is a **polygonal region** (possibly unbounded).
- Linear objective \(c^\mathsf{T}x\) has level sets \(c^\mathsf{T}x=\alpha\) which are **parallel lines**.

## Graphical solution method (by hand)

1. Plot each constraint boundary line and pick the feasible side.
2. Identify the feasible region (intersection).
3. Slide the objective line \(c^\mathsf{T}x=\alpha\) in the improving direction until it last touches the feasible region.
4. The last-touch point(s) give optimal solution(s).

!!! info "Key box — Four outcomes"
    1. **Unique optimum:** touches at a single vertex.  
    2. **Multiple optima:** objective line parallel to an edge (entire edge segment optimal).  
    3. **Unbounded:** can improve indefinitely while feasible.  
    4. **Infeasible:** feasible region empty.  

## Active/binding constraints

A constraint \(a_i^\mathsf{T}x \le b_i\) is **active/binding** at \(x\) if \(a_i^\mathsf{T}x=b_i\).

# Linear algebra background and notation (Section 1.5)

## Basic notation

- Vectors are columns by default; \(x^\mathsf{T}\) denotes a row vector.
- \(A\in\mathbb{R}^{m\times n}\) has \(m\) rows and \(n\) columns.
- \((Ax)_i=\sum_{j=1}^n a_{ij}x_j\).

## Span, independence, basis, dimension

!!! tip "Def box — Span / independence / basis / dimension"
    Given \(x^1,\dots,x^K\in\mathbb{R}^n\):

    - \(\mathrm{span}\{x^1,\dots,x^K\}=\left\{\sum_{k=1}^K \lambda_k x^k:\lambda_k\in\mathbb{R}\right\}\)
    - Independent if \(\sum_{k=1}^K \lambda_k x^k=0 \Rightarrow \lambda_k=0\ \forall k\)
    - Basis = independent set that spans
    - \(\dim(S)\) = number of vectors in any basis

!!! note "Theorem-like fact"
    If the span \(S\) of \(x^1,\dots,x^K\) has dimension \(m\), then some \(m\) of these vectors form a basis of \(S\).

## Column space, row space, rank, nullspace

!!! tip "Def box — Column/row space, rank, nullspace"
    Let \(A\in\mathbb{R}^{m\times n}\).

    - Column space: span of columns of \(A\) (a subspace of \(\mathbb{R}^m\))
    - Row space: span of rows of \(A\) (a subspace of \(\mathbb{R}^n\))
    - \(\mathrm{rank}(A)\) = dimension of column space (= row space)
    - \(\mathcal{N}(A)=\{x\in\mathbb{R}^n:Ax=0\}\)

!!! note "Rank–nullity"
    $$
    \dim(\mathcal{N}(A)) = n - \mathrm{rank}(A).
    $$

## Affine subspaces (and why \(Ax=b\) is affine)

!!! tip "Def box — Affine subspace"
    Let \(S_0\) be a linear subspace of \(\mathbb{R}^n\) and \(x^0\in\mathbb{R}^n\).
    The set

    $$
    S = S_0 + x^0 = \{x^0+s:s\in S_0\}
    $$

    is an **affine subspace**. In general it is not linear because it may not contain the origin.
    Define \(\dim(S)=\dim(S_0)\).

!!! example "Why \(Ax=b\) is affine"
    If \(S=\{x:Ax=b\}\) is nonempty, pick one solution \(x^0\) with \(Ax^0=b\).
    Then

    $$
    Ax=b \iff A(x-x^0)=0 \iff x=x^0+y,\ \ y\in\mathcal{N}(A).
    $$

    Hence

    $$
    \{x:Ax=b\}=x^0+\mathcal{N}(A),
    $$

    a translation of the nullspace.

# Algorithms and operation counts (Section 1.6)

## What counts as “work”?

Work is measured by counts of arithmetic operations \(+,-,\times,\div\).

## Benchmarks

Let \(A\in\mathbb{R}^{m\times n}\), \(B\in\mathbb{R}^{n\times p}\).

- Dot product of two \(n\)-vectors: \(O(n)\)
- Matrix-vector multiply \(Ax\): \(O(mn)\)
- Matrix-matrix multiply \(AB\): \(O(mnp)\)

## Big-\(O\) notation

!!! tip "Def box — Big-O"
    We write \(g(n)=O(f(n))\) if there exist constants \(C\) and \(n_0\) such that for all \(n\ge n_0\),

    $$
    |g(n)| \le C\,|f(n)|.
    $$

!!! info "Key box"
    Later chapters compare algorithms (simplex, interior-point, decomposition) using operation counts as functions of \(m,n\) and structure (e.g., sparsity).

# End-of-chapter checklist

1. Convert any LP into standard form \(Ax=b,\ x\ge 0\).
2. Linearize absolute values using either \(z\ge \pm u\) or split variables \(u=u^+-u^-\).
3. Model convex piecewise-linear costs using epigraph form \(z\ge \alpha_k t+\beta_k\).
4. Formulate \(\ell_\infty\) and \(\ell_1\) data fitting as LPs.
5. Solve 2-variable LPs graphically; recognize infeasible/unbounded/multiple-optima cases.
6. Use span/basis/rank/nullspace/affine-subspace correctly; know why \(Ax=b\) is affine.
7. Estimate basic operation counts for dot products and matrix products; understand Big-\(O\).
