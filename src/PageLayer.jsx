import Header from "./Header";

export default function PageLayer({ title = undefined, children }) {
  return (
    <>
      <Header />
      <main className=" w-full p-20 min-h-screen-navbar flex items-center justify-center ">
        <div className="w-full ">
          {title == undefined ? (
            <br />
          ) : (
            <h1 className="text-3xl font-semibold">{title}</h1>
          )}
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
