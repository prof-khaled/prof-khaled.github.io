"""Educational theoretical model: Morse potential and numerical derivatives.
No experimental data are generated. Scientific context: Lewars [1], Cramer [2].
"""
import numpy as np
import matplotlib.pyplot as plt
D_e, a, r_e = 420.0, 1.9, 1.10  # teaching parameters: kJ/mol, A^-1, A
r=np.linspace(0.65,2.5,500)
U=D_e*(1-np.exp(-a*(r-r_e)))**2-D_e
# central finite derivatives around each interior point
dr=r[1]-r[0]
grad=np.gradient(U,dr)
hess=np.gradient(grad,dr)
i=np.argmin(U)
print(f"Minimum near r={r[i]:.4f} A, U={U[i]:.3f} kJ/mol")
print(f"Numerical gradient at grid minimum ≈ {grad[i]:.3e} kJ mol^-1 A^-1")
print(f"Local curvature ≈ {hess[i]:.2f} kJ mol^-1 A^-2")
plt.figure(figsize=(7,4.5)); plt.plot(r,U); plt.axvline(r_e,ls='--'); plt.xlabel('Bond distance / A'); plt.ylabel('Model potential / kJ mol$^{-1}$'); plt.title('Morse potential — theoretical teaching data'); plt.tight_layout(); plt.show()
