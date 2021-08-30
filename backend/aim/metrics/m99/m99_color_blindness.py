#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Metric:
    Color blindness (work in progress)


Description:
    Todo


Funding information and contact:
    This work was funded by Technology Industries of Finland in a three-year
    project grant on self-optimizing web services. The principal investigator
    is Antti Oulasvirta (antti.oulasvirta@aalto.fi) of Aalto University.


References:
    1.  Todo


Change log:
    v2.0 (2021-08-30)
      * Revised implementation

    v1.0 (2017-05-29)
      * Initial implementation
"""


# ----------------------------------------------------------------------------
# Imports
# ----------------------------------------------------------------------------

# Standard library modules
import base64
from io import BytesIO
from typing import List, Optional, Union

# Third-party modules
import numpy
from PIL import Image

# First-party modules
from aim.common.constants import GUI_TYPE_DESKTOP
from aim.metrics.interfaces import AIMMetricInterface

# ----------------------------------------------------------------------------
# Metadata
# ----------------------------------------------------------------------------

__author__ = "Markku Laine, Thomas Langerak"
__date__ = "2021-08-30"
__email__ = "markku.laine@aalto.fi"
__version__ = "2.0"


# ----------------------------------------------------------------------------
# Metric
# ----------------------------------------------------------------------------


class Metric(AIMMetricInterface):
    """
    Metric: Color blindness.
    """

    # Public methods
    @staticmethod
    def execute_metric(
        gui_image: str, gui_type: int = GUI_TYPE_DESKTOP
    ) -> Optional[List[Union[int, float, str]]]:
        """
        Execute the metric.

        Args:
            gui_image: GUI image (PNG) encoded in Base64

        Kwargs:
            gui_type: GUI type, desktop = 0 (default), mobile = 1

        Returns:
            Results (list of measures)
            - Deuteranopia, image (PNG) encoded in Base64
            - Protanopia, image (PNG) encoded in Base64
            - Tritanopia, image (PNG) encoded in Base64
        """
        # Create PIL image
        im: Image.Image = Image.open(
            BytesIO(base64.b64decode(gui_image))
        ).convert("RGB")
        RGB = numpy.asarray(im, dtype=float)

        # Save as image into buffer
        sim_d = RGB.astype("uint8")
        sim_p = RGB.astype("uint8")
        sim_t = RGB.astype("uint8")
        im_d = Image.fromarray(sim_d, mode="RGB")
        im_p = Image.fromarray(sim_p, mode="RGB")
        im_t = Image.fromarray(sim_t, mode="RGB")
        buffered_d = BytesIO()
        buffered_p = BytesIO()
        buffered_t = BytesIO()
        im_d.save(buffered_d, format="PNG", compress_level=6)
        im_p.save(buffered_p, format="PNG", compress_level=6)
        im_t.save(buffered_t, format="PNG", compress_level=6)
        d_b64: str = base64.b64encode(buffered_d.getvalue()).decode("utf-8")
        p_b64: str = base64.b64encode(buffered_p.getvalue()).decode("utf-8")
        t_b64: str = base64.b64encode(buffered_t.getvalue()).decode("utf-8")

        return [d_b64, p_b64, t_b64]
