import NavAcount from "@/app/component/NavAcount"

export default function AccountLayout({children}) {
  return (
    <div>
      <NavAcount />
      {children}
    </div>
  )
}
