"""Simple Hückel pi-electron model for linear chains/rings.
Educational matrix model; energies are expressed in alpha/beta units.
"""
import numpy as np

def huckel(n, ring=False, alpha=0.0, beta=-1.0, site_shift=None):
    H=np.eye(n)*alpha
    for i in range(n-1): H[i,i+1]=H[i+1,i]=beta
    if ring and n>2: H[0,-1]=H[-1,0]=beta
    if site_shift: 
        for i,delta in site_shift.items(): H[i,i]+=delta
    e,C=np.linalg.eigh(H)
    return H,e,C
for name,n,ring in [('ethene',2,False),('butadiene',4,False),('benzene',6,True)]:
    H,e,C=huckel(n,ring)
    ne=n; occ=ne//2
    Epi=2*e[:occ].sum()
    print('\n',name); print(H); print('orbital energies:',np.round(e,6)); print('total pi energy:',Epi)
print('\nheteroatom perturbation on benzene site 0:')
_,e,C=huckel(6,True,site_shift={0:-0.5}); print(np.round(e,5)); print('lowest MO coefficients:',np.round(C[:,0],4))
