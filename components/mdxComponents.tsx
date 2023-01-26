export const MdxComponents = {
  h1: (props) => (
    <>
      <h1 {...props} className="text-3xl mb-2"></h1>
      <hr className="mt-0 mb-2 h-0.5 border-0" />
    </>
  ),
  a: (props) => (
    <a
      {...props}
      className="decoration-1 decoration-accent-light dark:decoration-accent-dark"
    ></a>
  ),
};
