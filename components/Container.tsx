import { ReactElement, ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}

export function Container({ children }: ContainerProps): ReactElement {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-10 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  )
}
