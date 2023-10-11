import Container from '@/components/ui/container'
import { ChevronsRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
    name: string
    link: string
}

const PageTitle = (props: Props) => {
    return (
        <div className='w-full bg-themeColor max-xl:px-4'>
            <Container>
                <div className='flex items-center h-28 sm:h-40 justify-start gap-4'>
                    <Link className='font-bold uppercase sm:text-xl text-themeText' href={'/'}>Home</Link>
                    <div>
                        <ChevronsRight className='text-themeText' />
                    </div>
                    <Link className='font-bold uppercase sm:text-xl text-themeText' href={props.link}>{props.name}</Link>
                </div>
            </Container>
        </div>
    )
}

export default PageTitle