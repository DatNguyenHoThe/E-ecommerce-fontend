import AccountMenu from "../ui/AccountMenu"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            {/* Layout UI */}
            <main className="flex gap-x-3">
                <AccountMenu />
                {children}
            </main>
        </body>
      </html>
    )
  }