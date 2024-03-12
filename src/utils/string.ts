/**
 * 주어진 문자열에서 모든 줄바꿈을 제거
 *
 * @param {string} str - 줄바꿈을 제거할 문자열
 * @returns {string} 줄바꿈이 제거된 문자열을 반환
 */
export function removeLineBreaks(str: string) {
  return str.replace(/\r\n|\r|\n/g, '')
}
