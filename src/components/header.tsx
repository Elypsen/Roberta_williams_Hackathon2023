export default function Header() {
    // const isLoggedIn = useAuthStore(state => state.isLoggedIn)
    // const logout = useAuthStore(state => state.logout)
    // const {pathname} = useLocation()
    return (
        <header>
            <nav className="bg-primary w-screen px-4 py-2.5 lg:px-6">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
                    <h1 className="text-xl text-primary-content">Mon Festoche</h1>
                    <nav className="flex items-center lg:order-2">

                    </nav>
                </div>
            </nav>
        </header>
    )
}

