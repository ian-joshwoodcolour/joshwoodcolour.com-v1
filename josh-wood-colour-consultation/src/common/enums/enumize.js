/**
 * HOW TO USE
 *
 * enums.TESTIMONIAL_STATUS.ids[testimonial.statusId].name
 *
 * enums.TESTIMONIAL_STATUS.WAITING_FOR_APPROVAL.name
 * enums.TESTIMONIAL_STATUS.WAITING_FOR_APPROVAL.id
 *
 * for (var key in enum.TESTIMONIAL_STATUS) {
 *     console.log(enum.TESTIMONIAL_STATUS[key]);
 * } OR USE LODASH
 *
 * @param {Object} enumDefinition Enum object to be enumized
 * @returns {*}
 */
function enumize(enumDefinition) {
  const byId = {}
  const idsAsEnum = []
  for (const key in enumDefinition) {
    if (enumDefinition.hasOwnProperty(key)) {
      const temp = Object.assign({}, enumDefinition[key])
      temp.key = key
      idsAsEnum.push(enumDefinition[key].id)
      byId[enumDefinition[key].id] = temp
    }
  }
  enumDefinition.ids = byId
  enumDefinition.idsAsEnum = idsAsEnum
  return enumDefinition
}

export default enumize
