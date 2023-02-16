export function getElementLeft(element: HTMLElement) {
  let actualLeft: number = element.offsetLeft;
  let current: HTMLElement | null = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

export function getElementTop(element: HTMLElement) {
  let actualTop: number = element.offsetTop;
  let current: HTMLElement | null = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export function scrollToEle(top: number, behavior: ScrollBehavior = 'smooth') {
  window.scrollTo({top, behavior})
}
