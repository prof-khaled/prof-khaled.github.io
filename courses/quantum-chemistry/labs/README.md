# Quantum Mechanics computational laboratories

These small Python laboratories use NumPy and Matplotlib and are intended to connect equations in the course to numerical experiments. They are **educational models**, not production electronic-structure software.

1. `wavepacket_lab.py` — analytic propagation and spreading of a free Gaussian electron packet.
2. `eigenvalue_well_lab.py` — finite-difference Hamiltonian and numerical eigenvalues for a 1D infinite well.
3. `hydrogen_radial_lab.py` — normalized hydrogen radial probability distributions and most-probable radii.
4. `scf_toy_lab.py` — a deliberately small nonlinear 2×2 self-consistent-field model that illustrates fixed-point convergence.

Run a laboratory from this folder with `python <name>.py`. Each script prints numerical diagnostics; the first three also save a PNG graph.
