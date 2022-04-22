/**
 * Database64 file format is converted to base 2
 *
 * @param  {[String]} data The dataURL format is data:image/ PNG; Base64,**** ", before the comma is some kind of descriptive text, we only need after the comma on the line
 * @param  {[String]} mime 
 * @return {[blob]}      
 */
export default function(data, mime) {
  data = data.split(',')[1]
  data = window.atob(data)
  var ia = new Uint8Array(data.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }
  // The default format returned by canvas.toDataURL is image/ PNG
  return new Blob([ia], {
    type: mime
  })
}
