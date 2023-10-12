import {ComponentPropsWithoutRef} from "react";

const MainContainer = ({ children}:ComponentPropsWithoutRef<'main'>) => {
    return (
        <main>
            {children}
        </main>
    )
}
export default MainContainer
