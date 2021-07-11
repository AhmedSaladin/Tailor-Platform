/**
 *
 * @param {*} promise
 *  @ if (data) error = null
 *  @ if (error) data= null
 * @returns [data, error]
 */
module.exports = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};
