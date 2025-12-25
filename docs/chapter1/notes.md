!!! info "Key box"
    These notes are typed from my handwritten Chapter 1 notes and capture the main definitions + reformulations:
    
    1. General LP formulation (objective + constraint families)  
    2. Turning equalities into inequalities and writing LP in matrix form  
    3. Local vs global minima; convexity fact  
    4. Piecewise-linear convex objectives and epigraph reformulation  
    5. Absolute value modeling (two equivalent LP reformulations)  
    6. Graphical (2D) geometry + solution method  
    7. Subspaces, span, and affine subspaces  

# Introduction: General LP Form

In a general linear programming (LP) problem, we are given a cost vector
\(c=(c_1,\dots,c_n)\) and we seek to minimize a linear function
\(c^\mathsf{T}x=\sum_{i=1}^n c_i x_i\) over a decision vector
\(x=(x_1,\dots,x_n)\), subject to linear equality/inequality constraints.

Let \(M_1,M_2,M_3\) be finite index sets. For each constraint \(i\), we are given:
- an \(n\)-dimensional vector \(a_i\),
- a scalar \(b_i\),

and these form the \(i\)-th linear constraint.

Let \(N_1,N_2 \subseteq \{1,\dots,n\}\) indicate which variables are constrained to be nonnegative or nonpositive, respectively.

!!! tip "Def box — General LP"
    $\begin{aligned}
    \min\ & c^\mathsf{T}x\\[2mm]
    \text{s.t. } 
    & a_i^\mathsf{T}x \ge b_i, && i\in M_1,\\
    & a_i^\mathsf{T}x \le b_i, && i\in M_2,\\
    & a_i^\mathsf{T}x = b_i, && i\in M_3,\\
    & x_j \ge 0, && j\in N_1,\\
    & x_j \le 0, && j\in N_2.
    \end{aligned}$

!!! info "Terminology"
    - Variables \(x_1,\dots,x_n\) are **decision variables**.  
    - A vector \(x\) satisfying all constraints is a **feasible solution** (feasible vector).  
    - The set of all feasible solutions is the **feasible set / feasible region**.  
    - If \(j\notin N_1\cup N_2\), then \(x_j\) is a **free (unrestricted) variable**.  
    - The function \(c^\mathsf{T}x\) is the **objective function / cost function**.  
    - A feasible solution minimizing the objective is an **optimal solution** \(x^\star\).  
    - The value \(c^\mathsf{T}x^\star\) is the **optimal cost**.

# Converting Constraints + Matrix Form

## Equality as two inequalities

!!! note "Equality constraint equivalence"
    An equality constraint can be written as two inequalities:
    $a_i^\mathsf{T}x=b_i \quad \Longleftrightarrow \quad 
    \big(a_i^\mathsf{T}x\le b_i\big)\ \text{and}\ \big(a_i^\mathsf{T}x\ge b_i\big).$

Also, constraints like \(x_j\ge 0\) or \(x_j\le 0\) can be viewed as special cases of linear inequalities.

## Expressing everything as one inequality direction

By multiplying some constraints by \(-1\), we can express the feasible set using inequalities of a single direction (e.g. all “\(\ge\)” constraints).

!!! tip "Def box — Matrix form (one-direction inequalities)"
    We can write an LP in matrix form as
    $\begin{aligned}
    \min\ & c^\mathsf{T}x\\
    \text{s.t. } & Ax \ge b,
    \end{aligned}$
    where \(A\) is formed by stacking appropriate row vectors (derived from the \(a_i^\mathsf{T}\)), \(x=[x_1,\dots,x_n]^\mathsf{T}\), and \(b=[b_1,\dots,b_m]^\mathsf{T}\).

# Local vs Global Minima (Convexity Fact)

!!! tip "Def box — Local minimum"
    A vector \(x\) is a **local minimum** of \(f\) if \(f(x)\le f(y)\) for all \(y\) in a neighborhood of \(x\).

!!! tip "Def box — Global minimum"
    A vector \(x\) is a **global minimum** of \(f\) if \(f(x)\le f(y)\) for all \(y\).

!!! note "Key fact (convexity)"
    A convex function cannot have a local minimum that is not a global minimum.

# Piecewise-Linear Convex Functions

Let \(c_1,\dots,c_m\in\mathbb{R}^n\) be vectors and \(d_1,\dots,d_m\in\mathbb{R}\) be scalars. Consider
$f(x)=\max_{i=1,\dots,m}\big(c_i^\mathsf{T}x+d_i\big).$

!!! info "Key box"
    The function \(f(x)=\max_i (c_i^\mathsf{T}x+d_i)\) is **convex** and is called a **piecewise-linear convex function**.
    
    Piecewise-linear convex functions can be used to approximate more general convex functions.

## LP with piecewise-linear convex objective (epigraph trick)

Consider the problem:
$\min\ \max_{i=1,\dots,m}(c_i^\mathsf{T}x+d_i)
\quad \text{s.t.}\quad Ax\ge b.$

Introduce \(z\) as the smallest number satisfying \(z\ge c_i^\mathsf{T}x+d_i\) for all \(i\). Then we can reformulate as an LP:

!!! example "Epigraph reformulation"
    $\begin{aligned}
    \min\ & z\\
    \text{s.t. } & z \ge c_i^\mathsf{T}x+d_i,\quad i=1,\dots,m,\\
    & Ax\ge b.
    \end{aligned}$

## Constraint of the form \(f(x)\le h\)

If \(f\) is piecewise-linear convex,
$f(x)=\max_{i=1,\dots,m}(f_i^\mathsf{T}x+g_i),$
then a constraint \(f(x)\le h\) can be written as the system:
$f_i^\mathsf{T}x+g_i\le h,\quad i=1,\dots,m.$

# Problems Involving Absolute Values

Consider:
$\min \sum_{i=1}^n c_i|x_i| \quad \text{s.t.}\quad Ax\ge b.$

## LP formulation A: introduce \(z_i\) (absolute value linearization)

!!! example "Absolute value via \(z_i\)"
    Introduce \(z_i\ge 0\) such that \(z_i\ge |x_i|\) using:
    $x_i \le z_i,\qquad -x_i \le z_i,\qquad i=1,\dots,n.$
    Then the LP becomes:
    $\begin{aligned}
    \min\ & \sum_{i=1}^n c_i z_i\\
    \text{s.t. } & Ax\ge b,\\
    & x_i \le z_i,\ \ -x_i \le z_i,\quad i=1,\dots,n.
    \end{aligned}$

## LP formulation B: split variables \(x=x^+-x^-\)

Write each \(x_i\) as difference of two nonnegative variables:
\(x_i=x_i^+-x_i^-\) with \(x_i^+,x_i^-\ge 0\). Then \(|x_i|=x_i^++x_i^-\).

!!! example "Absolute value via split variables"
    Replace:
    $x = x^+ - x^-,$
    and
    $|x_i| = x_i^+ + x_i^-.$
    Then:
    $\begin{aligned}
    \min\ & \sum_{i=1}^n c_i(x_i^+ + x_i^-)\\
    \text{s.t. } & A x^+ - A x^- \ge b,\\
    & x^+\ge 0,\ \ x^-\ge 0.
    \end{aligned}$

# Graphical Representation and Solution (2D)

## Core geometry

Let the feasible set be
$P=\{x\mid Ax\le b\}.$

!!! info "Key box — Core geometry"
    - \(P\) is a **polyhedron** (intersection of half-spaces).  
    - In 2D, \(P\) is a **polygonal region** (possibly unbounded).  
    - Each inequality \(a_i^\mathsf{T}x\le b_i\) defines a **half-plane**.  
    - The boundary \(a_i^\mathsf{T}x=b_i\) is a **line**.

!!! tip "Def box — Corner/vertex"
    A **corner / vertex** is a point in \(P\) that cannot be written as a nontrivial convex combination of other feasible points.

!!! tip "Def box — Edge/face"
    An **edge/face** is the set of feasible points where some constraints hold with equality.

## Objective geometry and the graphical method (2D)

Consider objective level sets:
$c^\mathsf{T}x=\alpha.$

!!! example "Graphical method (2D)"
    1. Plot each constraint boundary line and choose the correct feasible half-plane.  
    2. Find the intersection polygon (the feasible region).  
    3. Slide the objective line \(c^\mathsf{T}x=\alpha\) outward (in the improving direction) until the last point of contact with the feasible region.  
    4. That last contact point (or contact edge) gives the optimum.

# Subspaces and Span

!!! tip "Def box — Subspace"
    A nonempty subset \(S\subseteq \mathbb{R}^n\) is a **subspace** of \(\mathbb{R}^n\) if for every \(x,y\in S\) and every \(a,b\in\mathbb{R}\),
    $ax+by\in S.$
    If \(S\ne \mathbb{R}^n\), then \(S\) is a **proper subspace**.

!!! note "Key property"
    Every subspace contains the zero vector.

!!! tip "Def box — Span"
    The span of vectors \(y^1,\dots,y^K\in\mathbb{R}^n\) is the set
    $\mathrm{span}\{y^1,\dots,y^K\}
      =\left\{\sum_{k=1}^K a_k y^k \;:\; a_k\in\mathbb{R}\right\}.$

# Affine Subspaces

Let \(S_0\) be a subspace of \(\mathbb{R}^n\) and let \(x^0\in\mathbb{R}^n\). Define:
$S = S_0 + x^0 = \{s + x^0 \mid s\in S_0\}.$

!!! tip "Def box — Affine subspace"
    In general, \(S\) is **not** a subspace because it may not contain the zero vector.  
    Such a translated set \(S=S_0+x^0\) is called an **affine subspace**.
