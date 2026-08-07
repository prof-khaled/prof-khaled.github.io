"""Educational 1D MD and Metropolis MC in a quartic potential.
The output is simulated/theoretical, not experimental data.
"""
import numpy as np
import matplotlib.pyplot as plt
rng=np.random.default_rng(7)
kBT=2.494  # kJ/mol at about 300 K for molar energy convention

def U(x): return 4*(x*x-1)**2

def F(x): return -16*x*(x*x-1)
# velocity Verlet, unit mass in reduced teaching units
n=20000; dt=0.003; x=np.zeros(n); v=np.zeros(n); x[0]=-0.9; v[0]=0.25
for i in range(n-1):
    a=F(x[i]); x[i+1]=x[i]+v[i]*dt+0.5*a*dt*dt
    anew=F(x[i+1]); v[i+1]=v[i]+0.5*(a+anew)*dt
Etot=0.5*v*v+U(x)
print('MD relative energy drift:',(Etot[-1]-Etot[0])/max(abs(Etot[0]),1e-12))
# Metropolis
m=100000; xm=np.zeros(m); xm[0]=-1; accept=0; width=0.8
for i in range(m-1):
    trial=xm[i]+rng.normal(scale=width); d=U(trial)-U(xm[i])
    if d<=0 or rng.random()<np.exp(-d/kBT): xm[i+1]=trial; accept+=1
    else: xm[i+1]=xm[i]
print('MC acceptance:',accept/(m-1)); print('MC mean U after burn-in:',U(xm[10000:]).mean())
plt.figure(figsize=(7,4)); plt.plot(np.arange(3000)*dt,x[:3000]); plt.xlabel('Reduced time'); plt.ylabel('x'); plt.title('MD trajectory — theoretical model'); plt.tight_layout(); plt.show()
