## 4.1 Motivation

Duality theory can be motivated as an extension of the **Lagrange multiplier** idea from calculus: instead of enforcing a constraint “hard,” we allow it to be violated but assign a **price/penalty** to the violation. In LP, the “right prices” end up being found by solving a new LP (the **dual**).

---

### 4.1.1 A warm-up: Lagrange multiplier idea (calculus analogy)

!!! info "Key box — The core idea behind Lagrange multipliers"
    Instead of enforcing a hard equality constraint exactly, we:
    - allow the constraint to be violated, and
    - introduce a **price** (multiplier) for the amount of violation,
    so the constrained problem is replaced by an **unconstrained** penalized problem.

!!! note "Example (as in the text)"
    Minimize \(x^2+y^2\) subject to \(x+y=1\).  
    Introduce multiplier \(p\) and define the Lagrangian  
    \(L(x,y,p)=x^2+y^2+p(1-x-y)\).

!!! tip "Computation box — Minimizing \(L\) over \((x,y)\) for fixed \(p\)"
    For fixed \(p\), minimize w.r.t. \(x,y\) by setting derivatives to zero:
    - \(\partial L/\partial x = 2x - p = 0 \Rightarrow x=p/2\)
    - \(\partial L/\partial y = 2y - p = 0 \Rightarrow y=p/2\)

    Enforcing the original constraint \(x+y=1\) gives  
    \(p/2+p/2=1 \Rightarrow p=1\), hence \(x=y=1/2\).

!!! info "Intuition box"
    When the “price” \(p\) is chosen correctly (here \(p=1\)), the solution that minimizes the penalized problem also satisfies the hard constraint, so the hard constraint becomes “irrelevant” at the optimum.

---

### 4.1.2 Doing the same thing in linear programming

We consider the **standard form** primal LP:

- minimize \(c^\top x\)
- subject to \(Ax=b\), \(x\ge 0\)

Assume an optimal solution \(x^\*\) exists.

!!! tip "Definition box — Relaxed (penalized) problem and the function \(g(p)\)"
    Introduce a price vector \(p\in\mathbb{R}^m\) and **relax** the equality \(Ax=b\) by penalizing violation:
    - relaxed problem: minimize \(c^\top x + p^\top(b-Ax)\) subject to \(x\ge 0\)
    - define \(g(p)\) = optimal value of the relaxed problem:
      \(g(p)=\min_{x\ge 0}\big[c^\top x + p^\top(b-Ax)\big]\)

!!! note "Key box — Why \(g(p)\) is always a lower bound on the primal optimum"
    The relaxed problem allows more freedom than the original primal (because we don’t force \(Ax=b\); we only penalize violation).  
    Take the primal optimal solution \(x^\*\) (feasible, so \(Ax^\*=b\)):
    - \(g(p) \le c^\top x^\* + p^\top(b-Ax^\*) = c^\top x^\*\)

    So for every \(p\), \(g(p)\) gives a **lower bound** on the optimal primal cost.

---

### 4.1.3 Dual as “best possible lower bound”

!!! info "Key box — Dual problem = tightest lower bound of this form"
    Since every \(p\) gives a lower bound \(g(p)\le c^\top x^\*\), it is natural to search for the **tightest** such bound:
    - maximize \(g(p)\) over all \(p\)

    This maximization problem is what becomes the **dual**.

---

### 4.1.4 Compute \(g(p)\) and see the dual constraints appear

Start from the definition:
- \(g(p)=\min_{x\ge 0}\big[c^\top x + p^\top(b-Ax)\big]\)

Rewrite:
- \(g(p)=\min_{x\ge 0}\big[p^\top b + (c^\top - p^\top A)x\big]\)
- \(g(p)=p^\top b + \min_{x\ge 0}(c^\top - p^\top A)x\)

!!! tip "Key box — The crucial minimization fact"
    Consider \(\min_{x\ge 0}(c^\top - p^\top A)x\).

    - If \(c^\top - p^\top A \ge 0^\top\) (componentwise), the minimum is achieved at \(x=0\), so the minimum equals \(0\).
    - If any component of \(c^\top - p^\top A\) is negative, we can drive the objective to \(-\infty\) by increasing the corresponding \(x_j\), so the minimum is \(-\infty\).

So:
- \(g(p)=p^\top b\) if \(p^\top A \le c^\top\)
- \(g(p)=-\infty\) otherwise

!!! info "Conclusion box — Dual problem for standard form"
    To maximize \(g(p)\), we only consider \(p\) that make \(g(p)\) finite, i.e. those satisfying \(p^\top A \le c^\top\).  
    Therefore, the **dual** is:

    - maximize \(p^\top b\)
    - subject to \(p^\top A \le c^\top\)

---

### 4.1.5 Where sign restrictions come from (preview of the general dual)

The standard form example had equality constraints \(Ax=b\), and we ended up with **no sign restriction** on \(p\) (i.e., “\(p\) free”). Different primal constraint types produce different sign restrictions and dual constraint directions.

!!! note "Key box — Inequalities in the primal create sign restrictions in the dual (idea)"
    If the primal had constraints \(Ax\ge b\), we can rewrite them as equalities using surplus variables:
    - \(Ax - s = b\) with \(s\ge 0\)

    When you dualize that standard-form version, the nonnegativity of \(s\) forces the corresponding dual condition that the associated prices satisfy \(p\ge 0\).

!!! note "Key box — Free variables in the primal create equalities in the dual (idea)"
    If a primal variable is free (unrestricted sign), it can be written as a difference of two nonnegative variables:
    - \(x = x^+ - x^-\) with \(x^+\ge 0,\;x^-\ge 0\)

    This “splitting” is the algebraic reason dual constraints may become equalities (you effectively get two inequalities that must both hold, hence equality).


