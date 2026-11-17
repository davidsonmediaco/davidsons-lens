// Wraps an interior page in <main> with a short CSS settle-in (`.page-enter` in globals.css).
// The page is visible from the first paint: the fade starts partly visible and needs no
// JavaScript. (It used to be a framer-motion fade from opacity 0, which kept the whole page,
// H1 included, invisible until the scripts had loaded.)
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <main className="page-enter">{children}</main>
}
