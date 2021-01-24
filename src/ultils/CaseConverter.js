const { snakeCase, camelCase, kebabCase, upperFirst, flow } = require('lodash')

/**
 * deeply converts keys of an object from one case to another
 * @param {object} oldObject to convert
 * @param {function} converterFunction to convert key.
 * @return converted object
 */
const convertCase = (oldObject, converterFunction) => {
  let newObject

  if (!oldObject || typeof oldObject !== 'object' || !Object.keys(oldObject).length) {
    return oldObject
  }

  if (Array.isArray(oldObject)) {
    newObject = oldObject.map(element => convertCase(element, converterFunction))
  } else {
    newObject = {}
    Object.keys(oldObject).forEach(oldKey => {
      const newKey = converterFunction(oldKey)
      newObject[newKey] = convertCase(oldObject[oldKey], converterFunction)
    })
  }

  return newObject
}

const toCamelCase = obj => convertCase(obj, camelCase)
const toSnakeCase = obj => convertCase(obj, snakeCase)
const toKebabCase = obj => convertCase(obj, kebabCase)
const toPascalCase = obj =>
  convertCase(
    obj,
    flow(
      camelCase,
      upperFirst,
      a => a.replace(/Id/, 'ID'),
    ),
  )

module.exports = { toCamelCase, toSnakeCase, toKebabCase, toPascalCase }
