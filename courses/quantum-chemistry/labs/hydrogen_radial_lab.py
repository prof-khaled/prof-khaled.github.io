"""Quantum Mechanics Course Lab 3: selected hydrogen radial probabilities.
Atomic units are used: a0=1 and normalized analytical radial functions.
"""
import numpy as np
import matplotlib.pyplot as plt
r=np.linspace(0,20,2000)
R10=2*np.exp(-r)
R20=(1/(2*np.sqrt(2)))*(2-r)*np.exp(-r/2)
R21=(1/(2*np.sqrt(6)))*r*np.exp(-r/2)
for label,R in [("1s",R10),("2s",R20),("2p",R21)]:
    P=r*r*R*R
    print(label,"normalization≈",np.trapezoid(P,r),"most probable r/a0≈",r[np.argmax(P)])
    plt.plot(r,P,label=label)
plt.xlabel("r / a0"); plt.ylabel(r"Radial probability $r^2|R_{nl}|^2$")
plt.title("Hydrogen radial probability distributions")
plt.legend(); plt.tight_layout(); plt.savefig("hydrogen_radial_probability.png",dpi=180)
print("Saved hydrogen_radial_probability.png")
