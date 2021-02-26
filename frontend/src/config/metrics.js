export default {
  categories: [
    {
      name: 'Colour Perception',
      id: 'cp',
      color: 'cat-one',
      icon: 'palette',
      evaluation: 'good',
      score: '30',
      metrics: ['m1', 'm3']
    },
    {
      name: 'Perceptual Fluency',
      id: 'pf',
      color: 'cat-two',
      icon: 'brain',
      evaluation: 'okay',
      score: '30',
      metrics: ['m2', 'm4', 'm5', 'm6']
    },
    {
      name: 'Visual Guidance',
      id: 'vg',
      color: 'cat-three',
      icon: 'compass',
      evaluation: 'bad',
      score: '30',
      metrics: []
    },
    {
      name: 'Accessibility',
      id: 'ac',
      color: 'cat-four',
      icon: 'universal-access',
      evaluation: 'bad',
      score: '30',
      metrics: []
    }
  ],
  metrics: {
    m1: {
      id: 'm1',
      name: 'PNG file size',
      description:
        'File size in PNG indicates the number of effectively used colors. The higher the size, the more colourful the image is likely to be. Note that this is confounded by other factors, such as image complexity.',
      evidence: 1,
      relevance: 2,
      speed: 2,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Miniukovich, A. and De Angeli, A. Computation of Interface Aesthetics.',
          fileName: 'miniukovich_and_de_angeli_2015.pdf'
        }
      ],
      results: [
        {
          id: 'm1_0',
          index: 0,
          type: 'int',
          name: 'PNG file size in bytes',
          description: false,
          scores: [
            {
              id: 'r1',
              range: [0, 500000],
              description: 'Suitable',
              icon: ['far', 'check-circle'],
              judgment: 'good'
            },
            {
              id: 'r2',
              range: [500001, 1200000],
              description: 'Fair',
              icon: [null, null],
              judgment: 'normal'
            },
            {
              id: 'r3',
              range: [1200001, null],
              description: 'Huge',
              icon: ['fas', 'exclamation-triangle'],
              judgment: 'bad'
            }
          ]
        }
      ]
    },
    m2: {
      id: 'm2',
      name: 'JPEG file size',
      description:
        'JPEG file size has some association with clutter perception. However, little evidence exists, and the metric is confounded by other factors.',
      evidence: 2,
      relevance: 3,
      speed: 2,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Miniukovich, A. and De Angeli, A. Computation of Interface Aesthetics.',
          fileName: 'miniukovich_and_de_angeli_2015.pdf'
        }
      ],
      results: [
        {
          id: 'm2_0',
          index: 0,
          type: 'int',
          name: 'JPEG file size in bytes',
          description: false,
          scores: [
            {
              id: 'r1',
              range: [0, 100000],
              description: 'Suitable',
              icon: ['far', 'check-circle'],
              judgment: 'good'
            },
            {
              id: 'r2',
              range: [100001, 200000],
              description: 'Fair',
              icon: [null, null],
              judgment: 'normal'
            },
            {
              id: 'r3',
              range: [200001, null],
              description: 'Huge',
              icon: ['fas', 'exclamation-triangle'],
              judgment: 'bad'
            }
          ]
        }
      ]
    },
    m3: {
      id: 'm3',
      name: 'Distinct RGB values',
      description:
        'The number of unique colours in RGB spectrum is an indication of colour variance. Colours that occur more than a threshold value are counted. Note that this is confounded by image size',
      evidence: 2,
      relevance: 2,
      speed: 2,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Miniukovich, A. and De Angeli, A. Computation of Interface Aesthetics.',
          fileName: 'miniukovich_and_de_angeli_2015.pdf'
        },
        {
          title:
            'Miniukovich, A. and De Angeli, A. Quantification of Interface Visual Complexity.',
          fileName: 'miniukovich_and_de_angeli_2014.pdf'
        }
      ],
      results: [
        {
          id: 'm3_0',
          index: 0,
          type: 'int',
          name: 'Number of distinct RGB values',
          description: false,
          scores: [
            {
              id: 'r1',
              range: [0, 5000],
              description: 'Less colourful',
              icon: [null, null],
              judgment: 'normal'
            },
            {
              id: 'r2',
              range: [5001, 15000],
              description: 'Fair',
              icon: ['far', 'check-circle'],
              judgment: 'good'
            },
            {
              id: 'r3',
              range: [15001, null],
              description: 'colourful',
              icon: [null, null],
              judgment: 'normal'
            }
          ]
        }
      ]
    },
    m4: {
      id: 'm4',
      name: 'Contour density',
      description:
        'Contour density correlates with perception of clutter. It is computed as the ratio of pixels that align with an edge as compared to the total number of pixels in the image. Note that this metric does not take colour variance into account, unlike e.g. the feature congestion metric.',
      evidence: 4,
      relevance: 3,
      speed: 2,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Miniukovich, A. and De Angeli, A. Computation of Interface Aesthetics.',
          fileName: 'miniukovich_and_de_angeli_2015.pdf'
        },
        {
          title:
            'Rosenholtz, R., Li, Y., and Nakano, L. Measuring Visual Clutter.',
          fileName: 'rosenholtz_et_al_2007.pdf'
        }
      ],
      results: [
        {
          id: 'm4_0',
          index: 0,
          type: 'float',
          name: 'Contour density',
          description:
            'Ratio between number of edge pixels and total number of pixels.',
          scores: [
            {
              id: 'r1',
              range: [0.0, 0.12],
              description: 'Good',
              icon: ['far', 'check-circle'],
              judgment: 'good'
            },
            {
              id: 'r2',
              range: [0.13, 0.22],
              description: 'Fair',
              icon: [null, null],
              judgment: 'normal'
            },
            {
              id: 'r3',
              range: [0.23, null],
              description: 'Poor',
              icon: ['fas', 'exclamation-triangle'],
              judgment: 'bad'
            }
          ]
        }
      ]
    },
    m5: {
      id: 'm5',
      name: 'Figure-ground contrast',
      description:
        'Luminance and colour contrast correlates with perceptual fluency. Words and objects with high contrast are easier to read and detect. ',
      evidence: 3,
      relevance: 4,
      speed: 2,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Hall, R.H. and Hanna, P. The Impact of Web Page Text-Background Color Combinations on Readability, Retention, Aesthetics, and Behavioural Intention.',
          fileName: 'hall_and_hanna_2004.pdf'
        },
        {
          title:
            'Miniukovich, A. and De Angeli, A. Quantification of Interface Visual Complexity.',
          fileName: 'miniukovich_and_de_angeli_2014.pdf'
        },
        {
          title:
            'Reber, R., Winkielman, P., and Schwarz, N. Effects of Perceptual Fluency on Affective Judgments.',
          fileName: 'reber_et_al_1998.pdf'
        },
        {
          title:
            'Reber, R., Wurtz, P., and Zimmermann, T.D. Exploring "fringe" Consciousness: The Subjective Experience of Perceptual Fluency and its Objective Bases.',
          fileName: 'reber_et_al_2004.pdf'
        }
      ],
      results: [
        {
          id: 'm5_0',
          index: 0,
          type: 'float',
          name: 'Figure-ground contrast',
          description:
            'Weighted sum of edge pixels divided by sum of edge pixels.',
          scores: [
            {
              id: 'r1',
              range: [null, null],
              description: 'TODO',
              icon: [null, null],
              judgment: 'normal'
            }
          ]
        }
      ]
    },
    m6: {
      id: 'm6',
      name: 'Contour congestion',
      description:
        'Contour congestion indicates the ease with which main edges can he perceived. A crowded image is hard to follow. The contour congestion indicator is important for complex interfaces and graph visualizations.',
      evidence: 3,
      relevance: 3,
      speed: 1,
      evaluation: 'good',
      visualizationType: 'table',
      references: [
        {
          title:
            'Levi, D.M. Crowding--An Essential Bottleneck for Object Recognition: A Mini-Review.',
          fileName: 'levi_2008.pdf'
        },
        {
          title:
            'Miniukovich, A. and De Angeli, A. Quantification of Interface Visual Complexity.',
          fileName: 'miniukovich_and_de_angeli_2014.pdf'
        },
        {
          title:
            'van den Berg, R., Cornelissen, F.W., and Roerdink, J.B.T.M. A Crowding Model of Visual Clutter.',
          fileName: 'van_den_berg_et_al_2009.pdf'
        },
        {
          title:
            'Wong, N., Carpendale, S., and Greenberg, S. Edgelens: An Interactive Method for Managing Edge Congestion in Graphs.',
          fileName: 'wong_et_al_2003.pdf'
        }
      ],
      results: [
        {
          id: 'm6_0',
          index: 0,
          type: 'float',
          name: 'Contour congestion',
          description:
            'Number of congested pixels divided by number of contour pixels.',
          scores: [
            {
              id: 'r1',
              range: [0.0, 0.25],
              description: 'Good',
              icon: ['far', 'check-circle'],
              judgment: 'good'
            },
            {
              id: 'r2',
              range: [0.26, 0.5],
              description: 'Fair',
              icon: [null, null],
              judgment: 'normal'
            },
            {
              id: 'r3',
              range: [0.51, null],
              description: 'Poor',
              icon: ['fas', 'exclamation-triangle'],
              judgment: 'bad'
            }
          ]
        }
      ]
    }
  }
}
