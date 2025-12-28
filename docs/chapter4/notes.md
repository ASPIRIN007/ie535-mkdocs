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


## 4.2 The dual problem

In Section 4.1 we built intuition: for a primal **minimization** problem, every choice of prices (dual variables) gives a **lower bound** on the primal optimal cost, and the dual problem maximizes this bound. In this section we define the dual for a **general LP** (with mixed constraint directions and mixed variable sign restrictions).

---

### 4.2.1 General primal–dual definition (most general form)

!!! tip "Definition box — General primal (minimization form)"
    Let \(A\) be a matrix with rows \(a_i^\top\) and columns \(A_j\).  
    Partition the constraint indices into \(M_1, M_2, M_3\) and the variable indices into \(N_1, N_2, N_3\).

    The **primal** problem is:
    - minimize \(c^\top x\)
    - subject to  
      - \(a_i^\top x \ge b_i,\ \ i\in M_1\)  
      - \(a_i^\top x \le b_i,\ \ i\in M_2\)  
      - \(a_i^\top x = b_i,\ \ i\in M_3\)  
      - \(x_j \ge 0,\ \ j\in N_1\)  
      - \(x_j \le 0,\ \ j\in N_2\)  
      - \(x_j\) free,\ \ \(j\in N_3\)

!!! tip "Definition box — Dual associated with the above primal"
    Introduce dual variables \(p_i\) for primal constraints \(i\in M_1\cup M_2\cup M_3\).  
    The **dual** problem is:
    - maximize \(p^\top b\)
    - subject to  
      - \(p_i \ge 0,\ \ i\in M_1\)  
      - \(p_i \le 0,\ \ i\in M_2\)  
      - \(p_i\) free,\ \ \(i\in M_3\)  
      - \(p^\top A_j \le c_j,\ \ j\in N_1\)  
      - \(p^\top A_j \ge c_j,\ \ j\in N_2\)  
      - \(p^\top A_j = c_j,\ \ j\in N_3\)

!!! info "Key box — Constraint/variable “swap” principle"
    - Each **primal constraint** (other than sign constraints on variables) produces a **dual variable**.  
    - Each **primal variable** produces a **dual constraint**.  
    - The direction/equality and sign restrictions determine whether the dual side is \(\ge 0\), \(\le 0\), free, or \(\le/\ge/=\).

---

### 4.2.2 Table 4.1: mechanical rules (primal min ↔ dual max)

!!! note "Key box — Table 4.1 (rules you should memorize)"
    **Primal constraints** \(\longrightarrow\) **Dual variable sign** (dual is a maximization problem)

    | Primal constraint type | Dual variable sign |
    |---|---|
    | \(\ge b_i\) | \(p_i \ge 0\) |
    | \(\le b_i\) | \(p_i \le 0\) |
    | \(= b_i\) | \(p_i\) free |

    **Primal variable sign** \(\longrightarrow\) **Dual constraint type**

    | Primal variable type | Dual constraint on \(p^\top A_j\) |
    |---|---|
    | \(x_j \ge 0\) | \(p^\top A_j \le c_j\) |
    | \(x_j \le 0\) | \(p^\top A_j \ge c_j\) |
    | \(x_j\) free | \(p^\top A_j = c_j\) |

!!! info "Convention box"
    If we start with a **maximization** primal, we can convert it to an equivalent **minimization** problem and then apply the rules above.  
    To avoid confusion, we will adhere to the convention: **primal = minimization**, **dual = maximization**.

---

### 4.2.3 Compact matrix pairs (common special cases)

!!! note "Key box — Standard form (equalities + nonnegativity)"
    Primal:
    - minimize \(c^\top x\)
    - subject to \(Ax=b\), \(x\ge 0\)

    Dual:
    - maximize \(p^\top b\)
    - subject to \(p^\top A \le c^\top\)  
      (equivalently \(A^\top p \le c\))

!!! note "Key box — Inequalities \(Ax\ge b\) (no explicit sign constraint on \(x\) shown here)"
    Primal:
    - minimize \(c^\top x\)
    - subject to \(Ax\ge b\)

    Dual:
    - maximize \(p^\top b\)
    - subject to \(p^\top A = c^\top\), \(p\ge 0\)

!!! info "Intuition box"
    - A **free** primal variable forces an **equality** in the dual.  
    - A primal constraint of type \(\ge\) forces a **nonnegative** dual variable (prices cannot be negative when the constraint is of “at least” type).

---

### 4.2.4 Example 4.1: the dual of the dual is the primal

!!! tip "Example box — Form the dual using Table 4.1"
    **Primal (given):**  
    minimize \(x_1 + 2x_2 + 3x_3\)  
    subject to  
    - \(-x_1 + 3x_2 = 5\)  
    - \(2x_1 - x_2 + 3x_3 \ge 6\)  
    - \(x_3 \le 4\)  
    - \(x_1 \ge 0,\ \ x_2 \le 0,\ \ x_3\) free

    **Dual (by the rules):**  
    maximize \(5p_1 + 6p_2 + 4p_3\)  
    subject to  
    - \(p_1\) free (because the first primal constraint is an equality)  
    - \(p_2 \ge 0\) (because the second primal constraint is \(\ge\))  
    - \(p_3 \le 0\) (because the third primal constraint is \(\le\))  
    - \(-p_1 + 2p_2 \le 1\) (because \(x_1\ge 0\))  
    - \(3p_1 - p_2 \ge 2\) (because \(x_2\le 0\))  
    - \(3p_2 + p_3 = 3\) (because \(x_3\) is free)

!!! note "Key box — Converting the dual back into the primal"
    If we:
    1) transform the dual into an equivalent **minimization** problem,  
    2) and then form its **dual**,  
    we obtain a problem equivalent to the original primal.

    (This is illustrated in the text by explicitly dualizing twice and observing that the resulting problem matches the original primal up to trivial sign/format changes.)

---

### 4.2.5 Theorem 4.1 (dual of the dual)

!!! info "Theorem box — The dual of the dual is the primal"
    If we transform the dual into an equivalent minimization problem and then form its dual, we obtain a problem equivalent to the original primal problem.

!!! note "Remark box — Equivalent primal forms lead to equivalent duals"
    A linear program can be rewritten in many equivalent ways (e.g., add slack/surplus variables; replace a free variable by the difference of two nonnegative variables).  
    These different—but equivalent—primal forms may yield different-looking duals, but the resulting dual problems are **equivalent**.


## 4.3 The duality theorem

### 4.3.1 A useful decomposition: \(U_i\) and \(V_j\)

!!! tip "Definition box — The quantities \(U_i\) and \(V_j\)"
    For any vectors \(x\) and \(p\), define
    - \(U_i \;=\; p_i\,(a_i^\top x - b_i)\)  (one term per **primal constraint**),
    - \(V_j \;=\; (c_j - p^\top A_j)\,x_j\) (one term per **primal variable**).

!!! note "Key box — Why \(U_i\ge 0\) and \(V_j\ge 0\) under feasibility"
    If \(x\) is **primal feasible** and \(p\) is **dual feasible**, then:
    - For each constraint \(i\), dual feasibility forces the **sign of \(p_i\)** to match the direction of the primal constraint, so \(p_i(a_i^\top x - b_i)\ge 0\), hence \(U_i\ge 0\).
    - For each variable \(j\), primal feasibility forces the **sign of \(x_j\)** (e.g., \(x_j\ge 0\), \(x_j\le 0\), or free), and dual feasibility forces the matching inequality/equality on \(p^\top A_j\) relative to \(c_j\); together they imply \((c_j - p^\top A_j)x_j\ge 0\), hence \(V_j\ge 0\).

!!! info "Key box — The identity behind weak duality"
    Expand the sums:
    - \(\sum_i U_i = \sum_i p_i(a_i^\top x - b_i) = p^\top A x - p^\top b\).
    - \(\sum_j V_j = \sum_j (c_j - p^\top A_j)x_j = c^\top x - p^\top A x\).

    Adding them gives the key identity
    \[
    c^\top x - p^\top b \;=\; \sum_i U_i \;+\; \sum_j V_j \;\ge\; 0.
    \]

---

### 4.3.2 Weak duality

!!! info "Theorem (Weak duality)"
    For any **primal feasible** \(x\) and any **dual feasible** \(p\),
    \[
    p^\top b \;\le\; c^\top x.
    \]
    So every dual feasible solution gives a **lower bound** on the optimal primal cost (for a minimization primal).

!!! note "Intuition box"
    Dual feasibility ensures the penalty vector \(p\) produces a valid bound; primal feasibility ensures the constraint residuals have the correct sign so the penalty can only increase the cost surrogate. The decomposition \(c^\top x - p^\top b = \sum_i U_i + \sum_j V_j\) makes this algebraic.

---

### 4.3.3 Corollaries of weak duality

!!! note "Corollary — Unboundedness implies infeasibility on the other side"
    - If the primal (minimization) problem is **unbounded** (optimal cost \(=-\infty\)), then the dual cannot have any feasible solution (dual is **infeasible**).
    - Symmetrically, if the dual (maximization) problem is **unbounded** (optimal cost \(=+\infty\)), then the primal must be **infeasible**.

!!! tip "Corollary — Equal costs certify optimality"
    Suppose \(x\) is primal feasible and \(p\) is dual feasible, and
    \[
    c^\top x \;=\; p^\top b.
    \]
    Then \(x\) is **optimal** for the primal and \(p\) is **optimal** for the dual.

    *Reason:* For any primal feasible \(y\), weak duality gives \(p^\top b \le c^\top y\). If \(p^\top b=c^\top x\), then \(c^\top x \le c^\top y\) for all feasible \(y\), so \(x\) is optimal. A symmetric argument gives optimality of \(p\).

---

### 4.3.4 Strong duality (the duality theorem)

!!! info "Key box — Strong duality (what we ultimately want)"
    Under the usual assumptions (feasibility and existence of an optimal solution),
    \[
    \min\{c^\top x : x \text{ primal feasible}\}
    \;=\;
    \max\{p^\top b : p \text{ dual feasible}\}.
    \]
    Moreover, there exist optimal solutions \(x^*\) and \(p^*\) that achieve equality:
    \(\;c^\top x^* = (p^*)^\top b\).

!!! note "Proof idea box — Prove it in standard form via simplex, then extend"
    The book proves strong duality by:
    1) proving it for a standard-form problem (with independent rows) using the simplex method, and  
    2) reducing a general LP to an equivalent standard-form LP and invoking equivalence of duals (Theorem 4.2).

#### Simplex-based proof sketch in standard form
Consider the standard-form primal
- minimize \(e^\top x\)
- subject to \(Ax=b\), \(x\ge 0\).

When simplex terminates (avoiding cycling), it returns an optimal basis \(B\) and basic variables \(x_B=B^{-1}b\).
Let \(e_B^\top\) be the cost row for the basic variables (here, all ones), and define
\[
p^\top \;=\; e_B^\top B^{-1}.
\]
Then:
- **Dual feasibility:** termination implies all reduced costs are nonnegative, which is equivalent to \(p^\top A \le e^\top\).
- **Equal objective values:**
  \[
  p^\top b \;=\; e_B^\top B^{-1}b \;=\; e_B^\top x_B \;=\; e^\top x.
  \]
So \(x\) and \(p\) are feasible with equal costs; by the “equal costs certify optimality” corollary, both are optimal and primal optimum \(=\) dual optimum.

---

### 4.3.5 Example 4.4 (mechanical analogy)

!!! info "Intuition box — Ball in a polyhedron"
    Think of the feasible region \( \{x : a_i^\top x \ge b_i\} \) as walls constraining a ball.
    Gravity points in direction \(c\) (the objective), so equilibrium occurs at the “lowest” corner \(x^*\), i.e., an optimal solution.

    At equilibrium, the net supporting force from the active walls balances gravity, giving
    \[
    c \;=\; \sum_i p_i a_i \quad \text{with } p_i \ge 0,
    \]
    i.e., \(p\) is dual feasible.

    Walls that do **not** touch the ball exert **no** force, so if \(a_i^\top x^* > b_i\) then \(p_i=0\). This is the intuition behind conditions like \(p_i(b_i-a_i^\top x^*)=0\).

    With these forces,
    \[
    p^\top b \;=\; \sum_i p_i b_i \;=\; \sum_i p_i a_i^\top x^* \;=\; c^\top x^*,
    \]
    so the dual feasible \(p\) matches the primal cost at \(x^*\), certifying optimality.

---

### 4.3.6 What can happen to (primal, dual)?

!!! note "Key box — The three statuses"
    For each of the primal and dual:
    - **Optimal solution exists**, or
    - **Unbounded** (minimization: optimal cost \(=-\infty\); maximization: \(=+\infty\)), or
    - **Infeasible**.

    This gives \(3\times 3 = 9\) combinations.
    Strong duality says: if one has an optimal solution, so does the other (with equal optimal cost).
    Weak duality says: if one is unbounded, the other must be infeasible.

!!! tip "Example 4.5 — Both can be infeasible"
    Primal (infeasible):
    - minimize \(x_1 + 2x_2\)
    - subject to \(x_1 + x_2 = 1\), and \(2x_1 + 2x_2 = 3\).

    Dual (also infeasible):
    - maximize \(p_1 + 3p_2\)
    - subject to \(p_1 + 2p_2 = 1\), and \(p_1 + 2p_2 = 2\).

!!! note "Remark — Clark's theorem"
    Unless **both** problems are infeasible, at least one of them must have an **unbounded feasible set** (see the referenced exercise in the text).

