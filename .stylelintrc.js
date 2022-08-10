const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  'extends': 'stylelint-config-standard',
  'ignoreFiles': ['./out/**/*.css'],
  'plugins': ['stylelint-order'],
  'rules': {
    'declaration-empty-line-before': null,
    'max-empty-lines': [1, { ignore: ['comments'] }],
    'selector-class-pattern': '^[a-z0-9][a-zA-Z0-9-]+$',
    'color-function-notation': 'legacy',
    'order/properties-order': [sortOrderSmacss({ emptyLineBefore: 'always' })],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        'ignorePseudoClasses': ['global']
      }
    ],
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }]
  }
}
