import { ThemeProvider } from "@/components/theme-provider"

interface Props {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}