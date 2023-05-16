import type { PropsWithChildren } from "react";

// add children type
export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full border-x border-slate-700 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
