import { FC } from "react";
import { Navbar, Sidebar } from "../components";

interface Props {
    children: React.ReactNode; 
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div>
        <div>

            <Navbar />

            <Sidebar />

            <main>
                <div className="container-fluid">
                    { children }
                </div>
            </main>

        </div>

    </div>
  )
}