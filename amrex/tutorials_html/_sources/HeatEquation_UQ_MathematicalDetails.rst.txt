.. _pytuq_mathematical_details:

Parameter Sensitivity via Polynomial Chaos
-------------------------------------------

In this example, PyTUQ constructs polynomial chaos expansions to analyze how uncertain physical parameters affect simulation outputs in a heat diffusion problem.

The Heat Equation
^^^^^^^^^^^^^^^^^

The governing equation for this tutorial is the heat diffusion equation:

.. math:: \frac{\partial\phi}{\partial t} = D\nabla^2 \phi,

with initial condition

.. math:: \phi_0 = 1 + A e^{-r^2 / (2V)},

where ``r`` is the distance from the center of the domain, and with uncertain parameters ``diffusion_coeff`` (:math:`D`), ``init_amplitude`` (:math:`A`), and ``init_variance`` (:math:`V`).



Quantities of Interest (Outputs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The simulation extracts four statistical quantities at the final timestep:

1. **max_temp**: Maximum temperature in the domain
2. **mean_temp**: Average temperature across all cells
3. **std_temp**: Standard deviation of temperature
4. **cell_temp**: Temperature in a particular cell, in this case, cell (9,9,9)

These outputs are computed in ``main.cpp``and written to the datalog file.

PyTUQ Workflow
^^^^^^^^^^^^^^

PyTUQ uses polynomial chaos expansion to construct a surrogate model:

1. **Parameter sampling**: Generate sample points in the 3D parameter space based on the specified distributions
2. **Forward simulations**: Run the AMReX heat equation solver for each parameter set
3. **Surrogate construction**: Fit polynomial chaos coefficients to map inputs → outputs
4. **Sensitivity analysis**: Compute Sobol indices to identify which parameters most influence each output

The connection is:

- **Inputs**: ParmParse parameters (``diffusion_coeff``, ``init_amplitude``, ``init_variance``) specified in ``inputs`` file or command line
- **Outputs**: Quantities of interest extracted from datalog files
