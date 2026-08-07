"""Toy self-consistent fixed-point iteration to illustrate SCF convergence/damping.
This is NOT an electronic-structure calculation and produces no molecular energies.
"""
import math

def run(mix=1.0,n=50):
    p=0.2
    rows=[]
    for it in range(n):
        target=1/(1+math.exp(-5*(p-0.45)))  # nonlinear mock 'new density'
        new=(1-mix)*p+mix*target
        energy=(new-0.65)**2-0.15*new
        rows.append((it,p,new,energy,abs(new-p)))
        if abs(new-p)<1e-8: break
        p=new
    return rows
for mix in (1.0,0.5,0.25):
    rows=run(mix)
    print(f'\nmixing={mix}; iterations={len(rows)}')
    print('iter old_density new_density mock_energy density_change')
    for r in rows[:12]: print('%3d %11.7f %11.7f %11.7f %11.3e'%r)
    if len(rows)>12: print('... final',rows[-1])
