"""Quantum Mechanics Course Lab 2: finite-difference eigenvalues in a 1D box.
Compares numerical and analytic infinite-square-well energies.
"""
import numpy as np
import matplotlib.pyplot as plt
hbar=1.054571817e-34; me=9.1093837139e-31; eV=1.602176634e-19
L=1e-9; N=500
x=np.linspace(0,L,N+2)[1:-1]; dx=x[1]-x[0]
D2=(np.diag(-2*np.ones(N))+np.diag(np.ones(N-1),1)+np.diag(np.ones(N-1),-1))/dx**2
H=-(hbar**2/(2*me))*D2
E,U=np.linalg.eigh(H)
print("n  numerical/eV  analytic/eV  relative error")
for n in range(1,6):
    exact=n*n*np.pi**2*hbar**2/(2*me*L**2)
    print(f"{n:1d}  {E[n-1]/eV:12.7f}  {exact/eV:11.7f}  {(E[n-1]-exact)/exact: .3e}")
for i in range(3):
    u=U[:,i]/np.sqrt(np.trapezoid(np.abs(U[:,i])**2,x))
    plt.plot(x*1e9,u/np.max(np.abs(u))+2.2*i,label=f"n={i+1}")
plt.xlabel("x / nm"); plt.ylabel("Scaled eigenfunction + offset")
plt.title("Finite-difference eigenstates in a 1 nm infinite well")
plt.legend(); plt.tight_layout(); plt.savefig("well_eigenstates.png",dpi=180)
print("Saved well_eigenstates.png")
