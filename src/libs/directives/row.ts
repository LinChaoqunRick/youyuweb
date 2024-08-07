export default function row(el: HTMLElement, binding: any) {
  const el_height = el.scrollHeight;
  const el_line_height = parseInt(getComputedStyle(el)['line-height']);
  const row = el_height / el_line_height;
  binding.value.set(row);
}
