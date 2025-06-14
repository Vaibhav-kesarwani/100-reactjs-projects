import Footer from "./Footer";

export default function Layout({ children }: { children: JSX.Element }) {

    return (
        <main className='flex flex-col'>
            {children}
            <Footer />
        </main>
    )
}