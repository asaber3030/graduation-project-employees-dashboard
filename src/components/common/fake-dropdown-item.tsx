type Props = {
  children: React.ReactNode
}

export const FakeDropdownItem = ({ children }: Props) => {
  return (
    <section className="relative w-full hover:bg-gray-100 flex cursor-default select-none gap-2 items-center px-2 py-1 font-medium rounded-md text-sm outline-none transition-colors">
      {children}
    </section>
  )
}
