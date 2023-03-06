const _modules = import.meta.glob('~/views/**/*.vue')
export function views(file: string) {
  return _modules[`/src/views/${file}.vue`]
  // return () => import(`@/views/${file}.vue`);
}
