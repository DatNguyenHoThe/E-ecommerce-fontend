import AccountMenu from "../ui/AccountMenu"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex gap-x-3">
        <AccountMenu />
        {children}
      </div>      
    )
  }