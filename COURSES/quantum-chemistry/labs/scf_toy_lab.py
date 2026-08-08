"""Quantum Mechanics Course Lab 4: toy self-consistent field iteration.
This is a pedagogical nonlinear 2x2 model, not a molecular HF implementation.
It demonstrates fixed-point iteration and density mixing.
"""
import numpy as np
Hcore=np.array([[-1.20,-0.35],[-0.35,-0.60]])
P=np.array([[1.0,0.0],[0.0,0.0]])
mix=0.35
for cycle in range(1,101):
    # Toy mean-field response. Chosen only to illustrate self-consistency.
    G=np.array([[0.55*P[0,0],0.18*P[0,1]],[0.18*P[1,0],0.45*P[1,1]]])
    F=Hcore+G
    eps,C=np.linalg.eigh(F)
    c=C[:,0]
    Pnew=2*np.outer(c,c)
    d=np.linalg.norm(Pnew-P)
    E=float(2*c@Hcore@c + 0.5*np.sum(Pnew*G))
    print(f"{cycle:3d} E={E: .9f}  ||ΔP||={d:.3e}  eps={eps[0]:.6f}")
    if d<1e-9: break
    P=(1-mix)*P+mix*Pnew
print("Converged pedagogical density:\n",Pnew)
