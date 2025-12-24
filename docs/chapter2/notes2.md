# Chapter 2 — Geometry of Linear Programming

## 2.1 Polyhedra and Convex Sets

!!! info "Key box"
    Section 2.1 sets up the *geometry language* used throughout LP:

    1. A **polyhedron** is the feasible set of linear inequalities (intersection of halfspaces)  
    2. **Bounded vs unbounded** sets (can the feasible region extend to infinity?)  
    3. **Hyperplanes** (equalities) and **halfspaces** (inequalities)  
    4. **Convexity**: line segment between feasible points stays feasible  
    5. **Convex combinations** and **convex hull**  
    6. Closure facts (Theorem 2.1): intersections preserve convexity, polyhedra are convex

---

### Polyhedra (feasible sets of LP constraints)

!!! tip "Def box — Polyhedron"
    A **polyhedron** is any set that can be written as
    \[
    P=\{x\in\mathbb{R}^n \mid Ax \ge b\},
    \]
    i.e., the set of vectors satisfying finitely many linear inequalities.

**Interpretation:** Each inequality is a “cut” of the space; the feasible region is what remains after applying all cuts.

---

### Boundedness

!!! tip "Def box — Bounded set"
    A set \(S\subseteq\mathbb{R}^n\) is **bounded** if there exists a constant \(K\) such that
    \[
    |x_i|\le K \quad \text{for every } x\in S \text{ and each component } i.
    \]

- **Bounded polyhedron**: trapped inside some big box.
- **Unbounded polyhedron**: you can move infinitely far in some direction while staying feasible.

**Why it matters later:** Unboundedness can lead to LPs with no finite optimum (depending on the objective direction).

---

### Hyperplanes and Halfspaces (single linear constraints)

Let \(a\neq 0\) and \(b\in\mathbb{R}\).

!!! tip "Def box — Hyperplane"
    The **hyperplane** with normal \(a\) and offset \(b\) is
    \[
    H=\{x\in\mathbb{R}^n \mid a^\mathsf{T}x=b\}.
    \]

!!! tip "Def box — Halfspace"
    The **halfspace** defined by the inequality is
    \[
    S=\{x\in\mathbb{R}^n \mid a^\mathsf{T}x\ge b\}.
    \]

**Key geometric facts**
- The hyperplane \(a^\mathsf{T}x=b\) is the **boundary** of the halfspace \(a^\mathsf{T}x\ge b\).
- The vector \(a\) is **perpendicular (normal)** to the hyperplane:

  If \(x,y\in H\), then \(a^\mathsf{T}x=b\) and \(a^\mathsf{T}y=b\), so
  \[
  a^\mathsf{T}(x-y)=0,
  \]
  meaning any direction along the hyperplane is orthogonal to \(a\).

**Polyhedron viewpoint**
\[
P=\{x\mid Ax\ge b\}
\]
is the **intersection of finitely many halfspaces** (one per row of \(A\)).

---

### Convex Sets (the main structural property)

!!! tip "Def box — Convex set"
    A set \(S\subseteq\mathbb{R}^n\) is **convex** if for any \(x,y\in S\) and any \(\lambda\in[0,1]\),
    \[
    \lambda x + (1-\lambda)y\in S.
    \]
    (Equivalently: the whole line segment between any two points in \(S\) lies in \(S\).)

**Why convexity matters for LP**
- If \(x\) and \(y\) are feasible, then any “mix” of them is feasible.
- This property is fundamental for later results like “an optimum occurs at a corner/extreme point.”

---

### Convex combinations and convex hull

!!! tip "Def box — Convex combination"
    A vector \(z\) is a **convex combination** of \(x^1,\dots,x^k\) if
    \[
    z=\sum_{i=1}^k \lambda_i x^i,\qquad
    \lambda_i\ge 0,\qquad
    \sum_{i=1}^k \lambda_i = 1.
    \]

!!! tip "Def box — Convex hull"
    The **convex hull** of points \(x^1,\dots,x^k\) is the set of all their convex combinations:
    \[
    \mathrm{conv}\{x^1,\dots,x^k\}
    =
    \left\{\sum_{i=1}^k \lambda_i x^i \; \middle|\;
    \lambda_i\ge 0,\ \sum_{i=1}^k\lambda_i=1\right\}.
    \]
    It is the **smallest convex set** containing those points.

---

### Theorem 2.1 (closure properties you’ll use repeatedly)

!!! success "Theorem box — Basic convexity facts"
    1. The **intersection** of convex sets is convex.  
    2. Every **polyhedron** is convex.  
       (Halfspaces are convex, and a polyhedron is an intersection of halfspaces.)  
    3. If \(S\) is convex and \(x^1,\dots,x^k\in S\), then every **convex combination**
       \(\sum_{i=1}^k \lambda_i x^i\) lies in \(S\).  
    4. The **convex hull** of finitely many points is convex.

!!! note "Proof idea (what to remember)"
    - Halfspace convexity: if \(a^\mathsf{T}x\ge b\) and \(a^\mathsf{T}y\ge b\), then
      \[
      a^\mathsf{T}(\lambda x+(1-\lambda)y)
      =\lambda a^\mathsf{T}x+(1-\lambda)a^\mathsf{T}y
      \ge \lambda b+(1-\lambda)b=b.
      \]
    - Intersections preserve convexity: if the segment stays in each set, it stays in their intersection.

---

!!! info "Section 2.1 — What to be able to say quickly (exam checklist)"
    - A feasible set of linear inequalities is a **polyhedron**: \(P=\{x\mid Ax\ge b\}\).  
    - Each inequality defines a **halfspace**; equalities define **hyperplanes**.  
    - Polyhedra are **convex** (intersection of convex halfspaces).  
    - **Bounded** means contained in a box; **unbounded** means it extends to infinity.  
    - **Convex combination** and **convex hull** formalize “mixing” feasible points.
