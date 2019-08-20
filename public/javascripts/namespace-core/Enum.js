/**
 * Enum class.
 * Use like this:
 * 
 * var GLOBALS = new ENUM({
 *      HOME: 'home',
 *      VOD: 'vod',
 *      PVR: 'pvr',
 *      SETTINGS: 'settings'
 * });
 * 
 * @param {*} values - enum values
 */
function Enum(values)
{
    Object.cloneData(this, values);
};