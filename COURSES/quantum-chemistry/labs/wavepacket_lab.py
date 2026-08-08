"""Quantum Mechanics Course Lab 1: Free Gaussian wave-packet propagation.
Generates wavepacket_evolution.png. Uses SI units internally.
"""
import numpy as np
import matplotlib.pyplot as plt
hbar=1.054571817e-34
m=9.1093837139e-31
x=np.linspace(-8e-9,8e-9,2400)
sigma=0.55e-9
x0=-2.5e-9
k0=2.0e10
# Analytic free Gaussian wave packet up to an overall phase.
def psi(x,t):
    tau=hbar*t/(2*m*sigma**2)
    denom=1+1j*tau
    xc=x0+hbar*k0*t/m
    pref=(1/(2*np.pi*sigma**2))**0.25/np.sqrt(denom)
    return pref*np.exp(-(x-xc)**2/(4*sigma**2*denom)+1j*k0*(x-x0)-1j*hbar*k0**2*t/(2*m))
for t in [0,2e-16,4e-16,6e-16]:
    p=np.abs(psi(x,t))**2
    plt.plot(x*1e9,p/1e9,label=f"t={t*1e15:.2f} fs")
plt.xlabel("x / nm")
plt.ylabel("Probability density / nm$^{-1}$")
plt.title("Free electron Gaussian wave packet: translation and spreading")
plt.legend()
plt.tight_layout()
plt.savefig("wavepacket_evolution.png",dpi=180)
print("Saved wavepacket_evolution.png")
