export default function Header() {
   // const isLoggedIn = useAuthStore(state => state.isLoggedIn)
   // const logout = useAuthStore(state => state.logout)
   // const {pathname} = useLocation()
   return (
      <header>
         <nav className=" border-base-300 bg-base-200 w-screen px-4 py-2.5 lg:px-6">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
               <h1 className="self-center whitespace-nowrap text-xl font-semibold">TodoList</h1>
               <nav className="flex items-center lg:order-2">
                  {/*{isLoggedIn ? (*/}
                  {/*   <>*/}
                  {/*      <NavigationLink*/}
                  {/*         active={pathname === ROUTES.index}*/}
                  {/*         as={Link}*/}
                  {/*         to={ROUTES.index}>*/}
                  {/*         Home*/}
                  {/*      </NavigationLink>*/}
                  {/*      <NavigationLink*/}
                  {/*         as={'button'}*/}
                  {/*         onClick={logout}>*/}
                  {/*         Log out*/}
                  {/*      </NavigationLink>*/}
                  {/*   </>*/}
                  {/*) : (*/}
                  {/*   <>*/}
                  {/*      <NavigationLink*/}
                  {/*         active={pathname === ROUTES.auth}*/}
                  {/*         as={Link}*/}
                  {/*         to={ROUTES.auth}>*/}
                  {/*         Log in*/}
                  {/*      </NavigationLink>*/}
                  {/*   </>*/}
                  {/*)}*/}
               </nav>
            </div>
         </nav>
      </header>
   )
}

