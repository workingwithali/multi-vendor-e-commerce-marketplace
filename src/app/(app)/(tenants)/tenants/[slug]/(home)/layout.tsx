




interface LayoutProps {
    children: React.ReactNode,
    params: { slug: string }
}

const layout = ( { children  }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-muted flex flex-col">

    <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">
        {children}
        </div>
    </div>
    </div>
  )
}

export default layout